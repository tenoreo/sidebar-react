const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const morgan=require('morgan');
const cors=require('cors');

//app.use(cors());
app.set('port', 3068);
app.set('json spaces',2);

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true, 
  })
)

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use('/cliente',require('./src/routes/cliente'));
app.use('/moneda',require('./src/routes/moneda'));
app.use('/producto',require('./src/routes/producto'));
app.use('/roles',require('./src/routes/roles'));
app.use('/tipoPago',require('./src/routes/tipoPago'));
app.use('/transaccion',require('./src/routes/transaccion'));
app.use('/unidad',require('./src/routes/unidad'));
app.use('/usuario',require('./src/routes/usuario'));
app.use('/estadistica',require('./src/routes/estadistica'));

app.listen(app.get('port'),()=>{
    console.log(`Escuchando en el puerto ${app.get('port')}`)
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })