DROP TABLE IF EXISTS universidad CASCADE;
CREATE TABLE universidad(
	id_universidad SERIAL PRIMARY KEY,
	nombre_universidad VARCHAR(30)
);

INSERT INTO universidad(nombre_universidad) VALUES('UV');
INSERT INTO universidad(nombre_universidad) VALUES('USC');
INSERT INTO universidad(nombre_universidad) VALUES('NACIONAL');
INSERT INTO universidad(nombre_universidad) VALUES('ICESI');

DROP TABLE IF EXISTS entidad_salud CASCADE;
CREATE TABLE entidad_salud(
	id_entidad SERIAL PRIMARY KEY,
	nombre_entidad VARCHAR(30)
);

INSERT INTO entidad_salud(nombre_entidad) VALUES('SaludCoop');
INSERT INTO entidad_salud(nombre_entidad) VALUES('Coomeva');
INSERT INTO entidad_salud(nombre_entidad) VALUES('SaludE');

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
	nombre_profesional VARCHAR(30),
	direccion VARCHAR(30),
	barrio VARCHAR(30),
	registrado_por serial,
	id_universidad serial,
	id_entidadSalud serial,
	fecha_registro date,
	hora_registro time,
	email VARCHAR(30) UNIQUE NOT NULL,
	contrasenia VARCHAR(50) NOT NULL,
	FOREIGN KEY(registrado_por) REFERENCES funcionario(id_funcionario),
	FOREIGN KEY(id_universidad) REFERENCES universidad(id_universidad),
	FOREIGN KEY(id_entidadSalud) REFERENCES entidad_salud(id_entidad)
);

INSERT INTO profesional(num_id,tipo_id,nombre_profesional,direccion,barrio,registrado_por,id_universidad,id_entidadSalud,
						email,contrasenia) 
VALUES(1107530686,0,'P1','D1','B1',1,1,1,'p1@gmail.com','Hola!123');

INSERT INTO profesional(num_id,tipo_id,nombre_profesional,direccion,barrio,registrado_por,id_universidad,id_entidadSalud,
						email,contrasenia) 
VALUES(1108530686,0,'P2','D2','B2',1,2,2,'p2@gmail.com','Hola!123');

INSERT INTO profesional(num_id,tipo_id,nombre_profesional,direccion,barrio,registrado_por,id_universidad,id_entidadSalud,
						email,contrasenia) 
VALUES(1109530686,0,'P3','D3','B3',1,3,3,'p3@gmail.com','Hola!123');

DROP TABLE IF EXISTS paciente CASCADE;
CREATE TABLE paciente(
	num_id integer primary key NOT NULL,
	tipo_id integer NOT NULL,
	nombre_completo VARCHAR(30),
	edad integer,
	direccion VARCHAR(30) NOT NULL,
	ciudad VARCHAR(30) NOT NULL,
	barrio VARCHAR(30),
	id_doctor integer NOT NULL,
	geolocalizacion VARCHAR(40) NOT NULL,
	fecha_registro date,
	hora_registro time,
	FOREIGN KEY(id_doctor) REFERENCES profesional(num_id),
	num_personas_convivencia integer,
	hipotesis varchar(255)
);

INSERT INTO paciente(num_id, tipo_id, nombre_completo, edad, direccion, ciudad, barrio, id_doctor, 
					 geolocalizacion, num_personas_convivencia, hipotesis) 
					 VALUES(1110530686,0,'Victor Paciente','20','D1','Cali','Santa Elena',1107530686,'3.4339038 -76.5372512',2,'Se enferma en la casa');
					 
INSERT INTO paciente(num_id, tipo_id, nombre_completo, edad, direccion, ciudad, barrio, id_doctor, 
					 geolocalizacion, num_personas_convivencia, hipotesis) 
					 VALUES(1111530686,0,'Jose Paciente','50','D1','Cali','Santa Elena',1108530686,'3.4339038 -76.5372512',2,'Se enferma en el cine');
					 
INSERT INTO paciente(num_id, tipo_id, nombre_completo, edad, direccion, ciudad, barrio, id_doctor, 
					 geolocalizacion, num_personas_convivencia, hipotesis) 
					 VALUES(1112530686,0,'Mafe Paciente','32','D1','Cali','Santa Elena',1109530686,'3.4339038 -76.5372512',2,'Se enferma en el trabajo');	
					 
INSERT INTO paciente(num_id, tipo_id, nombre_completo, edad, direccion, ciudad, barrio, id_doctor, 
					 geolocalizacion, num_personas_convivencia, hipotesis) 
					 VALUES(1113530686,0,'David Paciente','10','D1','Cali','El Ingenio',1109530686,'3.4339038 -76.5372512',2,'Se enferma en el parque');				

DROP TABLE IF EXISTS laboratorio CASCADE;
CREATE TABLE laboratorio(
	id_laboratorio serial primary key,
	nombre_lab VARCHAR(30)
);
INSERT INTO laboratorio(nombre_lab) VALUES('Pharma');
INSERT INTO laboratorio(nombre_lab) VALUES('LabCoxi');
INSERT INTO laboratorio(nombre_lab) VALUES('LabMen');
INSERT INTO laboratorio(nombre_lab) VALUES('Rebaja');

DROP TABLE IF EXISTS medicamentos CASCADE;
CREATE TABLE medicamentos(
	id_medicamento serial primary key,
	nombre_medicamento VARCHAR(30)
);
INSERT INTO medicamentos(nombre_medicamento) VALUES('Mixamorranilo300');
INSERT INTO medicamentos(nombre_medicamento) VALUES('Choclometanol400');
INSERT INTO medicamentos(nombre_medicamento) VALUES('Chichanosol800');

DROP TABLE IF EXISTS gasto_medicamento CASCADE;
CREATE TABLE gasto_medicamento(
	id_gasto serial primary key,
	id_med integer,
	id_lab integer,
	reserva integer,
	FOREIGN KEY(id_lab) REFERENCES laboratorio(id_laboratorio)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY(id_med) REFERENCES medicamentos(id_medicamento)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);
INSERT INTO gasto_medicamento(id_med,id_lab,reserva) VALUES(1,1,10);
INSERT INTO gasto_medicamento(id_med,id_lab,reserva) VALUES(2,2,5);
INSERT INTO gasto_medicamento(id_med,id_lab,reserva) VALUES(1,3,20);
INSERT INTO gasto_medicamento(id_med,id_lab,reserva) VALUES(3,4,2);


DROP TABLE IF EXISTS visita CASCADE;
CREATE TABLE visita(
	id_visita SERIAL PRIMARY KEY,
	id_doctor integer,
	id_paciente integer,
	id_medicamento integer,
	FOREIGN KEY (id_medicamento) REFERENCES gasto_medicamento(id_gasto),
	FOREIGN KEY(id_doctor) REFERENCES profesional(num_id),
	FOREIGN KEY(id_paciente) REFERENCES paciente(num_id),
	num_semana serial,
	fecha_registro date,
	hora_registro time,
	temperatura VARCHAR(30),
	peso VARCHAR(30),
	presion VARCHAR(30),
	dosis VARCHAR(30),
	observacion VARCHAR(60)
);

INSERT INTO visita(id_doctor, id_paciente, id_medicamento, temperatura, peso, presion,dosis,observacion) 
VALUES(1107530686, 1111530686,1,'35ª','50kg','120/80','3mg','Está mejorando.');
INSERT INTO visita(id_doctor, id_paciente, id_medicamento, temperatura, peso, presion,dosis,observacion) 
VALUES(1107530686, 1111530686,2,'30ª','50kg','120/80','5mg','Está empeorando.');
INSERT INTO visita(id_doctor, id_paciente, id_medicamento, temperatura, peso, presion,dosis,observacion) 
VALUES(1107530686, 1111530686,2,'40ª','50kg','120/80','6mg','Está mejorando.');

DROP TABLE IF EXISTS contacto CASCADE;
CREATE TABLE contacto(
	id_contacto SERIAL PRIMARY KEY,
	nombre_contacto VARCHAR(30),
	paciente_id integer,
	parentesco integer,
	FOREIGN KEY(paciente_id) REFERENCES paciente(num_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);


DROP TABLE IF EXISTS telefonos CASCADE;
CREATE TABLE telefonos(
	id_telefono serial primary key,
	id_contacto serial,
	FOREIGN KEY(id_contacto) REFERENCES contacto(id_contacto)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	telefono VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS emails CASCADE;
CREATE TABLE emails(
	id_email serial primary key,
	id_contacto serial,
	FOREIGN KEY(id_contacto) REFERENCES contacto(id_contacto)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	email VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO funcionario(nombre_funcionario,apellido_funcionario,email,contrasenia) 
VALUES('Rodrigo','Martinez','rodrigo@secretaria.com','Hola!123');

-- TRIGGERS Y FUNCIONES ALMACENADAS


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
				RETURN QUERY SELECT num_id, 2 FROM profesional WHERE email=loginEmail;
			ELSE 
				id_:= NULL;
				type_:= NULL;
				return next;
			END IF;
	END
	$$ LANGUAGE 'plpgsql';
	
CREATE OR REPLACE FUNCTION actTiempoRegistroProfesional() RETURNS TRIGGER AS $$
	DECLARE
		fecha_actual date;
		hora_actual time;
	
	BEGIN
		fecha_actual := CURRENT_DATE;
		hora_actual := LOCALTIME;
		IF (TG_OP='UPDATE' or TG_OP='INSERT') THEN
			UPDATE profesional
				SET fecha_registro=fecha_actual, hora_registro=hora_actual
				WHERE num_id=new.num_id;
		END IF;
		RETURN NULL;
	END
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION crearUniversidadyEntidad(varchar,varchar) RETURNS table(id_u integer, id_e integer) AS $$
	DECLARE
			nombre_u ALIAS FOR $1;
			nombre_e ALIAS FOR $2;
	BEGIN
		IF EXISTS (SELECT nombre_universidad FROM universidad WHERE nombre_universidad = nombre_u) 
		AND EXISTS(SELECT id_entidad FROM entidad_salud WHERE nombre_entidad=nombre_e) THEN
		ELSE
				INSERT INTO universidad(nombre_universidad) VALUES(nombre_u);
				INSERT INTO entidad_salud(nombre_entidad) VALUES(nombre_e);
		END IF;
		id_u:= (SELECT id_universidad FROM universidad WHERE nombre_universidad=nombre_u);
		id_e := (SELECT id_entidad FROM entidad_salud WHERE nombre_entidad=nombre_e);
		return next;
	END
$$ LANGUAGE 'plpgsql';
	

CREATE OR REPLACE FUNCTION actTiempoRegistroPaciente() RETURNS TRIGGER AS $$
	DECLARE
		fecha_actual date;
		hora_actual time;
	
	BEGIN
		fecha_actual := CURRENT_DATE;
		hora_actual := LOCALTIME;
		IF (TG_OP='UPDATE' or TG_OP='INSERT') THEN
			UPDATE paciente
				SET fecha_registro=fecha_actual, hora_registro=hora_actual
				WHERE num_id=new.num_id;
		END IF;
		RETURN NULL;
	END
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION actTiempoRegistroVisita() RETURNS TRIGGER AS $$
	DECLARE
		fecha_actual date;
		hora_actual time;
	
	BEGIN
		fecha_actual := CURRENT_DATE;
		hora_actual := LOCALTIME;
		IF (TG_OP='UPDATE' or TG_OP='INSERT') THEN
			UPDATE visita
				SET fecha_registro=fecha_actual, hora_registro=hora_actual
				WHERE id_visita=new.id_visita;
		END IF;
		RETURN NULL;
	END
$$ LANGUAGE 'plpgsql';
	
CREATE OR REPLACE FUNCTION addContacto(integer,varchar,integer,varchar,varchar, integer) RETURNS BOOLEAN AS $$
	DECLARE
		id_pac alias for $1;
		nom_con alias for $2;
		parent alias for $3;
		tel alias for $4;
		em alias for $5;
		op alias for $6;
		aux integer;
	BEGIN
		IF op>0 THEN
			UPDATE contacto SET paciente_id=id_pac,nombre_contacto=nom_con,parentesco=parent WHERE id_contacto=op;
			UPDATE emails SET email=em WHERE id_contacto=op;
			UPDATE telefonos SET telefono=tel WHERE id_contacto=op;
		ELSE
			INSERT INTO contacto(paciente_id,nombre_contacto,parentesco) VALUES (id_pac,nom_con,parent);
			aux := (SELECT id_contacto from contacto WHERE nom_con=nombre_contacto);
			INSERT INTO emails (id_contacto,email) VALUES (aux,em);
			INSERT INTO telefonos (id_contacto,telefono) VALUES (aux,tel);
		END IF;
		RETURN TRUE;
	END
$$ LANGUAGE 'plpgsql';

DROP TRIGGER if EXISTS actTiempoInsertVisita
	ON visita;

CREATE TRIGGER actTiempoInsertVisita AFTER INSERT
ON visita FOR EACH ROW EXECUTE PROCEDURE actTiempoRegistroVisita();

DROP TRIGGER if EXISTS actTiempoUpdateVisita
	ON visita;
	
CREATE TRIGGER actTiempoUpdateVisita AFTER UPDATE OF id_visita
ON visita FOR EACH ROW EXECUTE PROCEDURE actTiempoRegistroVisita();

DROP TRIGGER if EXISTS actTiempoInsertPaciente
	ON paciente;

CREATE TRIGGER actTiempoInsertPaciente AFTER UPDATE OF num_id
ON paciente FOR EACH ROW EXECUTE PROCEDURE actTiempoRegistroPaciente();

DROP TRIGGER if EXISTS actTiempoUpdatePaciente
	ON paciente;
	
CREATE TRIGGER actTiempoUpdatePaciente AFTER INSERT
ON paciente FOR EACH ROW EXECUTE PROCEDURE actTiempoRegistroPaciente();

DROP TRIGGER if EXISTS actTiempoInsertProfesional
	ON profesional;
	
CREATE TRIGGER actTiempoInsertProfesional AFTER UPDATE OF num_id
ON profesional FOR EACH ROW EXECUTE PROCEDURE actTiempoRegistroProfesional();

DROP TRIGGER if EXISTS actTiempoUpdateProfesional
	ON profesional;

CREATE TRIGGER actTiempoUpdateProfesional AFTER INSERT
ON profesional FOR EACH ROW EXECUTE PROCEDURE actTiempoRegistroProfesional();

------- contagiados por barrio

DROP FUNCTION IF EXISTS PromContBarrio();
CREATE OR REPLACE FUNCTION PromContBarrio() RETURNS TABLE(nom_bar varchar(30),num_cont bigint) AS $$
	BEGIN
		return Query
			SELECT barrio,count(*) from paciente
				group by barrio;
	END
$$ LANGUAGE 'plpgsql';



------- contagiados por edad
DROP FUNCTION IF EXISTS promcontedad();
CREATE OR REPLACE FUNCTION PromContEdad() RETURNS table(totalpacientes bigint,pac20 bigint,pac30 bigint,pac50 bigint,pac_sup50 bigint) AS $$
	BEGIN
		return query
			select 
				Count(*) as "totalpacientes",
				Count(*) filter(where edad<20) as "pac20",
				Count(*) filter(where edad>20 and edad<30) as "pac30",
				Count(*) filter(where edad>30 and edad<50) as "pac50",
				Count(*) filter(where edad>50) as "pac_sup50"
			From paciente;
	END
$$ LANGUAGE 'plpgsql'


------- numero de visitas por dia

DROP FUNCTION IF EXISTS PromContDia();
CREATE OR REPLACE FUNCTION PromContDia(varchar(10)) RETURNS varchar AS $$
	DECLARE
		dia alias for $1;
		cont varchar;
		aux date;
	BEGIN
		aux := (select TO_DATE(dia, 'YYYY-MM-DD'));
		cont := (select count(*)from paciente
					Where fecha_registro=aux);
		return cont;
	END
$$ LANGUAGE 'plpgsql'

select * from contacto
------- numero de visitas por mes

DROP FUNCTION IF EXISTS PromContMes();
CREATE OR REPLACE FUNCTION PromContMes(varchar(6)) RETURNS varchar AS $$
	DECLARE
		mes alias for $1;
		cont varchar;
		aux1 varchar;
		aux2 varchar;
	BEGIN
		aux1 := (select mes||'-01');
		aux2 := (select TO_DATE(mes, 'YYYY-MM-DD'));
		cont := (select count(*)from paciente as pc
					Where EXTRACT(MONTH from pc.fecha_registro)=EXTRACT(MONTH FROM aux2::date) AND EXTRACT(YEAR from pc.fecha_registro)=EXTRACT(YEAR FROM '2020-12-20'::date) );
		return cont;
	END
$$ LANGUAGE 'plpgsql'



Drop FUNCTION IF EXISTS existenciasMed;
CREATE OR REPLACE FUNCTION existenciasMed(varchar(30),varchar(30)) RETURNS TABLE(id_gast integer, existence integer) AS $$
	DECLARE
		nombreMed ALIAS FOR $1;
		labMed ALIAS FOR $2;
		idLab integer;
		idMed integer;
		
	BEGIN
		idLab := (select id_laboratorio from laboratorio where nombre_lab ilike labMed);
		idMed := (select id_medicamento from medicamentos where nombre_medicamento ilike nombreMed);
		
		RETURN Query 
			select id_gasto,reserva from gasto_medicamento
				where id_med=idMed and id_lab=idLab;
	END
$$ LANGUAGE 'plpgsql';

select * from profesional
select * from visita
INSERT INTO visita(id_doctor, id_paciente, id_medicamento, temperatura, peso, presion,dosis,observacion) 
VALUES(31878652,1107530666,1,'35°','56kg','75/84','100gr/cm3','Está mejorando')
select * from gasto_medicamento
select * from medicamentos
select * from paciente
select * from laboratorio

INSERT INTO PACIENTE


