import express from 'express';

const router = express.Router();


import chatbot from '../controllers/chatbotController.js'

//rotta per visualizzare tutti i prodotti metodo POST
router.post('/', chatbot);






//esportazione del Router
export default router;