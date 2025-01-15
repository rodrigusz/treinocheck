import express from 'express';
import path from 'path';  
import { fileURLToPath } from 'url'; 
import { cadastrarAluno } from '../controllers/alunoController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/cadastroaluno', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'frontend', 'cadastroaluno.html'); 
  res.sendFile(filePath); 
});

router.post('/cadastroaluno', cadastrarAluno);

export default router;
