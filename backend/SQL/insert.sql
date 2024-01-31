CREATE OR REPLACE FUNCTION insertClient(pIdentificador VARCHAR(20),pNombre VARCHAR(30),pApellido1 VARCHAR(30),pApellido2 VARCHAR(30),pCorreo VARCHAR(255),pTipoIdentificacion VARCHAR(20),pProvincia VARCHAR(10),pDistrito VARCHAR(20),pCanton VARCHAR(20),pDescripcion TEXT,pNumero VARCHAR(10))
	RETURNS TABLE(idClient INTEGER)
	LANGUAGE plpgsql
    AS $$
BEGIN 
    INSERT INTO clientes(identificador,nombre,apellido1,apellido2,correo,tipoIdentificacion,provincia,distrito,canton,descripcionDetallada,numeroTelefonico)
    VALUES(pIdentificador,pNombre,pApellido1,pApellido2,pCorreo,pTipoIdentificacion,pProvincia,pDistrito,pCanton,pDescripcion,pNumero);
    RETURN QUERY SELECT MAX(clientes.idClient) FROM clientes;
    EXCEPTION
        WHEN SQLSTATE '23505' THEN
        RAISE EXCEPTION 'El correo electronico ya esta en uso.';

END;
$$

CREATE OR REPLACE FUNCTION insertUser(pNombre VARCHAR(30),pApellido1 VARCHAR(30),pApellido2 VARCHAR(30),pCorreo VARCHAR(255),pTelefono VARCHAR(20),pRol INTEGER,pContrasena VARCHAR(30),pPuesto VARCHAR(10))
	RETURNS TABLE(idUser INTEGER)
	LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO usuarios(nombre,apellido1,apellido2,correo,telefono,rol,contrasena,fechaRegistro,fechaModificacion,puesto)
    VALUES(pNombre,pApellido1,pApellido2,pCorreo,pTelefono,pRol,pContrasena,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,pPuesto);
    RETURN QUERY SELECT MAX(usuarios.idUser) FROM usuarios;
    EXCEPTION
        WHEN SQLSTATE '23505' THEN
        RAISE EXCEPTION 'El correo electronico ya esta en uso.';

END; 
$$

CREATE OR REPLACE FUNCTION insertTransaction(pFecha DATE,pHora TIME,pCantidad INTEGER,pTotal FLOAT,pIVA INTEGER,pSubTotal FLOAT,pDescuento FLOAT,pPlaca VARCHAR(10),pProducto INTEGER,pCliente INTEGER,pPago INTEGER, pMoneda INTEGER,pUsuario INTEGER)
	RETURNS TABLE(idTrans INTEGER)
	LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO transacciones(fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,idProducto,idCliente,tipoPago,moneda,idUsuario)
    VALUES(pFecha,pHora,pCantidad,pTotal,pIVA,pSubTotal,pDescuento,pPlaca,pProducto,pCliente,pPago,pMoneda,pUsuario);
    RETURN QUERY SELECT MAX(transacciones.idTrans) FROM transacciones;
END;
$$

CREATE OR REPLACE FUNCTION insertProduct(pNombre VARCHAR(30), pUnit INTEGER, pPrecio float)
	RETURNS TABLE(idProduct INTEGER)
	LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO productos(nombre,unidad,precio)
    VALUES(pNombre,pUnit,pPrecio);
    RETURN QUERY SELECT MAX(productos.idProduct) FROM productos;
END;
$$

CREATE OR REPLACE FUNCTION insertUnit(pNombre VARCHAR(20))
	RETURNS TABLE(idUnit INTEGER)
	LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO unidades(nombre)
    VALUES(pNombre);
    RETURN QUERY SELECT MAX(unidades.idUnit) FROM unidades;
END;
$$

CREATE OR REPLACE FUNCTION insertPay(pNombre VARCHAR(20))
	RETURNS TABLE(idPay INTEGER)
	LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO tipoPagos(nombre)
    VALUES(pNombre);
    RETURN QUERY SELECT MAX(tipoPagos.idPay) FROM tipoPagos;
END;
$$

CREATE OR REPLACE FUNCTION insertCurrency(pNombre VARCHAR(20))
	RETURNS TABLE(idCurrency INTEGER)
	LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO monedas(nombre)
    VALUES(pNombre);
    RETURN QUERY SELECT MAX(monedas.idCurrency) FROM monedas;
END;
$$

CREATE OR REPLACE FUNCTION insertRole(pNombre VARCHAR(30))
	RETURNS TABLE(idRol INTEGER)
	LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO roles(nombre)
    VALUES(pNombre);
    RETURN QUERY SELECT MAX(roles.idRol) FROM roles;
END;
$$
