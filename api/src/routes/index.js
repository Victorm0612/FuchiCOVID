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
    deletePacient,
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    getVisita,
    createVisita,
    updateVisita,
    deleteVisita,
    getMedicamentos,
    updateMedicamento
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

router.get('/contactos', getContacts);
router.get('/contacto/:id', getContactById);
router.post('/registrarcontacto', createContact);
router.put('/actualizarcontacto', updateContact);
router.delete('/borrarcontacto/:id', deleteContact);

router.get('/visitas', getVisita);
router.post('/registrarvisita', createVisita);
router.put('/actualizarvisita', updateVisita);
router.delete('/borrarvisita/:id', deleteVisita);

router.get('/medicamentos', getMedicamentos);
router.put('/actualizarmedicamento', updateMedicamento);
module.exports = router;