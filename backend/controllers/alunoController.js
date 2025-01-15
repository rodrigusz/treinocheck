import pool from '../db/pool.js';

export const cadastrarAluno = async (req, res) => {
  const { nome, cpf, email, senha } = req.body;

  try {
    const existingUser = await pool.query(
      'SELECT * FROM alunos WHERE cpf = $1 OR email = $2',
      [cpf, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'CPF ou Email já cadastrados.' });
    }

    const result = await pool.query(
      'INSERT INTO alunos (nome, cpf, email, senha) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, cpf, email, senha]
    );

    res.status(201).json({ message: 'Aluno cadastrado com sucesso!', data: result.rows[0] });
  } catch (err) {
    console.error('Erro ao cadastrar aluno:', err);
    res.status(500).json({ message: 'Erro ao cadastrar aluno. Tente novamente mais tarde.' });
  }
};
