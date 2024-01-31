-- Roles
CREATE OR REPLACE FUNCTION roleInformation()
    RETURNS TABLE(idRol INTEGER,
                nombre VARCHAR(30)
                )
    LANGUAGE plpgsql 
	AS $$
BEGIN
    RETURN QUERY SELECT r.idRol AS idRol,r.nombre AS nombre from roles r;
END;
$$
-- units
CREATE OR REPLACE FUNCTION unitInformation()
    RETURNS TABLE(idUnit INTEGER,
                nombre VARCHAR(20)
                )
    LANGUAGE plpgsql
	AS $$
BEGIN
    RETURN QUERY SELECT u.idUnit AS idUnit,u.nombre AS nombre from unidades u;
END;
$$

-- tipo de pagos
CREATE OR REPLACE FUNCTION paysInformation()
    RETURNS TABLE(idPay INTEGER,
                nombre VARCHAR(30)
                )
    LANGUAGE plpgsql
	AS $$
BEGIN
    RETURN QUERY SELECT p.idPay AS idPay,p.nombre AS nombre from tipoPagos p;
END;
$$

-- moneda
CREATE OR REPLACE FUNCTION currencyInformation()
    RETURNS TABLE(idCurrency INTEGER,
                nombre VARCHAR(20)
                )
    LANGUAGE plpgsql
	AS $$
BEGIN
    RETURN QUERY SELECT m.idCurrency AS idCurrency,m.nombre AS nombre from monedas m;
END;
$$

--clientes
CREATE OR REPLACE FUNCTION clientInformation()
	RETURNS TABLE(idClient INTEGER,
				identificador VARCHAR(20),
				nombre VARCHAR(30),
				apellido1 VARCHAR(30),
				apellido2 VARCHAR(30),
				correo varchar(255),
                tipoIdentificacion varchar(20),
                direccion text,
                descripcionDetallada text,
                numeroTelefonico VARCHAR(10)
                )
	LANGUAGE plpgsql
	AS $$
BEGIN
    RETURN QUERY SELECT c.idClient as idClient,
            c.identificador as identificador,
            c.nombre as nombre,
            c.apellido1 as apellido1,
            c.apellido2 as apellido2,
            c.correo as correo,
            c.tipoIdentificacion as tipoIdentificacion,
            CONCAT(C.provincia,', ',c.canton,', ',c.distrito) as direccion,
            c.descripcionDetallada as descripcionDetallada, 
            c.numeroTelefonico as numeroTelefonico
        FROM clientes c;
END;
$$
-- usuarios
CREATE OR REPLACE FUNCTION userInformation()
	RETURNS TABLE(idUser INTEGER,
				nombre VARCHAR(30),
				apellido1 VARCHAR(30),
				apellido2 VARCHAR(30),
				correo varchar(255),
                telefono VARCHAR(20),
                rolNombre VARCHAR(30),
                fechaRegistro TIMESTAMP
                )
	LANGUAGE plpgsql
	AS $$
BEGIN
    RETURN QUERY SELECT u.idUser as idUser,
            u.nombre as nombre,
            u.apellido1 as apellido1,
            u.apellido2 as apellido2,
            u.correo as correo,
            u.telefono as telefono,
            r.nombre as rolNombre,
            u.fechaRegistro as fechaRegistro
        FROM usuarios u
        INNER JOIN roles r ON r.idRol = u.rol;
END;
$$

-- productos
CREATE OR REPLACE FUNCTION productInformation()
	RETURNS TABLE(idProduct INTEGER,
				nombre VARCHAR(30),
				unidad VARCHAR(20),
				precio FLOAT
                )
	LANGUAGE plpgsql
	AS $$
BEGIN
    RETURN QUERY SELECT p.idProduct as idProduct,
            p.nombre as nombre,
            u.nombre as unidad,
            p.precio as precio
        FROM productos p
        INNER JOIN unidades u ON u.idUnit = p.unidad;
END;
$$

-- transacciones
CREATE OR REPLACE FUNCTION transactionInformation()
	RETURNS TABLE(idTrans INTEGER,
				fecha DATE,
				hora TIME,
				cantidad INTEGER,
                precioTotal FLOAT,
                IVA FLOAT,
                subtotal FLOAT,
                descuento FLOAT,
                numeroPlaca varchar(10),
                nombreProducto VARCHAR(30),
                nombreCliente TEXT,
                nombreUsuario TEXT,
                nombrePago VARCHAR(30),
                nombreMoneda VARCHAR(20)
                )
	LANGUAGE plpgsql
	AS $$
BEGIN
    RETURN QUERY SELECT t.idTrans as idTrans,
            t.fecha as fecha,
            t.hora as hora,
            t.cantidad as cantidad,
            t.precioTotal as precioTotal,
            t.IVA as IVA,
            t.subtotal as subtotal,
            t.descuento as descuento,
            t.numeroPlaca as numeroPlaca,
            p.nombre as nombreProducto,
            CONCAT(c.nombre,' ',c.apellido1,' ',c.apellido2 ) as nombreCliente,
            CONCAT(u.nombre,' ',u.apellido1,' ',u.apellido2 ) as nombreUsuario,
            tp.nombre as nombrePago,
            m.nombre as nombreMoneda
        FROM transacciones t
        INNER JOIN productos p ON p.idProduct = t.idProducto
        INNER JOIN clientes c ON c.idClient= t.idCliente
        INNER JOIN tipoPagos tp ON tp.idPay=t.tipoPago
        INNER JOIN monedas m ON m.idCurrency=t.moneda
        INNER JOIN usuarios u ON u.idUser=t.idUsuario;
END;
$$

-- transacciones por id
CREATE OR REPLACE FUNCTION transactionInformationPerID(pID INTEGER)
	RETURNS TABLE(idTrans INTEGER,
				fecha DATE,
				hora TIME,
				cantidad INTEGER,
                nombreProducto VARCHAR(30),
                precioUnitario FLOAT,
                nombreUnidad VARCHAR(30),
                precioTotal FLOAT,
                IVA FLOAT,
                subtotal FLOAT,
                descuento FLOAT,                
                nombreCliente TEXT,
                nombreUsuario TEXT
                )
	LANGUAGE plpgsql
	AS $$
BEGIN
    RETURN QUERY SELECT t.idTrans AS idTrans,
	t.fecha AS fecha,
	t.hora AS hora,
	t.cantidad AS cantidad,
	p.nombre AS nombreProducto,
	p.precio AS precioUnitario,
	u.nombre AS nombreUnidad,
	t.precioTotal AS total,
	(t.subtotal*(t.IVA/100)) AS iva,
	t.subtotal AS subtotal,
	(t.subtotal*(t.descuento/100)) AS descuento,
	CONCAT(c.nombre,' ',c.apellido1,' ',c.apellido2) AS cliente,
	CONCAT(usu.nombre,' ',usu.apellido1,' ',usu.apellido2) AS usuario
	FROM transacciones t
	INNER JOIN productos p ON p.idProduct = t.idProducto
	INNER JOIN unidades u ON u.idUnit= p.unidad
	INNER JOIN clientes c ON c.idClient= t.idCliente
	INNER JOIN usuarios usu ON usu.idUser=t.idUsuario
	WHERE t.idTrans=pID;
END;
$$