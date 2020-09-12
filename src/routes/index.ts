import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('Hola world');
});

export default router;
