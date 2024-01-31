CREATE OR REPLACE FUNCTION transactionInformationPerMonth()
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
        INNER JOIN usuarios u ON u.idUser=t.idUsuario
        WHERE EXTRACT(MONTH FROM t.fecha) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM t.fecha) = EXTRACT(YEAR FROM CURRENT_DATE);
END;
$$

CREATE OR REPLACE FUNCTION transactionInformationPerDay()
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
        INNER JOIN usuarios u ON u.idUser=t.idUsuario
        WHERE t.fecha::date = CURRENT_DATE;
END;
$$

CREATE OR REPLACE FUNCTION transactionInformationPerYear()
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
        INNER JOIN usuarios u ON u.idUser=t.idUsuario
        WHERE EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM CURRENT_DATE);
END;
$$