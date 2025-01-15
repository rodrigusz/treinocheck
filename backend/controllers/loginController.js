import dotenv from 'dotenv';
import pool from '../db/pool.js';

dotenv.config();

export const loginUser = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    // Consulta no banco de dados
    const result = await pool.query(
      'SELECT * FROM alunos WHERE cpf = $1 AND senha = $2',
      [cpf, senha]
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        message: 'Login realizado com sucesso!',
      });
    } else {
      res.status(401).json({ message: 'CPF ou senha incorretos!' });
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
  }
};
