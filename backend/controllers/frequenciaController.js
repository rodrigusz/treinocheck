import pool from '../db/pool.js';

export const addFrequencia = async (req, res) => {
    const { aluno_id, data_treino, tipo_treino } = req.body; 

    if (!aluno_id || !data_treino || !tipo_treino) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const query = `
            INSERT INTO frequencia (id_alunos, data_treino, tipo_treino)
            VALUES ($1, $2, $3)
            RETURNING id_frequencia;
        `;
        
        const values = [aluno_id, data_treino, tipo_treino];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            res.status(200).json({
                message: "Frequência registrada com sucesso!",
                id_frequencia: result.rows[0].id_frequencia, 
            });
        } else {
            res.status(500).json({ message: "Erro ao registrar frequência." });
        }
    } catch (error) {
        console.error('Erro no banco de dados:', error);
        res.status(500).json({ message: "Erro ao registrar frequência." });
    }
};

export const listarFrequencias = async (req, res) => {
    const { id_alunos } = req.query;
  
    if (!id_alunos) {
      return res.status(400).json({ message: "ID do aluno é obrigatório." });
    }
  
    try {
      const query = `
        SELECT id_frequencia, data_treino, tipo_treino
        FROM frequencia
        WHERE id_alunos = $1
        ORDER BY data_treino DESC
      `;
      const result = await pool.query(query, [id_alunos]);
  
      console.log("Frequências retornadas do banco:", result.rows);  
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Erro ao listar frequências:', error);
      res.status(500).json({ message: "Erro ao listar frequências." });
    }
};  

export const editarFrequencia = async (req, res) => {
    const { id_frequencia, data_treino, tipo_treino } = req.body;

    if (!id_frequencia || !data_treino || !tipo_treino) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const query = `
            UPDATE frequencia
            SET data_treino = $1, tipo_treino = $2
            WHERE id_frequencia = $3
        `;
        const values = [data_treino, tipo_treino, id_frequencia];
        const result = await pool.query(query, values);

        if (result.rowCount > 0) {
            res.status(200).json({ message: "Frequência atualizada com sucesso!" });
        } else {
            res.status(404).json({ message: "Frequência não encontrada." });
        }
    } catch (error) {
        console.error('Erro ao editar frequência:', error);
        res.status(500).json({ message: "Erro ao editar frequência." });
    }
};

export const deletarFrequencia = async (req, res) => {
    const { id_frequencia } = req.params;
    console.log("ID da Frequência no servidor:", id_frequencia);
  
    if (!id_frequencia) {
      return res.status(400).json({ message: "ID da frequência inválido!" });
    }
  
    try {
        const query = 'DELETE FROM frequencia WHERE id_frequencia = $1';
        const result = await pool.query(query, [id_frequencia]);
  
        if (result.rowCount > 0) {
            res.status(200).json({ message: "Frequência deletada com sucesso!" });
        } else {
            res.status(404).json({ message: "Frequência não encontrada." });
        }
    } catch (error) {
        console.error('Erro ao deletar frequência:', error);
        res.status(500).json({ message: "Erro ao deletar frequência." });
    }
  };
  
  
  





