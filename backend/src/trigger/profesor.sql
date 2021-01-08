Use departamento;
DELIMITER $$
CREATE TRIGGER ActualizarProfesor
BEFORE UPDATE ON profesor
FOR EACH ROW
BEGIN
  IF NEW.nombreProf = ""
    THEN
      SET NEW.nombreProf = "Defecto";
  END IF ;
END$$
DELIMITER ;