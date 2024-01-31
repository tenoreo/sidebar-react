create table roles(
	idRol serial primary key,
	nombre varchar(30)
);
 
INSERT INTO roles(nombre) VALUES ('Administrador');
INSERT INTO roles(nombre) VALUES ('Trabajador');


create table unidades(
	idUnit serial primary key,
	nombre varchar(20)
);

INSERT INTO unidades(nombre) VALUES ('Metros');
INSERT INTO unidades(nombre) VALUES ('Vagonetas');

create table tipoPagos(
	idPay serial primary key,
	nombre varchar(30)
);

INSERT INTO tipoPagos(nombre) VALUES ('Efectivo');
INSERT INTO tipoPagos(nombre) VALUES ('Transferencia bancaria');
INSERT INTO tipoPagos(nombre) VALUES ('Tarjeta');


create table monedas(
	idCurrency serial primary key,
	nombre varchar(20)
);

INSERT INTO monedas(nombre) VALUES ('Colones');
INSERT INTO monedas(nombre) VALUES ('Dolares');

create table clientes(
	idClient serial primary key,
	identificador VARCHAR(20),
	nombre varchar(30),
	apellido1 varchar(30),
	apellido2 varchar(30),
	correo varchar(255) unique,
	tipoIdentificacion varchar(20),
	provincia varchar(10),
	distrito varchar(20),
	canton varchar(20),
	descripcionDetallada text,
	numeroTelefonico VARCHAR(10)
);
INSERT INTO clientes(identificador,nombre,apellido1,apellido2,correo,tipoIdentificacion,provincia,distrito,canton,descripcionDetallada,numeroTelefonico) 
    VALUES ('702370425','Jean','Vega','Diaz','jean0798@gmail.com','Fisico','San José','San Juan','Tibas','Casa esquinera','89526825');

create table usuarios(
	idUser serial primary key,
	nombre varchar(30),
	apellido1 varchar(30),
	apellido2 varchar(30),
	correo varchar(255) unique,
	telefono varchar(20),
	rol int,
	contrasena varchar(30),
	fechaRegistro timestamp,
	fechaModificacion timestamp,
	puesto varchar(10),
	constraint fk_roles
		foreign key (rol) 
			references roles(idRol)
);

INSERT INTO usuarios(nombre,apellido1,apellido2,correo,telefono,rol,contrasena,fechaRegistro,fechaModificacion,puesto) 
VALUES ('Kendall','Tenorio','Chévez','kendall82@hotmail.com','86441330',1,'pruebaContra',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'Cajero');

create table productos(
	idProduct serial primary key,
	nombre varchar(30),
	unidad int,
	precio float,
	constraint fk_productos
		foreign key(unidad) 
			references unidades(idUnit)
);

INSERT INTO productos(nombre,unidad,precio) VALUES ('Material de relleno',1,3000);
INSERT INTO productos(nombre,unidad,precio) VALUES ('Arena refinada',1,6000);
INSERT INTO productos(nombre,unidad,precio) VALUES ('Cuartilla',1,4000);

create table transacciones(
	idTrans serial primary key,
	fecha date,
	hora time,
	cantidad int,
	precioTotal float,
	IVA float,
	subtotal float,
	descuento float,
	numeroPlaca varchar(10),
	idProducto int,
	idCliente int,
	tipoPago int,
	moneda int,
	idUsuario int,
	constraint fk_idProductos
		foreign key(idProducto) 
			references productos(idProduct),
	constraint fk_idClientes
		foreign key(idCliente) 
			references clientes(idClient),
	constraint fk_tipoPago
		foreign key(tipoPago) 
			references tipoPagos(idPay),
	constraint fk_moneda
		foreign key(moneda) 
			references monedas(idCurrency),
	constraint fk_idUsuario
		foreign key(idUsuario) 
			references usuarios(idUser)
);

INSERT INTO transacciones(fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,idProducto,idCliente,tipoPago,moneda,idUsuario)
    VALUES(CURRENT_DATE,CURRENT_TIME,12,40680,13,36000,0,'abc-123',1,1,1,1,1);

INSERT INTO transacciones(fecha,hora,cantidad,precioTotal,IVA,subtotal,descuento,numeroPlaca,idProducto,idCliente,tipoPago,moneda,idUsuario)
    VALUES('',CURRENT_TIME,12,40680,13,36000,0,'abc-234',1,1,1,1,1);