CREATE DEFINER=`root`@`localhost` PROCEDURE `cargoAddOrEdit`(
    IN _codeCargo         INT,
    IN _nombreCargo          VARCHAR(20)
)
BEGIN
    IF  _codeCargo = 0 THEN
        INSERT INTO cargo (nombreCargo)
        VALUES (_nombreCargo);
        SET _codeCargo = LAST_INSERT_ID();
    ELSE
        UPDATE cargo
        SET 
            nombreCargo      = _nombreCargo
            WHERE codeCargo = _codeCargo;
    END IF;
	SELECT _codeCargo AS codeCargo;
END