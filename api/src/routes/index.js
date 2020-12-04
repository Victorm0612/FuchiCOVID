const { Router } = require('express');
const router = Router();

const {
    refresh_token,
    login,
    logout,
    getUniversidad,
    getEntidad,
    getFun,
    getFunById,
    createFun,
    updateFun,
    deleteFun,
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
    getgastoMedicamentos,
    getgastoMedicamentoById,
    creategastoMedicamento,
    updategastoMedicamento,
    deletegastoMedicamento,
    getMedicamentos,
    getMedicamentosById,
    getLaboratorios,
    getExistencia,
} = require('../controllers/index.controller')

router.post('/refresh', refresh_token);

router.post('/login', login);
router.post('/logout', logout);

router.get('/entidad', getEntidad);
router.get('/universidad', getUniversidad);

router.get('/funcionario', getFun);
router.get('/funcionario/:id', getFunById);
router.post('/registrarfuncionario', createFun);
router.put('/actualizarfuncionario', updateFun);
router.delete('borrarfuncionario/:id', deleteFun);


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

router.get('/gastomedicamentos', getgastoMedicamentos);
router.get('/gastomedicamento/:id', getgastoMedicamentoById);
router.post('/registrargastomedicamento', creategastoMedicamento);
router.put('/actualizargastomedicamento', updategastoMedicamento);
router.delete('/borrargastomedicamento/:id', deletegastoMedicamento);

router.get('/medicamentos', getMedicamentos);
router.get('/medicamentos/:id', getMedicamentosById);
router.get('/laboratorios', getLaboratorios);
router.post('/existencia', getExistencia);
module.exports = router;