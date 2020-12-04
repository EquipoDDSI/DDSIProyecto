CREATE DEFINER=`root`@`localhost` PROCEDURE `tfgAddOrEdit`(
    IN _codeTfg         INT,
    IN _nombre          VARCHAR(20),
    IN _descripcion     VARCHAR(300)
)
BEGIN
    IF  _codeTfg = 0 THEN
        INSERT INTO tfg (nombre, descripcion)
        VALUES (_nombre, _descripcion);
        SET _codeTfg = LAST_INSERT_ID();
    ELSE
        UPDATE tfg
        SET 
            nombre      = _nombre,
            descripcion = _descripcion
            WHERE codeTfg = _codeTfg;
    END IF;
	SELECT _codeTfg AS codeTfg;
END