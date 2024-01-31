const fs = require("fs");
const pdf=require('html-pdf')

module.exports.createPDF=(datos)=>{
    const plantilla=require.resolve('../Templates/plantilla.html');
    let contenidoHtml=fs.readFileSync(plantilla,'utf8');
    let tabla='';
    for(const dato of datos){
        console.log('dato',dato);
        tabla+=`<tr>
        <td>${dato.nombreProducto}</td>
        <td>${dato.cantidad}</td>
        <td>${dato.preciounitario} / ${dato.nombreunidad} </td>
        <td>${dato.subtotal}</td>
        </tr>`;
    }
    const originalDate = new Date(datos[0].fecha);
    const timeString =datos[0].hora;
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(':');

    // Format the time string
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = originalDate.getDate().toString().padStart(2, '0');
    contenidoHtml = contenidoHtml.replace("{{tablaProductos}}", tabla);
    contenidoHtml = contenidoHtml.replace("{{fecha}}", `${day}-${month}-${year}` + ' ' +formattedTime);
    contenidoHtml = contenidoHtml.replace("{{idtrans}}", datos[0].idtrans);

    contenidoHtml = contenidoHtml.replace("{{subtotal}}", datos[0].subtotal);
    contenidoHtml = contenidoHtml.replace("{{descuento}}", datos[0].descuento);
    contenidoHtml = contenidoHtml.replace("{{subtotalConDescuento}}", datos[0].subtotal-datos[0].descuento);
    contenidoHtml = contenidoHtml.replace("{{impuestos}}", datos[0].iva);
    contenidoHtml = contenidoHtml.replace("{{total}}", datos[0].preciototal);
    contenidoHtml = contenidoHtml.replace("{{cliente}}", datos[0].nombrecliente);
    contenidoHtml = contenidoHtml.replace("{{usuario}}", datos[0].nombreusuario);

    pdf.create(contenidoHtml)
        .toFile(`src/Temporary/Factura-${datos[0].idtrans}.pdf`,(error)=>{
            if(error){
                console.log("Error creando PDF: " + error)
            } else {
                console.log("PDF creado correctamente");
                return `src/Temporary/Factura-${datos[0].idtrans}.pdf`
            }
    })
}