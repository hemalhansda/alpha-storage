const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/download', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  const files = fs.readdirSync('uploads/');
  res.render('index', { files });
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
