// import statement in common js
const express = require('express');

// each call of express function is an application
const app = express();

app.get('/', (req, res)  => {
    res.send({ hi:'there' });
});

// listen to what port gets used or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);