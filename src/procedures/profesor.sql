CREATE DEFINER=`root`@`localhost` PROCEDURE `profesorAddOrEdit`(
    IN _codeProfesor         INT,
    IN _nombreProf          VARCHAR(20),
    IN _apellidoProf     VARCHAR(40)
)
BEGIN
    IF  _codeProfesor = 0 THEN
        INSERT INTO profesor (nombreProf, apellidoProf)
        VALUES (_nombreProf, _apellidoProf);
        SET _codeProfesor =  LAST_INSERT_ID();
    ELSE
        UPDATE profesor
        SET 
            nombreProf      = _nombreProf,
            apellidoProf = _apellidoProf
            WHERE codeProfesor = _codeProfesor;
    END IF;
	SELECT _codeProfesor AS codeProfesor;
END