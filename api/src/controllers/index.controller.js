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
    // Se loguea usando la funcion almacenada login la cual devuelve id y tipo de usuario
    const { email, contrasenia } = req.body;
    response = await pool.query(`SELECT * FROM login('${email}','${contrasenia}')`)
    const id_user = response.rows[0].id_;
    const type_user = response.rows[0].type_;
    if (id_user || type_user) {
        // si son diferentes de nulo quiere decir que los datos son correctos.
        const payLoad = { "id": id_user, "type": type_user };
        const token = jwt.sign(payLoad, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' })
        const refreshtoken = jwt.sign(payLoad, JWT_REFRESH_SECRET, { algorithm: 'HS256' })

        res.setHeader("set-cookie", [`JWT_TOKEN=${token}; httponly; samesite=lax`])
        res.status(200).json({ 'TOKEN': token, 'REFRESH_TOKEN': refreshtoken })
    } else {
        // si son nulos entonces los datos son incorrectos.
        res.status(403).json({ 'RES': 'ERROR' })
        return;
    }

}

const logout = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.body.refreshToken;
    if (token) {
        //Finaliza validación del token -----
        if (req.cookies.JWT_TOKEN) {
            res.setHeader("set-cookie", [`JWT_TOKEN=${null}; httponly; samesite=lax`])
        }
        res.send({ "RES": "logged out" })
    } else {
        res.status(403).json({ 'RES': 'ERROR' })
    }
};

const getPros = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.headers.authorization
    if (token) {
        const user = await validateToken(token.substring(6), JWT_SECRET);
        if (user === null)
            res.status(403).json({ 'RES': 'ERROR' })
        else {
            // Finaliza validación del token -----
            const response = await pool.query('SELECT * FROM profesional');
            res.json(response.rows);
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR' })
    }

};

const getProById = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.headers.authorization
    if (token) {
        const user = await validateToken(token.substring(6), JWT_SECRET);
        if (user === null)
            res.status(403).json({ 'RES': 'ERROR' })
        else {
            // Finaliza validación del token -----
            const id = req.params.id
            try {
                const response = await pool.query(`SELECT * FROM profesional WHERE num_id='${id}'`);
                res.json(response.rows)
            } catch (error) {
                res.status(403).json({ 'RES': 'ERROR' })
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR' })
    }
};

const createPro = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.headers.authorization
    if (token) {
        const user = await validateToken(token.substring(6), JWT_SECRET);
        if (user === null)
            res.status(403).json({ 'RES': 'ERROR' })
        else {
            // Finaliza validación del token -----
            const { num_id, tipo_id, direccion, barrio, registrado_por, id_universidad, id_entidadSalud, periodo_registro, mes_registro, dia_registro, hora_registro, email, contrasenia } = req.body;
            try {
                await pool.query(
                    `INSERT INTO profesional(num_id,tipo_id,direccion,barrio,registrado_por,id_universidad,id_entidadSalud,periodo_registro,mes_registro,dia_registro,hora_registro,email,contrasenia) VALUES('${num_id}','${tipo_id}','${direccion}','${barrio}','${registrado_por}','${id_universidad}','${id_entidadSalud}','${periodo_registro}','${mes_registro}','${dia_registro}','${hora_registro}','${email}','${contrasenia}')`
                );
                res.json(req.body);
            } catch (error) {
                res.json({ 'RES': error });
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR' })
    }

};

const updatePro = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.headers.authorization
    if (token) {
        const user = await validateToken(token.substring(6), JWT_SECRET);
        if (user === null)
            res.status(403).json({ 'RES': 'ERROR' })
        else {
            // Finaliza validación del token -----
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
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR' })
    }
};

const deletePro = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.headers.authorization
    if (token) {
        const user = await validateToken(token.substring(6), JWT_SECRET);
        if (user === null)
            res.status(403).json({ 'RES': 'ERROR' })
        else {
            // Finaliza validación del token -----
            const id = req.params.id;
            try {
                await pool.query(
                    `DELETE FROM profesional WHERE id_profesional = ${id}`
                );
                res.json({ 'RES': 'BORRADO' });
            } catch (error) {
                res.json({ 'RES': 'NO SE ENCUENTRA' });
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR' })
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