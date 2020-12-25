const express = require('express');

const router = express.Router();

let message = '';

router.get('/', async (req, res) => {
    res.sendFile('index.html', { root: './public' });
})

router.post('/receiveMessage', (req, res) => {
    const { valueToSend } = req.body;
    console.log(req.body);
   
    message += `\n ${valueToSend}`;
    console.log(valueToSend);
    console.log(message);
    res.send('ok');
})

router.get('/getMessage', (req, res) => {
    res.send(message);
});



module.exports = router;