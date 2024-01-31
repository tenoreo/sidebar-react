import React from 'react';
import { Typography,Box,Grid,Button,Alert,Snackbar,Dialog,useMediaQuery,useTheme} from '@mui/material';
import styles from "./styles";
import fontsStyles from '../../../styles/fontStyles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {useNavigate} from 'react-router-dom';
import DialogInfo from '../../../components/DialogInfo';
import TextFieldStandard from '../../../components/TextFieldStandard';
import SelectField from '../../../components/SelectField';
import { insertUser } from '../../../service/user';
import { viewRoles } from '../../../service/roles';

const AddUsers = () => {
    const classes = styles();
    const fontClasses = fontsStyles();
    const navigate=useNavigate();
    //data
    const [tipo,setTipo]=React.useState(1);
    const [nombre,setNombre]=React.useState('');
    const [apellido1,setApellido1]=React.useState('');
    const [apellido2,setApellido2]=React.useState('');
    const [correo,setCorreo]=React.useState('');
    const [telefono,setTelefono]=React.useState('');
    const [mensaje,setMensaje]=React.useState('');
    const [contra,setContra]=React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [role,setRoles]=React.useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const changeRoute=()=>{
      const path='/users';
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
    const handleTipo=(event)=>{
        setTipo(event.target.value)
    }
    const handleNombre=(event)=>{
        setNombre(event.target.value)
    }
    const handleApellido1=(event)=>{
        setApellido1(event.target.value)
    }
    const handleApellido2=(event)=>{
        setApellido2(event.target.value)
    }
    const handleCorreo=(event)=>{
        setCorreo(event.target.value)
    }
    const handleTelefono=(event)=>{
        setTelefono(event.target.value)
    }
    const handleContra=(event)=>{
      setContra(event.target.value)
    }
    const limpiarCampos=()=>{
      setTipo(1);
      setNombre('');
      setApellido1('');
      setApellido2('');
      setCorreo('');
      setTelefono('');
      setMensaje('');
      setContra('');
    }
    const agregarUsuario=()=>{
        if( nombre && apellido1 && apellido2 && correo && tipo && telefono && contra){
          insertUser(nombre,apellido1,apellido2,correo,telefono,tipo,contra)
            .then(()=>{
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
    React.useEffect(()=>{
      if(role && role.length==0){
        viewRoles()
        .then(res=>{
          setRoles(res.data);
        })
        .catch(error=>{
          console.log(error);
        })
      }      
    });
    return (
      <Box className={classes.mainWrapper}>
        {/* Titulos */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          <Grid item md={8} xs={12} rowSpacing={2}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h5" component="h5">
                <b>Nuevo Usuario</b>
              </Typography>
            </Box>
          </Grid>
        </Grid> 
        {/* titulo */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={8} xs={12}>
            <Box className={classes.wrapperBox}>
              <Typography variant="h3" component="h3" color={'#F89C1D'}>
                <b>Datos del usuario</b>
              </Typography>
            </Box>
          </Grid>
        </Grid> 
        {/* text field */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={2} xs={12} >
            <SelectField datos={role} setTipo={handleTipo} tipo={tipo} nombre={'Tipo de usuario'}/>
          </Grid>
        </Grid> 

        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleNombre} tipo={nombre} nombre={'Nombre'}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleApellido1} tipo={apellido1} nombre={'Primer Apellido'}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleApellido2} tipo={apellido2} nombre={'Segundo Apellido'}/>
          </Grid>
        </Grid> 

        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={2} xs={12} >
            <TextFieldStandard setTipo={handleCorreo} tipo={correo} nombre={'Correo'}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleTelefono} tipo={telefono} nombre={'Teléfono'}/>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextFieldStandard setTipo={handleContra} tipo={contra} nombre={'Contraseña'} tipoContenido={'password'}/>
          </Grid>
        </Grid>  
        <Grid container spacing={3}  direction="row">
          {/* Tabs */} 
          <Grid item md={1} xs={12} >
            <Button style={{fontFamily: 'Poppins', background:"#F89C1D",borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px'}} variant='contained' onClick={agregarUsuario}>
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
              <DialogInfo info1={'Usuario guardado'} info2={''} button1={'Nuevo Usuarios'} button2={'Ver usuario'} changeRoute={limpiarCampos} handleCloseDialog={changeRoute}/>
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

export default AddUsers