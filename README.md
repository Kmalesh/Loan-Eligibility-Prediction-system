# RK Foundation - Loan Eligibility Prediction System

A modern, fully-responsive website for **RK Foundation** - a professional loan services company with an integrated AI-powered loan eligibility prediction system.

## 🎯 Features

- **Modern & Attractive UI**: Built with Next.js 15, Tailwind CSS, and Framer Motion animations
- **AI-Powered Loan Predictions**: Integration with machine learning model for instant eligibility assessment
- **Multi-Step Application Form**: User-friendly form with real-time validation and instant results
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Professional Components**:
  - Hero section with animated elements
  - Feature highlights
  - How it works process flow
  - Loan product cards
  - Testimonials section
  - FAQ accordion
  - Contact section

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Python 3.8+ (for ML model API)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rk-foundation-loans
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

### Running Locally

#### Start the Flask API (ML Model Server)

Open a terminal and run:
```bash
python flask_api.py
```

The Flask server will start on `http://localhost:5000` by default.

#### Start the Next.js Development Server

Open another terminal and run:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The Next.js app will start on `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
.
├── app/
│   ├── api/
│   │   └── predict/route.ts          # Next.js API route for predictions
│   ├── apply/
│   │   └── page.tsx                  # Loan application page
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── components/
│   ├── Navbar.tsx                    # Navigation component
│   ├── Footer.tsx                    # Footer component
│   ├── home/                         # Home page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── LoanProductsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTASection.tsx
│   └── loan-application/             # Loan application components
│       ├── LoanApplicationForm.tsx
│       ├── FormStep.tsx
│       └── ResultCard.tsx
├── flask_api.py                      # Flask API server for ML predictions
├── model.pkl                         # Trained ML model
├── scaler.pkl                        # Feature scaler
├── package.json                      # Node.js dependencies
├── requirements.txt                  # Python dependencies
├── tailwind.config.ts                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

## 🔌 API Endpoints

### ML Prediction API

#### Health Check
```
GET /health
```
Response:
```json
{
  "status": "healthy",
  "service": "Loan Eligibility Prediction API",
  "version": "1.0.0"
}
```

#### Loan Prediction
```
POST /api/predict
```
Request Body:
```json
{
  "age": 30,
  "income": 600000,
  "credit_score": 750,
  "employment_years": 5,
  "existing_debts": 100000,
  "loan_amount": 500000,
  "loan_duration": 5
}
```

Response:
```json
{
  "success": true,
  "approved": true,
  "confidence": 0.87,
  "emi": 9430.42,
  "totalPayable": 5658250,
  "totalInterest": 1158250,
  "debtToIncomeRatio": 23.45,
  "message": "Congratulations! Your loan application is approved."
}
```

## 🎨 Design System

### Colors
- **Primary**: #0052CC (Professional Blue)
- **Secondary**: #6C63FF (Vibrant Purple)
- **Accent**: #00D084 (Success Green)
- **Background**: #F5F5F5 (Light Gray)
- **Foreground**: #1A1A1A (Dark Gray)

### Typography
- **Font Family**: Inter
- **Heading Font Weight**: 700
- **Body Font Weight**: 400

## 🔐 Security Features

- Bank-level encryption for data transmission
- Secure API endpoints with CORS protection
- Input validation on both client and server
- Environment variable management for sensitive data
- Rate limiting ready (can be added with middleware)

## 📱 Responsive Design

- Mobile-first approach
- Optimized for screens from 320px to 4K+
- Smooth animations on all devices
- Touch-friendly interactive elements

## 🚀 Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy the Next.js app
4. Deploy the Flask API (separately, e.g., on Railway, Heroku, or AWS)

### Environment Variables for Production

```
FLASK_API_URL=https://your-flask-api.com
NEXT_PUBLIC_APP_NAME=RK Foundation
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📊 ML Model Integration

The system uses a pre-trained Random Forest/Gradient Boosting classifier for loan eligibility prediction. The model evaluates:

- Age and employment history
- Income and existing debt obligations
- Credit score
- Loan amount and duration
- Debt-to-income ratio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential. All rights reserved © RK Foundation.

## 📞 Support

For support, email: info@rkfoundation.com

## 🙏 Acknowledgments

- Built with [Next.js 15](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://www.framer.com/motion)
- Icons from [Lucide React](https://lucide.dev)
- ML Backend with [Flask](https://flask.palletsprojects.com) and [scikit-learn](https://scikit-learn.org)
