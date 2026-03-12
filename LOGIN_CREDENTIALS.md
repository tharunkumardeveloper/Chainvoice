# ChainVoice Login Credentials

## 🔐 Login Credentials

### MSME Login
**Required Fields:**
- Email Address
- GSTIN Number (15 characters)
- Password
- Udyam Registration Number

**Test Credentials:**
```
Email: priya@textiles.com
GSTIN: 27AAAPZ1234N1Z5
Password: msme123
Udyam: UDYAM-MH-27-1234567
```

### Lender/Bank Login
**Required Fields:**
- Email Address
- Password

**Test Credentials:**
```
Email: lender@bajajfinserv.com
Password: lender123
```

### Regulator Login
**Required Fields:**
- Official Email
- Password

**Test Credentials:**
```
Email: regulator@rbi.org.in
Password: regulator123
```

## 📝 Notes

- All fields are required for form submission
- The system accepts any valid input for demo purposes
- In production, these would be validated against actual databases
- Authentication persists across page reloads using localStorage
- Logout only happens when user explicitly clicks "Logout" button

## 🎯 Login Flow

1. Select role tab (MSME / Lender / Regulator)
2. Fill in the required fields
3. Click "Login Securely"
4. Redirected to respective dashboard

## 🚀 Quick Access URLs

- Login Page: `/auth/login`
- MSME Dashboard: `/msme/dashboard`
- Lender Dashboard: `/lender/dashboard`
- Regulator Dashboard: `/regulator/dashboard`
