CREATE OR REPLACE FUNCTION verifyUser(pCorreo VARCHAR(255),pContrasena VARCHAR(30))
    RETURNS TABLE(idUser INTEGER)
    LANGUAGE plpgsql 
	AS $$
BEGIN
    RETURN QUERY SELECT u.idUser AS idUser FROM usuarios u WHERE u.correo=pCorreo AND u.contrasena=pContrasena;
END;
$$