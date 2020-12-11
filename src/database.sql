CREATE DATABASE Departamento;
USE Departamento;

CREATE TABLE Cargo(
		codeCargo INT( ) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		nombreCargo VARCHAR(20) NOT NULL
);
CREATE TABLE HorarioTutorias (
		dia VARCHAR(10) NOT NULL,
		hora_ini TIME NOT NULL,
		hora_fin TIME NOT NULL,
		CHECK (`dia` IN ('Lunes','Martes', 'Miércoles', 'Jueves', 'Viernes')),
		CHECK(`hora_fin` > `hora_ini`),
		PRIMARY KEY (`dia`,`hora_ini`,`hora_fin`)
);

CREATE TABLE Profesor(
		codeProfesor INT( ) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		nombreProf VARCHAR(20) NOT NULL,
		apellidoProf VARCHAR(40) NOT NULL
);
CREATE TABLE Alumno(
		codeAlumno INT() NOT NULL AUTO_INCREMENT PRIMARY KEY,
		nombreAlumno VARCHAR(20) NOT NULL,
		apellidoAlumno VARCHAR(40) NOT NULL
);


CREATE TABLE TFG(
		codeTFG INT( ) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(20) NOT NULL,
		descripcion VARCHAR(300) NOT NULL
);

CREATE TABLE TFM(
		codeTFM INT( ) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(20) NOT NULL,
		descripcion VARCHAR(300) NOT NULL
);

CREATE TABLE Tesis(
		codeTesis INT( ) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		nombre VARCHAR(20) NOT NULL,
		descripcion VARCHAR(300) NOT NULL
);


CREATE TABLE Profesor_Tiene_Cargo(
		codeCargo INT( ) REFERENCES Cargo(codeCargo),
        codeProf CHAR(9) REFERENCES Profesor(codeProf),
		fecha_ini DATE NOT NULL,
		fecha_fin DATE, 
		CHECK (`fecha_fin`>`fecha_ini` OR `fecha_fin`=NULL),
		PRIMARY KEY (codeCargo, codeProf, fecha_ini)
);



CREATE TABLE Profesor_Tiene_HorarioTutorias (
        dia VARCHAR(10) NOT NULL,
		hora_ini TIME NOT NULL,
		hora_fin TIME NOT NULL,
CHECK (`dia` IN ('Lunes','Martes', 'Miércoles', 'Jueves', 'Viernes')),
CHECK(`hora_fin` > `hora_ini`),
		codeProf CHAR(9) PRIMARY KEY REFERENCES Profesor(codeProf),
        FOREIGN KEY (dia, hora_ini, hora_fin) REFERENCES HorarioTutorias(dia,hora_ini,hora_fin)
);


CREATE TABLE Profesor_Tutoriza_TFG (
		codeProf INT(9) REFERENCES Profesor(codeProf),
		codeTFG INT( ) NOT NULL REFERENCES TFG(codeTFG),
		PRIMARY KEY (codeTFG)
);


CREATE TABLE Profesor_Tutoriza_TFM (
		codeProf INT(9) REFERENCES Profesor(codeProf),
		codeTFM INT( ) NOT NULL REFERENCES TFM(codeTFM),
		PRIMARY KEY (codeTFM)
);

CREATE TABLE Profesor_Tutoriza_Tesis (
		codeProf INT(9) REFERENCES Profesor(codeProf),
		codeTesis INT( ) NOT NULL REFERENCES Tesis(codeTesis),
		PRIMARY KEY (codeTesis)
);


CREATE TABLE Alumno_AsignadoA_TFG (
		codeTFG INT( ) NOT NULL PRIMARY KEY REFERENCES TFG(codeTFG),
		codeAlumno INT(9) REFERENCES Alumno(codeAlumno)
);

CREATE TABLE Alumno_AsignadoA_TFM (
		codeTFM INT( ) NOT NULL PRIMARY KEY REFERENCES TFM(codeTFM),
		codeAlumno INT(9) REFERENCES Alumno(codeAlumno)
);

CREATE TABLE Alumno_AsignadoA_Tesis (
		codeTesis INT( ) NOT NULL PRIMARY KEY REFERENCES Tesis(codeTesis),
		codeAlumno CHAR(9) REFERENCES Alumno(codeAlumno)
);
