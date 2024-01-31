import { Box,Grid,Typography,Button,InputLabel,FormControl,OutlinedInput,InputAdornment } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React from 'react';
import styles from "./styles";
import fontsStyles from '../../styles/fontStyles';
import TableInformation from '../../components/TableInfomation';
import { viewClient } from '../../service/client';
import {useNavigate} from 'react-router-dom';
const buttonContained=[
  {
    label:'Nueva Cliente',
    icon:<AddOutlinedIcon style={{fontSize: "20px"}}/>
  }
];

const columns = [
  { id: 'idclient', label: 'ID', minWidth: 50 },
  { id: 'tipoidentificacion', label: 'Tipo', minWidth: 70 },
  {
    id: 'identificador',
    label: 'Identificación',
    minWidth: 70,
    align: 'left'
  },
  {
    id: 'nombre',
    label: 'Nombre',
    minWidth: 70,
    align: 'left'
  },
  {
    id: 'apellido1',
    label: 'Primer Apellido ',
    minWidth: 70,
    align: 'left'
  },
  {
    id: 'apellido2',
    label: 'Segundo Apellido',
    minWidth: 70,
    align: 'left'
  },
  {
    id: 'correo',
    label: 'Correo',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'numerotelefonico',
    label: 'Teléfono',
    minWidth: 80,
    align: 'left'
  },
  {
    id: 'direccion',
    label: 'Dirección',
    minWidth: 150,
    align: 'left'
  },
];

const Clients = () => {
  const classes = styles();
  const fontClasses = fontsStyles();
  const [rows,setRows]=React.useState([]);
  const [identificacion,setIdentificacion]=React.useState('');
  const navigate=useNavigate();
  const changeRoute=()=>{
    const path='/addClient';
    navigate(path);
  }
  React.useEffect(()=>{
    if(rows && rows.length===0){
      viewClient()
      .then((res)=>{
        setRows(res.data)
      })
      .catch((error)=>{
        console.log(error);
      });
    }
  },[rows])
  const search=(datos)=>{
      return datos.filter((item)=>{
        return(item.identificador.includes(identificacion))
      })    
  }
  return (
    <Box className={classes.mainWrapper}>
      <Grid container spacing={2}>
        <Grid item xl={8} md={8} xs={12}>
          <Box className={classes.wrapperBox}>
            <Typography variant="h5" component="h5">
              <b>Clientes</b>
            </Typography>
          </Box>
        </Grid>
        <Grid item xl={4} md={4} xs={12}>
          <Box className={classes.wrapperBox}>
            {
              buttonContained.map((item,index)=>{
                return (<Button style={{fontFamily: 'Poppins', background:"#F89C1D",borderRadius:'10px',marginRight :'10px',textIndent:'0.5em',textTransform:'none'}} key={index} variant='contained' onClick={changeRoute}>
                          {item.icon}
                          <span className={fontClasses.dashBoardItemFont}>{item.label}</span>
                        </Button>)
              })
            }
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xl={4} md={4} xs={12}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
            <InputLabel htmlFor="outlined-adornment-identificacion">Identificación</InputLabel>
              <OutlinedInput
                value={identificacion}
                onChange={(e)=>{setIdentificacion(e.target.value)}}
                id="outlined-adornment-identificacion"
                endAdornment={
                  <InputAdornment position="end">
                      <SearchRoundedIcon style={{fontSize: "20px"}}/>
                  </InputAdornment>
                }
                label="Identificacion"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box >
        <TableInformation columnas={columns} filas={search(rows)}/>  
      </Box>    
    </Box>
  );
}

export default Clients