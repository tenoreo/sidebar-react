import React from 'react';
import { Typography,Box,Grid,Button,FormControl,OutlinedInput,InputAdornment,InputLabel,BottomNavigation,BottomNavigationAction } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import styles from "./styles";
import fontsStyles from '../../styles/fontStyles';
import {useNavigate} from 'react-router-dom';
import TableInformation from '../../components/TableInfomation';
import { viewTransaction, viewTransactionDay, viewTransactionMonth, viewTransactionYear } from '../../service/transaction';
import dayjs from 'dayjs';

const buttonContained=[
  {
    label:'Nueva Transacción',
    icon:<AddOutlinedIcon style={{fontSize: "20px"}}/>,
  } 
];
const columns = [
  { id: 'idtrans', label: 'ID', minWidth: 50 },
  { id: 'fecha', label: 'Fecha y hora', minWidth: 140 },
  {
    id: 'nombrecliente',
    label: 'Cliente',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'numeroplaca',
    label: '#Placa',
    minWidth: 80,
    align: 'left'
  },
  {
    id: 'nombreproducto',
    label: 'Producto',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'cantidad',
    label: 'Cantidad',
    minWidth: 80,
    align: 'left'
  },
  {
    id: 'subtotal',
    label: 'Subotal',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'iva',
    label: 'IVA',
    minWidth: 40,
    align: 'left'
  },
  {
    id: 'preciototal',
    label: 'Total',
    minWidth: 150,
    align: 'left'
  },
];

const Transaction = () => {
  const classes = styles();
  const fontClasses = fontsStyles();
  const navigate=useNavigate();
  const [rows,setRows]=React.useState([]);
  const [value, setValue] = React.useState('General');
  const [id,setID]=React.useState('');
  const [fecha,setFecha]=React.useState(dayjs());
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const changeRoute=()=>{
    const path='/addTransaction';
    navigate(path);
  }
  
  React.useEffect(()=>{
    if(rows && rows.length===0){
      obtenerTransacciones();
    }
  },[rows]);

  const obtenerTransacciones=()=>{
    viewTransaction()
      .then((res)=>{
        setRows(res.data)
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  const obtenerDia=()=>{
    viewTransactionDay()
    .then(res=>{
      setRows(res.data)
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const obtenerMes=()=>{
    viewTransactionMonth()
    .then(res=>{
      setRows(res.data);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const obtenerAno=()=>{
    viewTransactionYear()
    .then(res=>{
      setRows(res.data);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const search=(datos)=>{
    return datos.filter((item)=>{
      const dato=item.idtrans.toString();
      // const fechad=item.fecha;
      return dato.includes(id); 
    });
    
  }
  return (
    <Box className={classes.mainWrapper}>
      {/* Titulos */}
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Box className={classes.wrapperBox}>
            <Typography variant="h5" component="h5">
              <b>Historial de Ventas</b>
            </Typography>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box className={classes.wrapperBox}>
            {
              buttonContained.map((item,index)=>{
                return (<Button style={{fontFamily: 'Poppins', background:"#F89C1D",borderRadius:'10px',marginRight :'10px',textIndent:'0.5em',textTransform:'none'}} key={index} variant='contained'onClick={changeRoute}>
                          {item.icon}
                          <span className={fontClasses.dashBoardItemFont}>{item.label}</span>
                        </Button>)
              })
            }
          </Box>
        </Grid>
      </Grid>  
      <Grid container spacing={2}>
        {/* Tabs */} 
        <Grid item md={5.7} xs={12}>
          <Box className={classes.searchBox}>
            <BottomNavigation showLabels value={value} onChange={handleChange}>
              <BottomNavigationAction
                label="General"
                value="General"
                onClick={obtenerTransacciones}
              />
              <BottomNavigationAction
                label="Diaria"
                value="Diaria"
                onClick={obtenerDia}
              />
              <BottomNavigationAction
                label="Mensual"
                value="Mensual"
                onClick={obtenerMes}
              />
              <BottomNavigationAction 
              label="Anual" 
              value="Anual" 
              onClick={obtenerAno}
              />
            </BottomNavigation>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box className={classes.optionsWraper}>
            {/* ID */}
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
              <InputLabel htmlFor="outlined-adornment-id">ID</InputLabel>
                <OutlinedInput
                  value={id}
                  onChange={(e)=>setID(e.target.value)}
                  type='number'
                  id="outlined-adornment-id"
                  endAdornment={
                    <InputAdornment position="end">
                        <SearchRoundedIcon style={{fontSize: "20px"}}/>
                    </InputAdornment>
                  }
                  label="ID"
              />
            </FormControl>
            {/* Date picker */}
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker 
                  label="Dia"
                  disableFuture
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Grid>
      </Grid>  
      <TableInformation columnas={columns} filas={search(rows)}/>  
    </Box>
  )
}

export default Transaction