const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('*', (req, res) => {
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}/`);
});
