require('dotenv').config();

module.exports = {
  FULL_NAME: process.env.FULL_NAME || 'john doe',
  DOB_DDMMYYYY: process.env.DOB_DDMMYYYY || '01011990',
  EMAIL: process.env.EMAIL || 'john.doe@example.com',
  ROLL_NUMBER: process.env.ROLL_NUMBER || 'ROLL0001',
  PORT: process.env.PORT || 3000
};
