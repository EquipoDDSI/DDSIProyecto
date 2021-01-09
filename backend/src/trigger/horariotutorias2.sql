use departamento;

DELIMITER $$
CREATE TRIGGER comprobartutoria
BEFORE INSERT ON HorarioTutorias
FOR EACH ROW
BEGIN
  IF (NEW.hora_fin < NEW.hora_ini) THEN
      SET NEW.hora_fin = '00:00';
      SET NEW.hora_ini = '00:00';
  END IF ;
END$$
DELIMITER ;