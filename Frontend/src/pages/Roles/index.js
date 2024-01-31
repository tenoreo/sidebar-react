import { Box,Grid,Typography,Button,InputLabel,FormControl,OutlinedInput,InputAdornment } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React from 'react';
import styles from "./styles";
import fontsStyles from '../../styles/fontStyles';
import { viewRoles } from '../../service/roles';
import TableInformation from '../../components/TableInfomation';
import { useNavigate } from 'react-router-dom';
const buttonContained=[
  {
    label:'Nuevo rol',
    icon:<AddOutlinedIcon style={{fontSize: "20px"}}/>
  }
];

const columns = [
  { id: 'idrol', label: 'ID', minWidth: 50 },
  { id: 'nombre', label: 'Nombre', minWidth: 70 },
];

const Roles = () => {
  const classes = styles();
  const fontClasses = fontsStyles();
  const navigate=useNavigate();
  const [rows,setRows]=React.useState([]);
  const [nombre,setNombre]=React.useState('');
  const changeRoute=()=>{
    const path='/addRoles';
    navigate(path);
  }
  React.useEffect(()=>{
    if(rows && rows.length===0){
      viewRoles()
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
      return(item.nombre.toLowerCase().includes(nombre.toLowerCase()))
    })    
  }
  return (
    <Box className={classes.mainWrapper}>
      <Grid container spacing={2}>
        <Grid item xl={8} md={8} xs={12}>
          <Box className={classes.wrapperBox} >
            <Typography variant="h5" component="h5">
              <b>Roles</b>
            </Typography>
          </Box>
        </Grid>
        <Grid item xl={4} md={4} xs={12}>
          <Box className={classes.wrapperBox} >
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
              <InputLabel htmlFor="outlined-adornment-nombre">Nombre</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-nombre"
                  value={nombre}
                  onChange={(e)=>{setNombre(e.target.value)}}
                  endAdornment={
                    <InputAdornment position="end">
                        <SearchRoundedIcon style={{fontSize: "20px"}}/>
                    </InputAdornment>
                  }
                  label="Nombre"
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

export default Roles