import React from 'react';
import { Typography,Box,Grid,Dialog, Button, useMediaQuery, useTheme,Snackbar,Alert } from '@mui/material';
import styles from "./styles";
import { insertProduct } from '../../../service/product';
import fontsStyles from '../../../styles/fontStyles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {useNavigate} from 'react-router-dom';
import DialogInfo from '../../../components/DialogInfo';
import TextFieldStandard from '../../../components/TextFieldStandard';
import SelectField from '../../../components/SelectField';
import { viewUnit } from '../../../service/unit';

const AddProduct = () => {
  const classes = styles();
    const fontClasses = fontsStyles();
    const navigate=useNavigate();
    //data
    const [nombre,setNombre]=React.useState("");
    const [cantidad,setCantidad]=React.useState(0);
    const [unidad,setUnidad]=React.useState('');
    const [openDialog,seOpenDialog]=React.useState(false);
    const [open,setOpen]=React.useState(false);
    const [mensaje,setMensaje]=React.useState(false);
    const [allUnits, setAllUnits]=React.useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const changeRoute=()=>{
      const path='/products';
      navigate(path);
    }
    const add=()=>{
      if(nombre && cantidad && unidad){
        insertProduct(nombre,cantidad,unidad)
        .then(res=>{
          seOpenDialog(true);
        }).catch(error=>{
          console.log(error);
        })
      }else{
        setMensaje('Hay campos del formulario que están faltando');
        setOpen(true);
      }
      
    }

    const handleClose = () => {
      seOpenDialog(false);
    };

    const handleCantidad=(event) => {
      setCantidad(event.target.value);
    }
    const handleUnit=(event)=>{
      setUnidad(event.target.value);
    }
    const handleNombre=(event)=>{
      setNombre(event.target.value)
    }
    React.useEffect(()=>{
      if(allUnits && allUnits.length==0){
        viewUnit()
        .then(res=>{
          setAllUnits(res.data)
        }).catch(error=>{
          console.log(error);
        })
      }
    },[allUnits])
    return (
      <Box className={classes.mainWrapper}>
        {/* Titulos */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item md={8} xs={12} rowSpacing={2}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h5" component="h5">
                <b>Nueva Producto</b>
              </Typography>
            </Box>
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
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleNombre} tipo={nombre} nombre={'Nombre'} />
          </Grid>
          <Grid item md={2} xs={12}>
            <SelectField datos={allUnits} setTipo={handleUnit} tipo={unidad} nombre={'Unidad'}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleCantidad} tipo={cantidad} nombre={'Precio'} habilitacion={false} tipoContenido={'number'}/>
          </Grid>
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
              <DialogInfo info1='Producto guardado' info2='' button1='Nueva producto' button2='Ver productos' handleCloseDialog={changeRoute} />
          </Dialog>
          </Grid>
          <Grid item md={1} xs={12}>
            <Button style={{fontFamily: 'Poppins',color:'#F89C1D',borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px'}} variant='outlined' color='warning' onClick={changeRoute}>
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

export default AddProduct