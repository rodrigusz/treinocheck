import express from 'express';
import { listarFrequencias, addFrequencia, editarFrequencia, deletarFrequencia } from '../controllers/frequenciaController.js';

const router = express.Router();

router.post('/frequencia', addFrequencia);
router.get('/frequencias', listarFrequencias);
router.put('/frequencia', editarFrequencia);
router.delete('/frequencia/:id_frequencia', deletarFrequencia);

export default router;
