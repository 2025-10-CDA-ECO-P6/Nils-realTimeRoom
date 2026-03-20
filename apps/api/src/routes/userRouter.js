import express from 'express';
import { chatService } from '../services/chatService.js';

const router = express.Router();

router.post('/register-user', (req, res) => {
    const {pseudo, age, roomChoice} = req.body;
    if (!pseudo || pseudo.trim().length < 3) {
        return res.status(400).json({
            error: 'pseudo doit contenir au moin 3 chars'
        });
    }

    if (!chatService.isPseudoDispo(pseudo)) {
        return res.status(409).json({
            error: 'pseudo deja utilisé'
        });
    }

    console.log("INSCRIPTION reussie");
    res.status(200).json({
        success: true,
        message: 'utilisateur validé',
        user: {pseudo, age, roomChoice}
    });
});

export default router;