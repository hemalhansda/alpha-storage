const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/download', express.static(process.env.FILE_PATH));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    let files = fs.readdirSync(process.env.FILE_PATH);
    files = files.map((file) => {
        const fileData = fs.statSync(process.env.FILE_PATH + file);
        const fileSizeInBytes = fileData.size / 1024;
        const fileSize = fileSizeInBytes > 1024
            ? (
                (fileSizeInBytes / 1024) > 1024
                ? ((fileSizeInBytes / 1024) / 1024).toFixed(2) + ' gb' 
                : (fileSizeInBytes / 1024).toFixed(2) + ' mb'
            )
            : fileSizeInBytes.toFixed(2) + ' kb';
        return {
            filePath: process.env.FILE_PATH + file,
            fileName: file,
            fileSize,
            createdAtRaw: new Date(fileData.ctime),
            createdAt: (() => {
                const dateOptions = {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                };
                const timeOptions = {
                    hour12: true,
                    hour: 'numeric',
                    minute: '2-digit'
                };
                
                const options3 = {
                    ...timeOptions, ... dateOptions
                };

                return new Date(fileData.ctime).toLocaleString('en-IN', options3)
            })()
        };
    });

    files.sort((a, b) => {
        if (a.createdAtRaw > b.createdAtRaw) return -1;
        return 1;
    });

    res.render('index', { files });
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
