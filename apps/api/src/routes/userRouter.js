const express = require('express');
const { chatService } = require('../services/chatService.js');
const router = express.Router();

router.post('/register-user', (req, res) => {
    const {pseudo, age, roomChoice} = req.body;
    if (!pseudo || pseudo.trim().length < 3) {
        return res.status(400).json({
            error: 'pseudo doit contenir au moin 3 chars'
        })
    }

    if (!chatService.isPseudoDispo(pseudo)) {return res.status(409).json({
        error: 'pseudo deja utilisé'
    })
    }

    chatService.addUser(pseudo);
    console.log("INSCRIPTION reusiis");
    res.status(200).json({
        success: true,
        message: 'utilisateur validé ',
        user : {pseudo, age, roomChoice}
    });
});

module.exports = router;