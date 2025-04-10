import express from 'express';

const router = express.Router();


import {index, show} from '../controllers/productController.js'

//rotta per visualizzare tutti i prodotti metodo GET
router.get('/', index);

//rotta per il singolo prodotto metodo GET
router.get('/:slug', show);




//esportazione del Router
export default router;