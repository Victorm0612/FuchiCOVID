DROP TABLE IF EXISTS universidad CASCADE;
CREATE TABLE universidad(
	id_universidad SERIAL PRIMARY KEY,
	nombre_universidad VARCHAR(30)
);
DROP TABLE IF EXISTS entidad_salud CASCADE;
CREATE TABLE entidad_salud(
	id_entidad SERIAL PRIMARY KEY,
	nombre_entidad VARCHAR(30)
);

DROP TABLE IF EXISTS funcionario CASCADE;
CREATE TABLE funcionario(
	id_funcionario SERIAL PRIMARY KEY,
	nombre_funcionario VARCHAR(30),
	apellido_funcionario VARCHAR(30),
	email VARCHAR(30) UNIQUE NOT NULL,
	contrasenia VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS profesional CASCADE;
CREATE TABLE profesional(
	num_id integer PRIMARY KEY UNIQUE NOT NULL,
	tipo_id integer NOT NULL,
	direccion VARCHAR(30),
	barrio VARCHAR(30),
	registrado_por serial,
	id_universidad serial,
	id_entidadSalud serial,
	periodo_registro VARCHAR(12),
	mes_registro VARCHAR(12),
	dia_registro VARCHAR(10),
	hora_registro VARCHAR(10),
	email VARCHAR(30) UNIQUE NOT NULL,
	contrasenia VARCHAR(50) NOT NULL,
	FOREIGN KEY(registrado_por) REFERENCES funcionario(id_funcionario),
	FOREIGN KEY(id_universidad) REFERENCES universidad(id_universidad),
	FOREIGN KEY(id_entidadSalud) REFERENCES entidad_salud(id_entidad)
);

DROP TABLE IF EXISTS medicamentos CASCADE;
CREATE TABLE medicamentos(
	id_medicamento VARCHAR(10) primary key NOT NULL,
	nombre_medicamento VARCHAR(30),
	nombre_laboratorio VARCHAR(30),
	reservas integer
);

DROP TABLE IF EXISTS paciente CASCADE;
CREATE TABLE paciente(
	num_id VARCHAR(12) primary key NOT NULL,
	tipo_id integer NOT NULL,
	nombre_completo VARCHAR(30),
	direccion VARCHAR(30) NOT NULL,
	ciudad VARCHAR(30) NOT NULL,
	id_doctor VARCHAR(10) NOT NULL,
	geolocalizacion VARCHAR(40) NOT NULL,
	periodo_registro VARCHAR(12),
	mes_registro VARCHAR(12),
	dia_registro VARCHAR(10),
	hora_registro VARCHAR(10),
	FOREIGN KEY(id_doctor) REFERENCES profesional(num_id),
	num_personas_convivencia integer
);

DROP TABLE IF EXISTS visita CASCADE;
CREATE TABLE visita(
	id_visita SERIAL PRIMARY KEY,
	id_doctor VARCHAR(10),
	id_paciente VARCHAR(10),
	FOREIGN KEY(id_doctor) REFERENCES profesional(num_id),
	FOREIGN KEY(id_paciente) REFERENCES paciente(num_id),
	num_semana VARCHAR(10),
	periodo VARCHAR(12),
	mes VARCHAR(12),
	dia VARCHAR(10),
	hora VARCHAR(10),
	temperatura VARCHAR(10),
	peso VARCHAR(10),
	presion VARCHAR(10),
	observacion VARCHAR(60)
);

DROP TABLE IF EXISTS gasto_medicamento CASCADE;
CREATE TABLE gasto_medicamento(
	id_visita serial,
	id_medicamento VARCHAR(10),
	FOREIGN KEY(id_visita) REFERENCES visita(id_visita),
	FOREIGN KEY(id_medicamento) REFERENCES medicamentos(id_medicamento),
	laboratorio VARCHAR(30),
	dosis VARCHAR(20)
);

DROP TABLE IF EXISTS contacto CASCADE;
CREATE TABLE contacto(
	id_contacto SERIAL PRIMARY KEY,
	paciente_id VARCHAR(10),
	FOREIGN KEY(paciente_id) REFERENCES paciente(num_id)
);

DROP TABLE IF EXISTS telefonos CASCADE;
CREATE TABLE telefonos(
	id_contacto serial,
	FOREIGN KEY(id_contacto) REFERENCES contacto(id_contacto),
	telefono VARCHAR(10) NOT NULL
);

DROP TABLE IF EXISTS emails CASCADE;
CREATE TABLE emails(
	id_contacto serial,
	FOREIGN KEY(id_contacto) REFERENCES contacto(id_contacto),
	email VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO funcionario(nombre_funcionario,apellido_funcionario,email,contrasenia) 
VALUES('Rodrigo','Martinez','rodrigo@secretaria.com','Hola!123')

-- TRIGGERS Y FUNCIONES ALMACENADAS

select id_funcionario, 1 from funcionario
select * from profesional
select f_login('pro2@gmail.com','$2b$10$kmYZdB/WXyhMFLkm1vmYp.ImEREhxUrc6djaX.rdwEMcHSmuV/uDe')
select * from login('rodrigo@secretaria.com','Hola!123')

CREATE OR REPLACE FUNCTION login(varchar,varchar) RETURNS table(id_ integer, type_ integer) AS $$
	DECLARE
			loginEmail ALIAS FOR $1;
			loginPass ALIAS FOR $2;
			passProf varchar :=(SELECT contrasenia FROM profesional WHERE email=loginEmail);
			passFunc varchar :=(SELECT contrasenia FROM funcionario WHERE email=loginEmail);
		BEGIN
			IF loginPass = passFunc THEN
				RETURN QUERY SELECT id_funcionario, 1 FROM funcionario WHERE email=loginEmail;
			ELSIF loginPass = passProf THEN
				RETURN QUERY SELECT num_id, 1 FROM profesional WHERE email=loginEmail;
			ELSE 
				id_:= NULL;
				type_:= NULL;
				return next;
			END IF;
	END
	$$ LANGUAGE 'plpgsql';