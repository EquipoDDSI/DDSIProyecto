CREATE DEFINER=`root`@`localhost` PROCEDURE `alumnoAddOrEdit`(
    IN _codeAlumno         INT,
    IN _nombreAlumno          VARCHAR(20),
    IN _apellidoAlumno     VARCHAR(300)
)
BEGIN
    IF  _codeAlumno = 0 THEN
        INSERT INTO alumno (nombreAlumno, apellidoAlumno)
        VALUES (_nombreAlumno, _apellidoAlumno);
        SET _ =codeAlumno LAST_INSERT_ID();
    ELSE
        UPDATE alumno
        SET 
            nombreAlumno      = _nombreAlumno,
            apellidoAlumno = _apellidoAlumno
            WHERE codeAlumno = _codeAlumno;
    END IF;
	SELECT _codeAlumno AS codeAlumno;
END