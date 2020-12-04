CREATE DEFINER=`root`@`localhost` PROCEDURE `tesisAddOrEdit`(
    IN _codeTesis       INT,
    IN _nombre          VARCHAR(20),
    IN _descripcion     VARCHAR(300)
)
BEGIN
    IF  _codeTesis = 0 THEN
        INSERT INTO tesis (nombre, descripcion)
        VALUES (_nombre, _descripcion);
        SET _codeTesis = LAST_INSERT_ID();
    ELSE
        UPDATE tesis 
        SET 
            nombre      = _nombre,
            descripcion = _descripcion
            WHERE codeTesis = _codeTesis;
    END IF;
	SELECT _codeTesis AS codeTesis;
END