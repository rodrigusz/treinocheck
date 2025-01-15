import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import loginRoutes from './backend/routes/login.js';
import cadastroAlunoRoutes from './backend/routes/cadastroaluno.js';
import frequenciaRoutes from './backend/routes/frequencia.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Configuração de middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'frontend/images')));

// Rotas
app.use('/', loginRoutes);
app.use('/', cadastroAlunoRoutes);
app.use('/', frequenciaRoutes);

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'frontend', 'index.html');
  res.sendFile(filePath);
});

app.get('/fichas', (req, res) => {
  const filePath = path.join(__dirname, 'frontend', 'fichas.html');
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
