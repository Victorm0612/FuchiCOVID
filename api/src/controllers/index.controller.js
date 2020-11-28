const { Pool } = require('pg')
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "{8367E87C-B794-4A04-89DD-15FE7FDBFF78}"
const JWT_REFRESH_SECRET = "{asdfasdfdsfa-B794-4A04-89DD-15FE7FDBFF78}"

const pool = new Pool({
    connectionString: keys.posgresqlURI,
    ssl: process.env.DATABASE_URL ? true : false
});

const login = async(req, res) => {
    const { email, contrasenia } = req.body;
    response = await pool.query(`SELECT * FROM login('${email}','${contrasenia}')`)
    const id_user = response.rows[0].id_;
    const type_user = response.rows[0].type_;
    if (id_user || type_user) {

        const payLoad = { "id": id_user, "type": type_user };
        const token = jwt.sign(payLoad, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' })
        const refreshtoken = jwt.sign(payLoad, JWT_REFRESH_SECRET, { algorithm: 'HS256' })

        res.setHeader("set-cookie", [`JWT_TOKEN=${token}; httponly; samesite=lax`])
        res.status(200).json({ 'TOKEN': token, 'REFRESH_TOKEN': refreshtoken })
    } else {
        res.status(403).json({ 'RES': 'ERROR' })
        return;
    }

}

const logout = async(req, res) => {

    //logging out 
    const token = req.body.refreshToken;
    if (token) {
        if (req.cookies.JWT_TOKEN) {
            res.setHeader("set-cookie", [`JWT_TOKEN=${null}; httponly; samesite=lax`])
        }
        res.send({ "RES": "logged out" })
    } else {
        res.status(403).json({ 'RES': 'ERROR' })
    }
};

const getPros = async(req, res) => {
    const token = req.cookies.JWT_TOKEN;
    if (token) {
        const user = await validateToken(token, JWT_SECRET);
        const response = await pool.query('SELECT * FROM profesional');
        res.json(response.rows);
    }

};

const getProById = async(req, res) => {
    const id = req.params.id
    try {
        const response = await pool.query(`SELECT * FROM profesional WHERE id_profesional=${id}`)
        res.json(response.rows)
    } catch (error) {
        res.json({ 'RES': error })
    }

};

const createPro = async(req, res) => {
    const { num_id, tipo_id, direccion, barrio, registrado_por, id_universidad, id_entidadSalud, periodo_registro, mes_registro, dia_registro, hora_registro, email, contrasenia } = req.body;
    try {
        const response = await pool.query(
            `INSERT INTO profesional(num_id,tipo_id,direccion,barrio,registrado_por,id_universidad,id_entidadSalud,periodo_registro,mes_registro,dia_registro,hora_registro,email,contrasenia) VALUES('${num_id}','${tipo_id}','${direccion}','${barrio}','${registrado_por}','${id_universidad}','${id_entidadSalud}','${periodo_registro}','${mes_registro}','${dia_registro}','${hora_registro}','${email}','${contrasenia}')`
        );
        res.json(req.body);
    } catch (error) {
        res.json({ 'RES': error });
    }
};

const updatePro = async(req, res) => {
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
    try {
        const response = await pool.query(
            `UPDATE profesional SET num_id = '${num_id}', tipo_id = '${tipo_id}', direccion = '${direccion}', barrio='${barrio}', registrado_por=${registrado_por}, id_universidad=${id_universidad}, id_entidadSalud=${id_entidadSalud}, periodo_registro='${periodo_registro}', mes_registro='${mes_registro}', dia_registro='${dia_registro}', hora_registro='${hora_registro}',email='${email}', contrasenia='${contrasenia}' WHERE id_profesional = '${id_profesional}'`
        );
        res.json(response.rows);
    } catch (error) {
        res.json({ 'RES': 'ERROR' });
    }
};

const deletePro = async(req, res) => {
    const id = req.params.id;
    try {
        await pool.query(
            `DELETE FROM profesional WHERE id_profesional = ${id}`
        );
        res.json({ 'RES': 'BORRADO' });
    } catch (error) {
        res.json({ 'RES': 'NO SE ENCUENTRA' });
    }

};

async function validateToken(token, secret) {
    try {
        const result = jwt.verify(token, secret);

        return {
            "id": result.id,
            "type": result.type,
        }
    } catch (ex) {
        return null;
    }


}

module.exports = {
    login,
    logout,
    getPros,
    createPro,
    getProById,
    updatePro,
    deletePro
}