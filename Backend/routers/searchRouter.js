import express from 'express';

const router = express.Router();

import search from "../controllers/searchController.js";


router.get('/:name', search);

export default router;