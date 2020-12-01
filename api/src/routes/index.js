const { Router } = require('express');
const router = Router();

const {
    login,
    logout,
    getPros,
    createPro,
    getProById,
    updatePro,
    deletePro,
    getPacient,
    getPacientById,
    createPacient,
    updatePacient,
    deletePacient
} = require('../controllers/index.controller')

router.post('/login', login);
router.post('/logout', logout);


router.get('/profesional', getPros);
router.get('/profesional/:id', getProById);
router.post('/registrarprofesional', createPro);
router.put('/actualizarprofesional', updatePro);
router.delete('/borrarprofesional/:id', deletePro);

router.get('/paciente', getPacient);
router.get('/paciente/:id', getPacientById);
router.post('/registrarpaciente', createPacient);
router.put('/actualizarpaciente', updatePacient);
router.delete('/borrarpaciente/:id', deletePacient);

module.exports = router;