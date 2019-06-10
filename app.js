'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
  //1. get values from the request, use parseInt to convert <string> to <number>
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  //2. validate values
  if(!a) {
    return res.status(400).send('Please provide a number for "a"');
  }
  if(!b) {
    return res.status(400).send('Please provide a number for "b"');
  }

  //3. compute sum and res.send answer as string literal
  const sumAnswer = a + b;
  res.send(`The Sum of ${a} and ${b} = ${sumAnswer}`);
});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = parseInt(req.query.shift);

  if(!text) {
    return res.status(400).send('Please provide text for input');
  }
  if(!shift) {
    return res.status(400).send('Please provide a shift number');
  }

  let ciphered = '';

  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      ciphered += text[i];
    } else {
      let code = text[i].charCodeAt(0) + shift;
      if ( code > 90 && code < 97 || code > 122) {
        code -= 26;
      }
      ciphered += String.fromCharCode(code);
    }
  }
  res.send(ciphered);
});

app.get('/lotto', (req, res) => {
  console.log(req.query.arr);
  let ourNumbers = req.query.arr;
  if (!ourNumbers || ourNumbers.length !== 6) {
    return res.status(400).send('Please provide six numbers');
  }
  for (let i = 0; i < ourNumbers.length; i++) {
    ourNumbers[i] = parseInt(ourNumbers[i]);
    if (ourNumbers[i] < 1 || ourNumbers[i] > 20) {
      return res.status(400).send('Numbers must be between 1 and 20');
    }
  }
  let winningNumbers = [];
  for (let i = 0; i < 6; i++) {
    winningNumbers.push(Math.floor(Math.random() * 20 + 1));
  }
  let matches = 0;
  for (let i = 0; i < 6; i++) {
    if (ourNumbers[i] === winningNumbers[i]) {
      matches++;
    }
  }
  console.log(winningNumbers);
  if (matches < 4) {
    res.send('Sorry, you lose');
  } else if (matches === 4) {
    res.send('Congratulations, you win a free ticket');
  } else if (matches === 5) {
    res.send('Congratulations! You win $100!');
  } else {
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  }
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});