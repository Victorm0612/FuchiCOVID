const { Router } = require('express');
const router = Router();

const { login, logout, getPros, createPro, getProById, updatePro, deletePro } = require('../controllers/index.controller')

router.post('/login', login);
router.post('/logout', logout);


router.get('/profesional', getPros);
router.get('/profesional/:id', getProById);
router.post('/registrarprofesional', createPro);
router.put('/actualizarprofesional', updatePro);
router.delete('/borrarprofesional/:id', deletePro);

module.exports = router;