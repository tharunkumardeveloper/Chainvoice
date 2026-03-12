# ChainVoice Login Credentials

## 🔐 Test Credentials (For Demo/Testing Only)

### MSME Login
**Fields Required:**
- Email Address: Any valid email (e.g., `priya@textiles.com`)
- GSTIN Number: `27AAAPZ1234N1Z5` (or any 15-character GSTIN)
- Password: Any password (e.g., `password123`)
- Udyam Number: `UDYAM-MH-27-1234567` (or any Udyam format)

**Example:**
```
Email: priya@textiles.com
GSTIN: 27AAAPZ1234N1Z5
Password: password123
Udyam: UDYAM-MH-27-1234567
```

### Lender/Bank Login
**Fields Required:**
- Email Address: Any valid email (e.g., `lender@bajajfinserv.com`)
- Password: Any password (e.g., `lender123`)

**Example:**
```
Email: lender@bajajfinserv.com
Password: lender123
```

### Regulator Login
**Fields Required:**
- Official Email: Any valid email (e.g., `regulator@rbi.org.in`)
- Password: Any password (e.g., `regulator123`)

**Example:**
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
