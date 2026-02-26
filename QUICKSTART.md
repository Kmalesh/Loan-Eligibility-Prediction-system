# 🚀 Quick Start Guide - RK Foundation Loan Website

Get the RK Foundation loan website up and running in just a few minutes!

## Prerequisites

Make sure you have:
- Node.js 18+ installed ([Download](https://nodejs.org))
- Python 3.8+ installed ([Download](https://www.python.org))
- Git installed ([Download](https://git-scm.com))

## 5-Minute Setup

### Step 1: Install Dependencies (2 min)

**Terminal 1** - Install Node.js packages:
```bash
npm install
```

**Then** - Install Python packages:
```bash
pip install -r requirements.txt
```

### Step 2: Start Flask API (1 min)

**Terminal 1** - Start the ML prediction API:
```bash
python flask_api.py
```

You should see:
```
[✓] Model and scaler loaded successfully
[*] Starting Flask API server on port 5000
```

### Step 3: Start Next.js Server (2 min)

**Terminal 2** - Start the development server:
```bash
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

## ✅ You're Done!

Open your browser and visit: **http://localhost:3000**

### What to Try:

1. **Explore the Home Page**
   - Hero section with animated background
   - Features section highlighting loan benefits
   - How it works process flow
   - Loan product cards
   - Customer testimonials
   - FAQ section

2. **Test the Loan Application**
   - Click "Apply Now" button
   - Fill out the 3-step form
   - Enter your financial details
   - See instant AI-powered eligibility prediction
   - View EMI calculations and approval status

## 🔧 Troubleshooting

### Flask API Won't Start

**Problem**: `Error loading model files`

**Solution**: Make sure `model.pkl` and `scaler.pkl` are in the project root:
```bash
ls -la *.pkl
```

**Problem**: `Port 5000 already in use`

**Solution**: Use a different port:
```bash
PORT=5001 python flask_api.py
```

Then update `.env.local`:
```
FLASK_API_URL=http://localhost:5001
```

### Next.js Won't Start

**Problem**: `Port 3000 already in use`

**Solution**: Use a different port:
```bash
npm run dev -- -p 3001
```

**Problem**: `Module not found`

**Solution**: Reinstall dependencies:
```bash
rm -rf node_modules
npm install
```

### Predictions Not Working

**Problem**: `Failed to get prediction from ML model`

**Solution**: 
1. Check Flask API is running on port 5000
2. Verify `.env.local` has correct `FLASK_API_URL`
3. Check browser console for detailed error messages

## 📁 Project Structure

```
rk-foundation-loans/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (including /api/predict)
│   ├── apply/             # Loan application page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── home/              # Home page sections
│   └── loan-application/  # Application form
├── flask_api.py          # ML prediction server
├── model.pkl             # Trained ML model
├── scaler.pkl            # Feature scaler
├── package.json          # Node dependencies
└── requirements.txt      # Python dependencies
```

## 🎯 Key Features to Explore

### Home Page Features

1. **Hero Section** - Animated background with loan statistics
2. **Features Section** - 4 key benefits with gradient icons
3. **How It Works** - 4-step process visualization
4. **Loan Products** - 3 loan types with detailed features
5. **Testimonials** - Customer reviews with ratings
6. **FAQ Section** - Expandable Q&A about loans
7. **CTA Section** - Call-to-action for applications

### Application Form Features

1. **Multi-Step Form** - Organized into 3 logical sections
   - Personal Information
   - Loan Details
   - Financial Information

2. **Real-Time Validation** - Instant feedback on field errors

3. **AI-Powered Prediction**
   - Instant eligibility assessment
   - EMI calculation
   - Debt-to-income ratio
   - Approval confidence score

4. **Beautiful Results Card**
   - Animated result display
   - Loan repayment summary
   - Next steps guidance

## 🎨 Customization Tips

### Change Brand Name

Edit `/vercel/share/v0-project/components/Navbar.tsx`:
```tsx
<span className="text-xl font-bold">Your Company Name</span>
```

### Change Colors

Edit `/vercel/share/v0-project/tailwind.config.ts`:
```ts
colors: {
  primary: '#YOUR_COLOR',
  accent: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
}
```

### Change Loan Products

Edit `/vercel/share/v0-project/components/home/LoanProductsSection.tsx`:
```tsx
const products = [
  // Add your loan products here
];
```

## 📞 Support

- **Email**: info@rkfoundation.com
- **Documentation**: See `README.md` for detailed information
- **Issues**: Check `QUICKSTART.md` troubleshooting section

## 🎉 Next Steps

1. **Customize the content** - Update company name, description, and features
2. **Deploy** - Deploy to Vercel for Next.js and Railway/Heroku for Flask
3. **Add more features** - Authentication, document upload, etc.
4. **Monitor analytics** - Track application submissions and user behavior

---

**Happy lending! 🎊**
