import React from 'react';
import { Typography,Box,Grid,Button,Alert,Snackbar,Dialog,useMediaQuery,useTheme} from '@mui/material';
import styles from "./styles";
import fontsStyles from '../../../styles/fontStyles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {useNavigate} from 'react-router-dom';
import { insertMethodPay } from '../../../service/methodPay';
import TextFieldStandard from '../../../components/TextFieldStandard';
import DialogInfo from '../../../components/DialogInfo'
const AddPaymentMethods = () => {
    const classes = styles();
    const fontClasses = fontsStyles();
    const navigate=useNavigate();
    //data
    const [nombre,setNombre]=React.useState('');
    const [mensaje,setMensaje]=React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleCloseDialog = () => {
        setNombre('');
        setOpenDialog(false);
    };
    const changeRoute=()=>{
      const path='/paymentMethods';
      navigate(path);
    }
    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
    const handleNombre=(event)=>{
        setNombre(event.target.value)
    }
    
    const agregarCliente=()=>{
        if(nombre){
            insertMethodPay(nombre)
            .then(res=>{
                setOpenDialog(true);
            }).catch(error=>{
                console.log(error);
                setMensaje('Hubo un error en el sistema');
                handleClick();
            })
        }else{
            setMensaje('Hay campos obligatorios que se encuentran vacios.');
            handleClick();
        }
    }
    return (
      <Box className={classes.mainWrapper}>
        {/* Titulos */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item md={8} xs={12} rowSpacing={2}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h5" component="h5">
                <b>Nuevo método de pago</b>
              </Typography>
            </Box>
          </Grid>
        </Grid> 
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item md={8} xs={12}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h3" component="h3" color={'#F89C1D'}>
                <b>Datos del método</b>
              </Typography>
            </Box>
          </Grid>
        </Grid> 
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item md={4} xs={12} >
            <TextFieldStandard setTipo={handleNombre} tipo={nombre} nombre={'Nombre'}/>
          </Grid>
        </Grid> 
        <Grid container spacing={3}  direction="row">
          <Grid item md={1} xs={12} >
            <Button style={{fontFamily: 'Poppins', background:"#F89C1D",borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px'}} variant='contained' onClick={agregarCliente}>
              <AddRoundedIcon style={{fontSize: "20px"}}/>
                <b><span className={fontClasses.dashBoardItemFont}>Agregar</span></b>
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
              <DialogInfo info1={'Método de pago guardado'} info2={''} button1={'Ver métodos de pago'} button2={'Nuevo método de pago'} changeRoute={changeRoute} handleCloseDialog={handleCloseDialog}/>
            </Dialog>
          </Grid>
          <Grid item md={1} xs={12}>
            <Button style={{fontFamily: 'Poppins',borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px'}} variant='outlined' color='warning' onClick={changeRoute}>
                <b></b><ClearRoundedIcon style={{fontSize: "20px"}}/>
                <span className={fontClasses.dashBoardItemFont}><b>Cancelar</b></span>
            </Button>
          </Grid>
        </Grid> 
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: '100%',justifyContent:'end' }}
            >
              {mensaje}
            </Alert>
        </Snackbar>
      </Box>
    )
}

export default AddPaymentMethods