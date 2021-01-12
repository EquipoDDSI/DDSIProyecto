Use departamento;
DELIMITER $$
CREATE TRIGGER DescripcionPorDefectoTFG
BEFORE INSERT ON tfg
FOR EACH ROW
BEGIN
  IF NEW.descripcion = ""
    THEN
      SET NEW.nombreProf = "Descripción del TFG aún por desarrollar";
  END IF ;
END$$
DELIMITER ;