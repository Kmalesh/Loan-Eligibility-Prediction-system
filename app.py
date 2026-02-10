# import streamlit as st
# import pandas as pd
# import pickle as pk

# model = pk.load(open('model.pkl','rb'))
# scaler = pk.load(open('scaler.pkl','rb'))

# st.header('Loan Predcition App')

# no_of_dep = st.slider('Choose No of dependents', 0, 5)
# grad = st.selectbox('Choose Education',['Graduated','Not Graduated'])
# self_emp = st.selectbox('Self Emoployed ?',['Yes','No'])
# Annual_Income = st.slider('Choose Annual Income', 0, 10000000)
# Loan_Amount = st.slider('Choose Loan Amount', 0, 10000000)
# Loan_Dur = st.slider('Choose Loan Duration', 0, 20)
# Cibil = st.slider('Choose Cibil Score', 0, 1000)
# Assets = st.slider('Choose Assets', 0, 10000000)

# if grad =='Graduated':
#     grad_s =0
# else:
#     grad_s = 1

# if self_emp =='No':
#     emp_s =0
# else:
#     emp_s = 1

# if st.button("Predict"):
#     pred_data = pd.DataFrame([[no_of_dep,grad_s,emp_s,Annual_Income,Loan_Amount,Loan_Dur,Cibil,Assets]],
#                          columns=['no_of_dependents','education','self_employed','income_annum','loan_amount','loan_term','cibil_score','Assets'])
#     pred_data = scaler.transform(pred_data)
#     predict = model.predict(pred_data)
#     if predict[0] == 1:
#         st.markdown('Loan Is Approved✅')
#     else:
#         st.markdown('Loan Is Rejected❌')



import streamlit as st
import pandas as pd
import pickle as pk

# Page Config
st.set_page_config(
    page_title="Loan Eligibility Prediction System",
    page_icon="💰",
    layout="centered"
)

# Load Model & Scaler
model = pk.load(open('model.pkl', 'rb'))
scaler = pk.load(open('scaler.pkl', 'rb'))

# Header (Left aligned)
st.markdown(
    "<h2 style='text-align: left; color: #2c3e50;'>Loan Eligibility Prediction System</h2>",
    unsafe_allow_html=True
)

st.write("---")

# ===================== INPUT SECTION =====================
st.subheader("📋 Enter Applicant Details")

no_of_dep = st.slider(
    'Number of Dependents',
    min_value=0,
    max_value=5
)

grad = st.selectbox(
    'Education',
    ['Graduated', 'Not Graduated']
)

self_emp = st.selectbox(
    'Self Employed',
    ['Yes', 'No']
)

Annual_Income = st.number_input(
    'Annual Income (₹)',
    min_value=0,
    step=50000
)

Loan_Amount = st.number_input(
    'Loan Amount (₹)',
    min_value=0,
    step=50000
)

Loan_Dur = st.selectbox(
    'Loan Duration',
    [
        '3 Months',
        '6 Months',
        '1 Year',
        '2 Years',
        '3 Years',
        '4 Years',
        '5 Years'
    ]
)

Cibil = st.slider(
    'CIBIL Score',
    min_value=300,
    max_value=900
)

Assets = st.number_input(
    'Total Assets Value (₹)',
    min_value=0,
    step=50000
)

# ===================== DATA PROCESSING =====================
# Encoding
grad_s = 0 if grad == 'Graduated' else 1
emp_s = 1 if self_emp == 'Yes' else 0

# Convert Loan Duration to numeric (months)
loan_duration_map = {
    '3 Months': 3,
    '6 Months': 6,
    '1 Year': 12,
    '2 Years': 24,
    '3 Years': 36,
    '4 Years': 48,
    '5 Years': 60
}
Loan_Dur_val = loan_duration_map[Loan_Dur]

st.write("---")

# ===================== PREDICTION =====================
if st.button("🔍 Predict Loan Eligibility"):
    pred_data = pd.DataFrame(
        [[
            no_of_dep,
            grad_s,
            emp_s,
            Annual_Income,
            Loan_Amount,
            Loan_Dur_val,
            Cibil,
            Assets
        ]],
        columns=[
            'no_of_dependents',
            'education',
            'self_employed',
            'income_annum',
            'loan_amount',
            'loan_term',
            'cibil_score',
            'Assets'
        ]
    )

    pred_data_scaled = scaler.transform(pred_data)
    prediction = model.predict(pred_data_scaled)

    st.write("---")

    if prediction[0] == 1:
        st.success("✅ Loan Approved")
    else:
        st.error("❌ Loan Rejected")
