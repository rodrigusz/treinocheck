import express from 'express';
import path from 'path';  
import { fileURLToPath } from 'url'; 
import { loginUser } from '../controllers/loginController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/login', (req, res) => {
  const filePath = path.join(__dirname, '..', '..', 'frontend', 'login.html');
  res.sendFile(filePath);  
});

router.post('/login', loginUser);

export default router;
