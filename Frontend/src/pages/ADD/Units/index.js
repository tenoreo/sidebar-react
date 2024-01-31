import React from 'react';
import { Typography,Box,Grid,Button,FormControl,OutlinedInput,InputLabel,Alert,Snackbar,Dialog,DialogContent,useMediaQuery,useTheme} from '@mui/material';
import styles from "./styles";
import fontsStyles from '../../../styles/fontStyles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {useNavigate} from 'react-router-dom';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import { insertUnit } from '../../../service/unit';
const AddUnits = () => {
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

    // const handleClickOpenDialog = () => {
    //     setOpenDialog(true);
    // };

    const handleCloseDialog = () => {
        setNombre('');
        setOpenDialog(false);
    };
    const changeRoute=()=>{
      const path='/units';
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
            insertUnit(nombre)
            .then(res=>{
                setOpenDialog(true);
            }).catch(error=>{
                console.log(error);
                setMensaje('Hubo un error en el sistema');
                handleClick();
            })
        }else{
            setMensaje('Hay campos que se encuentran vacios.');
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
                <b>Nuevo unidad de medición</b>
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
                <b>Datos de la unidad</b>
              </Typography>
            </Box>
          </Grid>
        </Grid> 
        {/* text field */}
        <Grid container spacing={2} sx={{marginBottom:'10px'}}>
          {/* Tabs */} 
          <Grid item md={4} xs={12} >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
                <InputLabel htmlFor="outlined-adornment-nombre">Nombre</InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-nombre"
                    label="Nombre"
                    value={nombre}
                    onChange={handleNombre}
                />
            </FormControl>
          </Grid>
        </Grid> 


        <Grid container spacing={3}  direction="row">
          {/* Tabs */} 
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
            <Box sx={{}}>
                <DialogContent>
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center', flexDirection: 'column', marginTop: '50px', marginBottom: '50px'}}>
                        <CheckCircleOutlineRoundedIcon style={{fontSize:'150px',color:'#66BB6A', marginBottom: '20px'}}/>
                         <Typography variant="h5" component="h5" style={{marginBottom: '40px'}}>
                            <b>Unidad de medida guardado</b>
                        </Typography> 
                        <Button style={{fontFamily: 'Poppins',borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px', width: '250px', marginBottom: '10px',}} variant='outlined' color='warning' onClick={changeRoute}>
                            <AddRoundedIcon style={{fontSize: "20px"}}/>
                            <span className={fontClasses.dashBoardItemFont}><b>Ver unidades</b></span>
                        </Button> 
                        <Button style={{fontFamily: 'Poppins', background:"#F89C1D",borderRadius:'10px',textIndent:'0.5em',textTransform:'none',padding:'10px',  width: '250px'}} variant='contained' onClick={handleCloseDialog}>
                            <GroupRoundedIcon style={{fontSize: "20px"}}/>
                            <b><span className={fontClasses.dashBoardItemFont}>Nuevo unidad</span></b>
                        </Button>
                        
                    </Box>
                </DialogContent>
            </Box>
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

export default AddUnits