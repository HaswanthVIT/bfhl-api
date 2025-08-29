// index.js - Express server implementing POST /bfhl
const express = require('express');
const bodyParser = require('body-parser');
const cfg = require('./config');

const app = express();
app.use(bodyParser.json());

// Helper: split token into contiguous groups: letters, digits, specials
function splitGroups(token) {
  if (token === '') return [];
  const re = /[A-Za-z]+|\d+|[^A-Za-z0-9]+/g;
  return token.match(re) || [];
}

// Helper: check pure letter token
function isLetters(s) {
  return /^[A-Za-z]+$/.test(s);
}

// Helper: check pure number token
function isDigits(s) {
  return /^\d+$/.test(s);
}

// Helper: check pure special token
function isSpecials(s) {
  return /^[^A-Za-z0-9]+$/.test(s);
}

// Main processing logic
function processArray(arr) {
  const numbers = []; // numeric values
  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = []; // uppercase tokens that are purely letters
  const special_characters = [];
  let concatLetters = ''; // collect letter chars in input order

  for (const tok of arr) {
    // treat non-string tokens by converting to string
    const s = typeof tok === 'string' ? tok : String(tok);

    // split into groups
    const groups = splitGroups(s);

    // if token empty string, groups may be []
    if (groups.length === 0) continue;

    for (const g of groups) {
      if (isDigits(g)) {
        const n = Number(g);
        numbers.push(n);
        if (n % 2 === 0) even_numbers.push(String(n));
        else odd_numbers.push(String(n));
      } else if (isLetters(g)) {
        // alphabet-only token
        alphabets.push(g.toUpperCase());
        concatLetters += g; // add letters (in order)
      } else if (isSpecials(g)) {
        special_characters.push(g);
      } else {
        // shouldn't happen, but be safe: split further character by character
        for (const ch of g) {
          if (/[A-Za-z]/.test(ch)) {
            concatLetters += ch;
          } else if (/\d/.test(ch)) {
            const n = Number(ch);
            numbers.push(n);
            if (n % 2 === 0) even_numbers.push(String(n));
            else odd_numbers.push(String(n));
          } else {
            special_characters.push(ch);
          }
        }
      }
    }
  }

  // compute numeric sum
  const sumNumeric = numbers.reduce((a,b) => a + b, 0);
  const sum = String(sumNumeric);

  // compute concat_string: letters only, reverse, alternating caps starting UPPER at index 0
  const reversed = concatLetters.split('').reverse().join('');
  let concat_string = '';
  for (let i=0;i<reversed.length;i++) {
    const ch = reversed[i];
    concat_string += (i % 2 === 0) ? ch.toUpperCase() : ch.toLowerCase();
  }

  return {
    is_success: true,
    user_id: (cfg.FULL_NAME.trim().toLowerCase().replace(/\s+/g, '_') + '_' + cfg.DOB_DDMMYYYY),
    email: cfg.EMAIL,
    roll_number: cfg.ROLL_NUMBER,
    even_numbers,
    odd_numbers,
    alphabets,
    special_characters,
    sum,
    concat_string
  };
}

// Route
app.post('/bfhl', (req, res) => {
  try {
    const body = req.body;

    if (!Array.isArray(body)) {
      return res.status(400).json({ is_success: false, error: "Request body must be a JSON array." });
    }

    const result = processArray(body);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
});

// Start
const port = cfg.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = { processArray }; // exported for tests
