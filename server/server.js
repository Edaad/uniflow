const express = require('express');
const multer = require('multer');
const cors = require('cors');  // Import cors
const path = require('path');
const app = express();
const PORT = 5000;

// Enable CORS for all routes (allow requests from different origins)
app.use(cors());

// Set up storage for multer to save files in 'uploads' folder
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Init upload with multer
const upload = multer({ storage }).single('file');

// Set up a simple route for file upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed', error: err });
        }
        res.status(200).json({ message: 'File uploaded successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
