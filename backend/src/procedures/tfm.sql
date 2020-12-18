CREATE DEFINER=`root`@`localhost` PROCEDURE `tfmAddOrEdit`(
    IN _codeTfm         INT,
    IN _nombre          VARCHAR(20),
    IN _descripcion     VARCHAR(300)
)
BEGIN
    IF  _codeTfm = 0 THEN
        INSERT INTO tfm (nombre, descripcion)
        VALUES (_nombre, _descripcion);
        SET _codeTfm = LAST_INSERT_ID();
    ELSE
        UPDATE tfm
        SET 
            nombre      = _nombre,
            descripcion = _descripcion
            WHERE codeTfm = _codeTfm;
    END IF;
	SELECT _codeTfm AS codeTfm;
END