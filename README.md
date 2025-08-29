# BFHL REST API

This is a REST API built for the **Bajaj Finserv Health Limited (BFHL) Full Stack Test**.  
The API processes an array of inputs and returns structured JSON with numbers, alphabets, special characters, and computed fields.

---

## 🚀 Live Demo
Base URL:  
https://web-production-3ae33.up.railway.app/bfhl


Method: **POST**  
Content-Type: **application/json**

---

## 📌 Features

- Accepts an input array (mixed tokens).
- Returns:
  - `is_success` (boolean)  
  - `user_id` (format: full_name_ddmmyyyy, lowercase, underscores)  
  - `email`  
  - `roll_number`  
  - `even_numbers` (array of strings)  
  - `odd_numbers` (array of strings)  
  - `alphabets` (array of UPPERCASE strings)  
  - `special_characters` (array of special character tokens)  
  - `sum` (sum of numbers, string type)  
  - `concat_string` (all alphabets, reversed, alternating caps)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **Railway (Hosting)**

---

## 📂 Project Structure
bfhl-api/
│
├── index.js # Main server file
├── package.json # Dependencies & scripts
├── config.js # User details (env or hardcoded)
├── .env # Environment variables (not committed)
└── README.md # Project documentation

---

## ⚙️ Setup Instructions (Local)

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/bfhl-api.git
   cd bfhl-api
2. Install dependencies:
  npm install
3. Create a .env file:
  FULL_NAME=John Doe
  DOB_DDMMYYYY=01011990
  EMAIL=john.doe@example.com
  ROLL_NUMBER=12345
  PORT=3000
4. Start the server:
   npm start
5. Test using curl (Powershell)
   Invoke-RestMethod -Uri http://localhost:3000/bfhl -Method POST -ContentType "application/json" -Body '["a1b2","3","4"]'


--


Hosting:

This project is deployed on Railway:

https://web-production-3ae33.up.railway.app/bfhl

✅ Example Usage
Input:
["1", "2", "a", "b", "@", "xyz", "123"]

Output (example):
{
  "is_success": true,
  "user_id": "john_doe_01011990",
  "email": "john.doe@example.com",
  "roll_number": "12345",
  "even_numbers": ["2"],
  "odd_numbers": ["1", "123"],
  "alphabets": ["A", "B", "XYZ"],
  "special_characters": ["@"],
  "sum": "126",
  "concat_string": "ZyXbA"
}


 Author

Name: S HASWANTH

Email: haswanthsankar@gmail.com

Roll Number: 22BCE3117
