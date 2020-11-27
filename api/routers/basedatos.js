const { Pool } = require('pg');
const Router = require('express-promise-router');
const keys = require('../config/keys');
const { query } = require('express');
const bcrypt = require('bcrypt');


const pool = new Pool({
    connectionString: keys.posgresqlURI,
    ssl: process.env.DATABASE_URL ? true : false
});

pool.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;
/*Contacto, emails, entidad_salud, funcionario, 
gasto_medicamento, medicamentos, paciente, profesional, telefonos, universidad, vista */

router.post('/insertaruniversidad', async(req, res) => {
    const { nombre_universidad } = req.body;
    console.log(req.body)
    try {
        await pool.query(`INSERT INTO universidad(nombre_universidad) VALUES('${nombre_universidad}')`);
        res.json({ "RES": 'INSERTADO' })
    } catch (error) {
        res.json({ 'RES': 'ERROR' });
    }
})
router.post('/insertarentidadsalud', async(req, res) => {
    const { nombre_entidad } = req.body;
    console.log(req.body)
    try {
        await pool.query(`INSERT INTO entidad_salud(nombre_entidad) VALUES('${nombre_entidad}')`)
        res.json({ 'RES': 'INSERTADO' })
    } catch (error) {
        res.json({ 'RES': error })
    }
})

router.post('/insertarprofesional', (req, res) => {
    const {
        num_id,
        tipo_id,
        direccion,
        barrio,
        registrado_por,
        id_universidad,
        id_entidadSalud,
        periodo_registro,
        mes_registro,
        dia_registro,
        hora_registro,
        email,
        contrasenia
    } = req.body;
    console.log(req.body)
    try {
        pool.query(
            `INSERT INTO profesional(num_id,tipo_id,direccion,barrio,registrado_por,id_universidad,id_entidadSalud,periodo_registro,mes_registro,dia_registro,hora_registro,email,contrasenia) VALUES('${num_id}','${tipo_id}','${direccion}','${barrio}','${registrado_por}','${id_universidad}','${id_entidadSalud}','${periodo_registro}','${mes_registro}','${dia_registro}','${hora_registro}','${email}','${contrasenia}')`
        );
        res.json({ 'RES': 'ACTUALIZADO' });
    } catch (error) {
        res.json({ 'RES': error });
    }

});

router.get('/login', async(req, res) => {
    const { email, password } = req.body;
    const booleans = await pool.query(`SELECT login('${email}','${password}')`);
    const value = booleans.rows[0].login
    if (value == 1) {
        let user = await pool.query(`SELECT * FROM funcionario WHERE email='${email}'`)
        res.json({ 'type_user': value, 'user': user.rows[0] })
    } else if (value == 2) {
        let user = await pool.query(`SELECT * FROM profesional WHERE email='${email}'`)
        res.json({ 'type_user': value, 'user': user.rows[0] })
    } else {
        res.json({ 'RES': 'Email o contraseña incorrecta.' })
    };

})

router.get('/consultaprofesional', async(req, res) => {

    const { rows } = await pool.query('SELECT * FROM profesional');
    res.json(rows);
});

router.put('/actualizarprofesional', async(req, res) => {
    const {
        id_profesional,
        num_id,
        tipo_id,
        direccion,
        barrio,
        registrado_por,
        id_universidad,
        id_entidadSalud,
        periodo_registro,
        mes_registro,
        dia_registro,
        hora_registro,
        email,
        contrasenia
    } = req.body;
    await pool.query(
        `UPDATE profesional SET num_id = '${num_id}', tipo_id = '${tipo_id}', direccion = '${direccion}', barrio='${barrio}', registrado_por=${registrado_por}, id_universidad=${id_universidad}, id_entidadSalud=${id_entidadSalud}, periodo_registro='${periodo_registro}', mes_registro='${mes_registro}', dia_registro='${dia_registro}', hora_registro='${hora_registro}',email='${email}', contrasenia='${contrasenia}' WHERE id_profesional = '${id_profesional}'`
    );
    res.json({ 'RES': 'ACTUALIZADO' });
});


router.delete('/borrarprofesional/:id', async(req, res) => {
    const id = req.params.id;
    await pool.query(
        `DELETE FROM profesional WHERE id_profesional = '${id}'`
    );
    res.json({ 'RES': 'BORRADO' });
});