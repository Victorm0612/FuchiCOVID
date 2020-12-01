const path = require('path');
const { Pool } = require('pg')
const keys = require(path.join(__dirname, '../config/keys'));
const jwt = require('jsonwebtoken');
const express = require('express')
const cookieParser = require('cookie-parser')
app = express()
app.use(cookieParser(process.env.COOKIE_SECRET))


require('dotenv').config()

const pool = new Pool({
    connectionString: keys.posgresqlURI,
    ssl: process.env.DATABASE_URL ? true : false
});

const login = async(req, res) => {
    // Se loguea usando la funcion almacenada login la cual devuelve id y tipo de usuario
    const { email, contrasenia } = req.body;
    let response = await pool.query(`SELECT * FROM login('${email}','${contrasenia}')`)
    const id_user = response.rows[0].id_;
    const type_user = response.rows[0].type_;
    if (id_user || type_user) {
        // si son diferentes de nulo quiere decir que los datos son correctos.
        const payLoad = { "id": id_user, "type": type_user };
        const token = jwt.sign(payLoad, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' })
        const refreshtoken = jwt.sign(payLoad, process.env.JWT_REFRESH_SECRET, { algorithm: 'HS256' })

        const isSecure = req.app.get('env') != 'development';

        res.cookie('JWT_TOKEN', token, { httpOnly: true, secure: isSecure, signed: true, sameSite: true, expires: false, maxAge: 60 * 60 * 1000 })
        res.status(200).json({ token: token, refreshToken: refreshtoken, id: id_user, type: type_user })

    } else {
        // si son nulos entonces los datos son incorrectos.
        res.status(403).json({ 'RES': 'ERROR DE DATOS' })
        return;
    }

}

const logout = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.body.refreshToken;
    console.log(req)
    if (token) {
        //Finaliza validación del token -----
        res.cookie('JWT_TOKEN', null) // Cambio su valor a nulo pues de esta manera si no se borra del navegador, queda obsoleto.
        res.clearCookie('JWT_TOKEN'); // Elimino la cookie.
        res.send({ "RES": "logged out" })

    } else {
        res.status(403).json({ 'RES': 'ERROR' })
    }
};

const getPros = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null || user.type === 2)
            res.status(403).json({ 'RES': 'ERROR TOKEN INVALIDO' })
        else {
            // Finaliza validación del token -----
            const response = await pool.query('SELECT * FROM profesional');
            res.json(response.rows);
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR TOKEN VACIO' })
    }

};

const getProById = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    console.log(token)
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null || user.type === 2)
            res.status(403).json({ 'RES': 'ERROR TOKEN INVALIDO' })
        else {
            // Finaliza validación del token -----
            const id = req.params.id
            try {
                const response = await pool.query(`SELECT * FROM profesional WHERE num_id='${id}'`);
                res.json(response.rows)
            } catch (error) {
                res.status(403).json({ 'RES': 'ERROR, NO SE ENCUENTRA EL PROFESIONAL' })
            }
        }
    } else {
        console.log(req)
        res.status(403).json({ 'RES': 'ERROR TOKEN NULO' })
    }
};

const createPro = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null || user.type === 2)
            res.status(403).json({ 'RES': 'ERROR DE USUARIO' })
        else {
            // Finaliza validación del token -----
            const { num_id, tipo_id, nombre, direccion, barrio, registrado_por, universidad, entidadSalud, email, contrasenia } = req.body;
            let response = await pool.query(`SELECT * FROM crearUniversidadyEntidad('${universidad}','${entidadSalud}')`)
            const id_universidad = response.rows[0].id_u;
            const id_entidadSalud = response.rows[0].id_e;
            try {
                await pool.query(
                    `INSERT INTO profesional(num_id,tipo_id,nombre_profesional,direccion,barrio,registrado_por,id_universidad,id_entidadSalud,email,contrasenia) VALUES('${num_id}','${tipo_id}','${nombre}','${direccion}','${barrio}','${registrado_por}','${id_universidad}','${id_entidadSalud}','${email}','${contrasenia}')`
                );
                res.json(req.body);
            } catch (error) {
                res.json({ 'RES': 'ERROR AL REGISTRAR PROFESIONAL' + error });
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR CON TOKEN' })
    }

};

const updatePro = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null || user.type === 2)
            res.status(403).json({ 'RES': 'ERROR CON USUARIO' })
        else {
            // Finaliza validación del token -----
            const {
                num_id,
                tipo_id,
                nombre,
                direccion,
                barrio,
                registrado_por,
                universidad,
                entidadSalud,
                email,
                contrasenia
            } = req.body;
            let response = await pool.query(`SELECT * FROM crearUniversidadyEntidad('${universidad}','${entidadSalud}')`)
            const id_universidad = response.rows[0].id_u;
            const id_entidadSalud = response.rows[0].id_e;
            try {
                const response = await pool.query(
                    `UPDATE profesional SET tipo_id = '${tipo_id}', nombre_profesional='${nombre}', direccion = '${direccion}', barrio='${barrio}', registrado_por=${registrado_por}, id_universidad=${id_universidad}, id_entidadSalud=${id_entidadSalud}, email='${email}', contrasenia='${contrasenia}' WHERE num_id = '${num_id}'`
                );
                res.json(response.rows);
            } catch (error) {
                res.json({ 'RES': 'ERROR AL ACTUALIZAR PROFESIONAL' + error });
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR TOKEN INVALIDO' })
    }
};

const deletePro = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null || user.type === 2)
            res.status(403).json({ 'RES': 'ERROR' })
        else {
            // Finaliza validación del token -----
            const id = req.params.id;
            try {
                await pool.query(
                    `DELETE FROM profesional WHERE num_id = ${id}`
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

const getPacient = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null || user.type === 2)
            res.status(403).json({ 'RES': 'ERROR TOKEN INVALIDO' })
        else {
            // Finaliza validación del token -----
            try {
                const response = await pool.query(`SELECT * FROM paciente`)
                res.json(response.rows);
            } catch (error) {
                res.status(403).json({ 'RES': 'ERROR AL BUSCAR PACIENTES ' + error })
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR CON TOKEN' })
    }
};

const getPacientById = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null || user.type === 2)
            res.status(403).json({ 'RES': 'ERROR TOKEN INVALIDO' })
        else {
            // Finaliza validación del token -----
            const id = req.params.id
            try {
                const response = await pool.query(`SELECT * FROM paciente WHERE num_id='${id}'`);
                res.json(response.rows)
            } catch (error) {
                res.status(403).json({ 'RES': 'ERROR, NO SE ENCUENTRA EL PROFESIONAL' })
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR CON TOKEN' })
    }
};

const createPacient = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null || user.type === 2)
            res.status(403).json({ 'RES': 'ERROR TOKEN INVALIDO' })
        else {
            // Finaliza validación del token -----
            const { num_id, tipo_id, nombre_completo, direccion, ciudad, id_doctor, geolocalizacion, num_personas_convivencia } = req.body
            try {
                pool.query(`INSERT INTO paciente(num_id, tipo_id, nombre_completo, direccion, ciudad, id_doctor, geolocalizacion, num_personas_convivencia) VALUES('${num_id}', '${tipo_id}', '${nombre_completo}', '${direccion}', '${ciudad}', '${id_doctor}', '${geolocalizacion}', '${num_personas_convivencia}')`);
                res.json(req.body);
            } catch (error) {
                res.json({ 'RES': 'ERROR AL REGISTRAR PROFESIONAL' + error });
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR CON TOKEN' })
    }
};

const updatePacient = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null)
            res.status(403).json({ 'RES': 'ERROR TOKEN INVALIDO' })
        else {
            // Finaliza validación del token -----
            const { num_id, tipo_id, nombre_completo, direccion, ciudad, id_doctor, geolocalizacion, num_personas_convivencia } = req.body
            try {
                pool.query(`UPDATE paciente SET num_id='${num_id}', tipo_id='${tipo_id}', nombre_completo='${nombre_completo}', direccion='${direccion}', ciudad='${ciudad}', id_doctor='${id_doctor}', geolocalizacion='${geolocalizacion}', num_personas_convivencia='${num_personas_convivencia}'`);
                res.json({ 'RES': 'ACTUALIZADO' })
            } catch (error) {
                res.status(403).json({ 'RES': 'ERROR AL ACTUALIZAR PACIENTE ' + error })
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR CON TOKEN' })
    }
};

const deletePacient = async(req, res) => {
    //Validando que el token sea correcto ------
    const token = req.signedCookies.JWT_TOKEN
    if (token) {
        const user = await validateToken(token, process.env.JWT_SECRET);
        if (user === null)
            res.status(403).json({ 'RES': 'ERROR TOKEN INVALIDO' })
        else {
            // Finaliza validación del token -----
            const id = req.params.id;
            try {
                await pool.query(
                    `DELETE FROM paciente WHERE num_id = ${id}`
                );
                res.json({ 'RES': 'BORRADO' });
            } catch (error) {
                res.json({ 'RES': 'NO SE ENCUENTRA' });
            }
        }
    } else {
        res.status(403).json({ 'RES': 'ERROR CON TOKEN' })
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


};

module.exports = {
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
}