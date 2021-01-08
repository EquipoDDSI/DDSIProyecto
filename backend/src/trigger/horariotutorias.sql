DELIMITER $$
CREATE TRIGGER creartutoria
BEFORE INSERT ON horariotutorias
FOR EACH ROW
BEGIN
  IF NEW.hora_fin = "00:00:00"
    THEN
      SET NEW.hora_fin =  ADDTIME(NEW.hora_ini, "02:00:00");
  END IF ;
END$$
DELIMITER ;
