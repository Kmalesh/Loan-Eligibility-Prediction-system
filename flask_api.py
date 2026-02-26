#!/usr/bin/env python3
"""
Flask API for Loan Eligibility Prediction Model
This server provides REST API endpoints for the ML model predictions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import numpy as np
import os
import sys

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and scaler
try:
    model = pickle.load(open('model.pkl', 'rb'))
    scaler = pickle.load(open('scaler.pkl', 'rb'))
    print("[✓] Model and scaler loaded successfully")
except FileNotFoundError as e:
    print(f"[✗] Error loading model files: {e}")
    print("Make sure model.pkl and scaler.pkl are in the same directory")
    sys.exit(1)


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Loan Eligibility Prediction API',
        'version': '1.0.0'
    }), 200


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict loan eligibility based on applicant information
    
    Expected JSON input:
    {
        "Age": int,
        "Income": float,
        "Credit_Score": int,
        "Employment_Years": int,
        "Loan_Amount": float,
        "Loan_Duration_Years": int,
        "Existing_Debts": float
    }
    """
    try:
        # Get JSON data
        data = request.get_json()
        
        # Validate required fields
        required_fields = [
            'Age',
            'Income',
            'Credit_Score',
            'Employment_Years',
            'Loan_Amount',
            'Loan_Duration_Years',
            'Existing_Debts'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'error': f'Missing required field: {field}',
                    'success': False
                }), 400
        
        # Extract and validate data
        try:
            age = int(data['Age'])
            income = float(data['Income'])
            credit_score = int(data['Credit_Score'])
            employment_years = int(data['Employment_Years'])
            loan_amount = float(data['Loan_Amount'])
            loan_duration = int(data['Loan_Duration_Years'])
            existing_debts = float(data['Existing_Debts'])
        except (ValueError, TypeError) as e:
            return jsonify({
                'error': f'Invalid data type: {str(e)}',
                'success': False
            }), 400
        
        # Validate ranges
        if age < 18 or age > 75:
            return jsonify({
                'error': 'Age must be between 18 and 75',
                'success': False
            }), 400
        
        if credit_score < 300 or credit_score > 900:
            return jsonify({
                'error': 'Credit Score must be between 300 and 900',
                'success': False
            }), 400
        
        if income <= 0:
            return jsonify({
                'error': 'Income must be greater than 0',
                'success': False
            }), 400
        
        if loan_amount <= 0:
            return jsonify({
                'error': 'Loan Amount must be greater than 0',
                'success': False
            }), 400
        
        # Prepare data for prediction
        # Create DataFrame with the expected features
        input_df = pd.DataFrame([[
            age,
            income,
            credit_score,
            employment_years,
            loan_amount,
            loan_duration,
            existing_debts
        ]], columns=[
            'Age',
            'Income',
            'Credit_Score',
            'Employment_Years',
            'Loan_Amount',
            'Loan_Duration_Years',
            'Existing_Debts'
        ])
        
        # Scale the input data
        scaled_input = scaler.transform(input_df)
        
        # Make prediction
        prediction = model.predict(scaled_input)
        prediction_proba = model.predict_proba(scaled_input)
        
        # Calculate confidence (probability of the predicted class)
        confidence = float(max(prediction_proba[0]))
        
        # Calculate additional metrics
        monthly_income = income / 12
        monthly_debt = existing_debts / 12
        monthly_rate = 0.10 / 12  # 10% annual interest rate
        num_months = loan_duration * 12
        
        # EMI calculation
        emi = (loan_amount * monthly_rate * (1 + monthly_rate)**num_months) / \
              ((1 + monthly_rate)**num_months - 1)
        
        total_payable = emi * num_months
        total_interest = total_payable - loan_amount
        debt_to_income = ((monthly_debt + emi) / monthly_income) * 100
        
        return jsonify({
            'success': True,
            'prediction': int(prediction[0]),
            'approved': int(prediction[0]) == 1,
            'confidence': confidence,
            'emi': round(emi, 2),
            'total_payable': round(total_payable, 2),
            'total_interest': round(total_interest, 2),
            'debt_to_income_ratio': round(debt_to_income, 2),
            'message': 'Loan approved' if int(prediction[0]) == 1 else 'Loan rejected',
            'prediction_probabilities': {
                'rejected': float(prediction_proba[0][0]),
                'approved': float(prediction_proba[0][1])
            }
        }), 200
        
    except Exception as e:
        print(f"[✗] Error during prediction: {str(e)}")
        return jsonify({
            'error': f'Prediction failed: {str(e)}',
            'success': False
        }), 500


@app.route('/features', methods=['GET'])
def get_features():
    """Get information about the model features"""
    return jsonify({
        'features': [
            'Age',
            'Income',
            'Credit_Score',
            'Employment_Years',
            'Loan_Amount',
            'Loan_Duration_Years',
            'Existing_Debts'
        ],
        'model_type': 'Classification',
        'classes': [0, 1],
        'class_names': ['Rejected', 'Approved']
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Endpoint not found',
        'available_endpoints': ['/health', '/predict', '/features']
    }), 404


@app.errorhandler(405)
def method_not_allowed(error):
    """Handle 405 errors"""
    return jsonify({
        'error': 'Method not allowed',
        'message': 'Please use POST for /predict endpoint'
    }), 405


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    print(f"[*] Starting Flask API server on port {port}")
    print(f"[*] Debug mode: {debug_mode}")
    print(f"[*] API Endpoints:")
    print(f"    - GET  /health")
    print(f"    - POST /predict")
    print(f"    - GET  /features")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug_mode,
        use_reloader=debug_mode
    )
