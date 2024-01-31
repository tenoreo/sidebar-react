import React from 'react';
import { Typography,Box,Grid,Dialog, Button,FormControl,Radio,RadioGroup,FormControlLabel, FormLabel, useMediaQuery, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styles from "./styles";
import { insertTransaction, viewTransaction } from '../../../service/transaction';
import { viewProduct } from '../../../service/product';
import { viewClientPerID } from '../../../service/client';
import fontsStyles from '../../../styles/fontStyles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {useNavigate,useParams} from 'react-router-dom';
import DialogInfo from '../../../components/DialogInfo';
import TextFieldStandard from '../../../components/TextFieldStandard';
import SelectField from '../../../components/SelectField';

const AddTransaction = () => {
    const classes = styles();
    const [rows,setRows]=React.useState([]);
    const fontClasses = fontsStyles();
    const navigate=useNavigate();
    //data
    const [dia,setDia]=React.useState(dayjs());
    const [hora,setHora]=React.useState(dayjs());
    const [cliente,setCliente]=React.useState();
    const [idCliente,setIdCliente]=React.useState();
    const [nombre,setNombre]=React.useState("");
    const [cantidad,setCantidad]=React.useState(0);
    const [precioUnidad,setPrecioUnidad]=React.useState(0);
    const [precioTotal,setPrecioTotal]=React.useState(0);
    const [iva,setIva]=React.useState(0);
    const [subtotal,setSubtotal]=React.useState(0);
    const [descuento,setDescuento]=React.useState(0);
    const [numeroPlaca,setNumeroPlaca]=React.useState('');
    const [producto,setProducto]=React.useState(1);
    const [unidad,setUnidad]=React.useState("");
    const [tipoPago,setTipoPago]=React.useState(1);
    const [openDialog,seOpenDialog]=React.useState(false);
    const [allProducts, setAllProducts]=React.useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams();
    const changeRoute=()=>{
      const path='/transaction';
      navigate(path);
    }
    const add=()=>{
      // if(dia && hora && cantidad && precioTotal && iva && subtotal && descuento && numeroPlaca && producto && cliente && tipoPago){
      //   console.log('entro')
      // }else{
      //   console.log('mamo')
      // }
      const usuario=localStorage.getItem('id');
      insertTransaction(dia.format('YYYY-MM-DD'),hora.format('HH:mm:ss'),cantidad,precioTotal,iva,subtotal,descuento,numeroPlaca,producto,idCliente,tipoPago,usuario)
      .then(res=>{
        seOpenDialog(true);
      }).catch(error=>{
        console.log(error);
      })
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      seOpenDialog(false);
    };
    const handlePlaca=(event) => {
      setNumeroPlaca(event.target.value);
    }
    const handleIdentificacion=(event) => {
      setCliente(event.target.value);
    }
    const changePerID=(e) => {
      if (e.key === 'Enter') {
        autocompletarNombre();
      }
    } 
    const handleDescuento=(event) => {
      setDescuento(event.target.value);
    }

    React.useEffect(()=>{
      console.log('identificador',id)
      if(rows && rows.length===0){
        viewTransaction()
        .then((res)=>{
          setRows(res.data)
        })
        .catch((error)=>{
          console.log(error);
        });
      }
    },[rows]);

    React.useEffect(()=>{
      if(rows && rows.length===0){
        viewProduct()
        .then((res)=>{
          setAllProducts(res.data)
        })
        .catch((error)=>{
          console.log(error);
        });
      }
    },[]);

    const handleChangeProduct = (event) => {
      setProducto(event.target.value);
    };

    const handleChangeTipoPago = (event) => {
      setTipoPago(event.target.value);
    };
    const handleCantidad=(event) => {
      setCantidad(event.target.value);
    }
    const handleIVA=(event) => {
      setIva(event.target.value);
    }

    React.useEffect(()=>{
      const result = allProducts.filter((item) => item.idproduct === producto);
      if(result.length>0) {
       setUnidad(result[0].unidad)
       setPrecioUnidad(result[0].precio)
      }
    },[producto]);

    const autocompletarNombre = () => {
      viewClientPerID(cliente)
        .then((res)=>{
          if(res.data.length > 0){
            setNombre(res.data[0].nombre)
            setIdCliente(res.data[0].id)
          }
          else{
            setNombre("")
          }
        })
        .catch((error)=>{
          console.log(error);
        });
    }

    React.useEffect(()=>{
      let  subTotal = (precioUnidad*cantidad) 
      const discount = subTotal * (descuento/100)
      subTotal = subTotal - discount
      const calculateIva = subTotal * (iva/100)
      setSubtotal(subTotal)
      setPrecioTotal(subTotal+calculateIva)
    },[cantidad,descuento,iva]);

    return (
      <Box className={classes.mainWrapper}>
        {/* Titulos */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item md={8} xs={12} rowSpacing={2}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h5" component="h5">
                <b>Nueva Venta</b>
              </Typography>
            </Box>
          </Grid>
        </Grid>  
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Dia */} 
          <Grid item md={2} xs={12} >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Dia"
                  disableFuture
                  value={dia}
                  onChange={(newValue) => setDia(newValue)}
                />
            </LocalizationProvider>
          </Grid>
          {/* Tiempo */} 
          <Grid item md={2} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <TimePicker 
                  label="Hora"
                  value={hora}
                  onChange={(newValue) => setHora(newValue)}
                />
            </LocalizationProvider>
          </Grid>
        </Grid>
        {/*Datos del cliente  */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={8} xs={12}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h3" component="h3" color={'#F89C1D'}>
                <b>Datos del cliente</b>
              </Typography>
            </Box>
          </Grid>
        </Grid> 
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={2} xs={12} >
            <TextFieldStandard setTipo={handleIdentificacion} tipo={cliente} nombre={'Identificación'} habilitacion={false} autoComplete={changePerID}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard tipo={nombre} nombre={'Nombre'} habilitacion={true}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handlePlaca} tipo={numeroPlaca} nombre={'# Placa'} habilitacion={false}/>
          </Grid>
        </Grid> 
        {/*Datos del producto  */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={8} xs={12}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h3" component="h3" color={'#F89C1D'}>
                <b>Datos del producto</b>
              </Typography>
            </Box>
          </Grid>
        </Grid> 
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={2} xs={12} >
            <SelectField datos={allProducts} setTipo={handleChangeProduct} tipo={producto} nombre={'Tipo de producto'}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard tipo={unidad} nombre={'Unidad'} habilitacion={true}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleCantidad} tipo={cantidad} nombre={'Cantidad'} habilitacion={false} tipoContenido={'number'}/>
          </Grid>
        </Grid>  
        {/*Datos de la venta  */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item md={8} xs={12}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h3" component="h3" color={'#F89C1D'}>
                <b>Datos de la venta</b>
              </Typography>
            </Box>
          </Grid>
        </Grid> 
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item md={2} xs={12}>
            <TextFieldStandard tipo={precioUnidad} nombre={'Precio'} habilitacion={true}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleDescuento} tipo={descuento} nombre={'Descuento'} habilitacion={false}/>
          </Grid>
          <Grid item md={2} xs={12} >
            <TextFieldStandard setTipo={handleIVA} tipo={iva} nombre={'IVA'} habilitacion={false} tipoContenido={'number'}/>
          </Grid>
        </Grid>  
        <Grid container spacing={2} sx={{marginBottom:'20px'}}>
          {/* Tabs */} 
          <Grid item md={2} xs={12}>
            <TextFieldStandard tipo={subtotal} nombre={'Subtotal'} habilitacion={true}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard tipo={precioTotal} nombre={'Total'} habilitacion={true}/>
          </Grid>
        </Grid>   
        <Grid container spacing={2} >
          {/* Tabs */} 
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{paddingLeft:'10px'}}><b>Método de pago</b></FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{paddingLeft:'20px'}}
                    value={tipoPago}
                    onChange={handleChangeTipoPago}
                >
                    <FormControlLabel value={1} control={<Radio sx={{'&.Mui-checked': {color: '#F89C1D'}}}/>} label="Efectivo" />
                    <FormControlLabel value={3} control={<Radio sx={{'&.Mui-checked': {color: '#F89C1D'}}}/>} label="Tarjeta" />
                    <FormControlLabel value={2} control={<Radio sx={{'&.Mui-checked': {color: '#F89C1D'}}}/>} label="Transferencia bancaria" />
                </RadioGroup>
            </FormControl>
        </Grid>
        <Grid container spacing={3}  direction="row">
          {/* Tabs */} 
          <Grid item md={1} xs={12} >
            <Button style={{fontFamily: 'Poppins', background:"#F89C1D",borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px'}} variant='contained' onClick={add}>
              <AddRoundedIcon style={{fontSize: "20px"}}/>
                <b><span className={fontClasses.dashBoardItemFont}>Procesar</span></b>
            </Button>
            <Dialog
                fullScreen={fullScreen}
                fullWidth
                maxWidth={'sm'}
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{zIndex: 5000}}
            >
              <DialogInfo info1='Transacción procesada' info2='Imprimiendo comprobante...' button1='Enviar correo' button2='Nueva transacción' changeRoute={changeRoute} />
          </Dialog>
          </Grid>
          <Grid item md={1} xs={12}>
            <Button style={{fontFamily: 'Poppins',color:'#F89C1D',borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px'}} variant='outlined' color='warning' onClick={changeRoute}>
                <b></b><ClearRoundedIcon style={{fontSize: "20px"}}/>
                <span className={fontClasses.dashBoardItemFont}><b>Cancelar</b></span>
            </Button>
          </Grid>
        </Grid> 
      </Box>
    )
}

export default AddTransaction