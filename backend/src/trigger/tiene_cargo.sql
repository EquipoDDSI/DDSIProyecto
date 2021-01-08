
Use departamento;

DELIMITER $$
CREATE TRIGGER actualizaFechaFin
BEFORE UPDATE ON profesor_tiene_cargo
FOR EACH ROW
BEGIN
  IF NEW.fecha_ini <> OLD.fecha_ini
    THEN
      SET NEW.fecha_fin =  DATE("2023-01-08");
  END IF ;
END$$
DELIMITER ;