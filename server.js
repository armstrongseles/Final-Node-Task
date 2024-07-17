const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const folderPath = './timestamp';

const date = new Date().toString() 

// Create the Folder timestamp
try {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
} catch (err) {
  console.error(err);
}

// Create date-time.txt file in timestamp folder and add current date in the file
fs.writeFileSync(path.join(folderPath, 'date-time.txt'), `${date}`);

// API endpoint to get the timestamp
app.get('/timestamp/date-time.txt', (req, res) => {
  res.send(`The date and time will display in this folder and file: ${path.join(folderPath, 'date-time.txt')}`);
});

// API endpoint to retrieve all text files in the folder
app.get('/files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Filter out only text files
    const textFiles = files.filter(file => path.extname(file) === '.txt');

    res.json({ textFiles });
  });
});

app.get('/', (req, res) => {
  res.send(`The current date and time is ${date}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});