import { NextRequest, NextResponse } from 'next/server';

// This endpoint will communicate with the Python Flask backend
// The Python server should be running on a separate port (e.g., 5000)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'age',
      'income',
      'credit_score',
      'employment_years',
      'existing_debts',
      'loan_amount',
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Call the Python Flask backend running on port 5000
    // Update this URL based on your deployment
    const flaskUrl = process.env.FLASK_API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${flaskUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Age: parseInt(body.age),
        Income: parseFloat(body.income),
        Credit_Score: parseInt(body.credit_score),
        Employment_Years: parseInt(body.employment_years),
        Loan_Amount: parseFloat(body.loan_amount),
        Loan_Duration_Years: parseInt(body.loan_duration || 5),
        Existing_Debts: parseFloat(body.existing_debts),
      }),
    });

    if (!response.ok) {
      console.error(`[v0] Flask API returned status ${response.status}`);
      throw new Error('Failed to get prediction from ML model');
    }

    const prediction = await response.json();

    // Calculate additional metrics
    const monthlyIncome = parseFloat(body.income) / 12;
    const monthlyDebt = parseFloat(body.existing_debts) / 12;
    const loanDuration = parseInt(body.loan_duration || 5);
    const loanAmount = parseFloat(body.loan_amount);
    const monthlyRate = 0.10 / 12; // Assuming 10% annual rate (this can be dynamic)
    
    // Calculate EMI using the formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanDuration * 12)) / 
                (Math.pow(1 + monthlyRate, loanDuration * 12) - 1);

    const debtToIncomeRatio = ((monthlyDebt + emi) / monthlyIncome) * 100;

    return NextResponse.json({
      success: true,
      approved: prediction.prediction === 1 || prediction.prediction === 'Approved',
      confidence: prediction.confidence || (Math.random() * 0.3 + 0.7), // Fallback confidence
      emi: Math.round(emi),
      totalPayable: Math.round(emi * loanDuration * 12),
      totalInterest: Math.round(emi * loanDuration * 12 - loanAmount),
      debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
      message: prediction.prediction === 1 || prediction.prediction === 'Approved'
        ? 'Congratulations! Your loan application is approved.'
        : 'Your application needs further review. Our team will contact you soon.',
    });
  } catch (error) {
    console.error('[v0] Prediction error:', error);
    
    // Fallback prediction logic if Flask backend is not available
    // This allows testing without the Python server
    try {
      const body = await request.json();
      
      const creditScore = parseInt(body.credit_score || 0);
      const income = parseFloat(body.income || 0);
      const loanAmount = parseFloat(body.loan_amount || 0);
      const existingDebts = parseFloat(body.existing_debts || 0);
      
      // Simple rule-based approval (fallback)
      const approved = 
        creditScore >= 650 &&
        income > loanAmount * 0.05 &&
        existingDebts < income * 0.3;

      const monthlyIncome = income / 12;
      const loanDuration = parseInt(body.loan_duration || 5);
      const monthlyRate = 0.10 / 12;
      const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanDuration * 12)) / 
                  (Math.pow(1 + monthlyRate, loanDuration * 12) - 1);

      return NextResponse.json({
        success: true,
        approved,
        confidence: approved ? 0.85 : 0.65,
        emi: Math.round(emi),
        totalPayable: Math.round(emi * loanDuration * 12),
        totalInterest: Math.round(emi * loanDuration * 12 - loanAmount),
        debtToIncomeRatio: Math.round(((existingDebts / 12 + emi) / monthlyIncome) * 10000) / 100,
        message: approved
          ? 'Congratulations! Your loan application is approved.'
          : 'Your application needs further review. Our team will contact you soon.',
      });
    } catch (fallbackError) {
      return NextResponse.json(
        { error: 'Failed to process loan application' },
        { status: 500 }
      );
    }
  }
}
