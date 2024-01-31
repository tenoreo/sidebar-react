import React from 'react';
import { Typography,Box,Grid,Link } from '@mui/material';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import fontsStyles from '../../styles/fontStyles';
import styles from "./styles";
import { getPerDay, getPerMonth, getPerYear } from '../../service/stadistic';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'none',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto','Septiembre','octubre','Noviembre','Diciembre'];
const labels2=[20,40,60,70,80,90,100,110,120,90,100,130];


const Report = () => {
  const classes = styles();
  const fontClasses = fontsStyles();
  const [mensual,setMensual]=React.useState([]);
  const [dia,setDia]=React.useState([]);
  const [ano,setAno]=React.useState([]);
  const [data, setData]=React.useState({
    labels,
    datasets: [
      {
        label: 'ventas',
        data: labels.map((res,index) =>  {return labels2[index]}),
        borderColor: 'rgba(248,156,29,1)',
        backgroundColor: 'rgba(248,156,29,1)',
      }
    ],
  });

  React.useEffect(()=>{
    if(mensual && mensual.length===0){
      getPerMonth().then(res=>{
        setMensual(res.data);
      })
    }
    if(dia && dia.length===0){
      getPerDay().then(res=>{
        setDia(res.data[0]);
      })
    }if(ano && ano.length===0){
      getPerYear().then(res=>{
        setAno(res.data[0]);
      })
    }
  },[mensual,dia,ano]);

  React.useEffect(()=>{
    if(mensual ){
      let tempLabels= []
      let tempData= []
      mensual.map((res) =>  
      {
        tempLabels.push(res.mes)
        tempData.push(res.total)
      })
      setData({
        labels: tempLabels,
        datasets: [
          {
            label: 'ventas',
            data: tempData,
            borderColor: 'rgba(248,156,29,1)',
            backgroundColor: 'rgba(248,156,29,1)',
          }
        ],
      })
    }
  },[mensual]);


  const sumartotal=()=>{
    let numero=0
    mensual.map(res=>{
      numero+=res.total
    });
    return numero;
  }

  const sumarCantidad=()=>{
    let numero=0
    mensual.map(res=>{
      numero+=parseInt(res.cantidad)
    });
    return numero;
  }
  return (
    <Box className={classes.mainWrapper}>
      {/* botones */}
      <Grid container spacing={2}>
        <Grid item  md={5.3} xs={12}>
          <Box className={classes.wrapperBox}>
            <Typography variant="h5" component="h5">
              <b>Informe de ventas de anual</b>
            </Typography>
          </Box>
        </Grid>
        <Grid item md={1} xs={12} >
          <Box className={classes.wrapperBox2} >
            <Link style={{textDecoration: "none"}} >
              <Box className={classes.buttonItem}>
                <span className={classes.buttonIconBox}><LocalPrintshopRoundedIcon style={{fontSize: "20px"}}/></span>
                <span className={fontClasses.dashBoardItemFont}><b>Imprimir</b></span>
              </Box>
            </Link>
          </Box>
        </Grid>
      </Grid>
      {/* graficos */}
      <Box className={classes.chartBox}>
        <Line options={options} data={data} />
      </Box>
      {/* datos */}
      <Box className={classes.boxInfo}>
      <Grid container spacing={2} >
          {/* diarios */}
          <Grid item md={4} xs={12}>
            <Box className={classes.mainBoxInfo}>
              <Typography variant="h6" >
                <b>Ventas diaria</b>
              </Typography>
              <Typography variant="caption" sx={{color:'#e8e8e8'}}>                
                Viernes 19 de Enero
              </Typography>
              {/* right */}
              <Box className={classes.secondBoxInfo}>
                <Typography variant="subtitle1">
                {dia.cantidad} ventas
                </Typography>
                <Typography variant="subtitle1" >
                  <b>CRC {dia.total==null?0:dia.total}</b>
                </Typography>
                {/* <Typography variant="subtitle1" >
                  <b>USD 250.000</b>
                </Typography> */}
              </Box>
            </Box>
          </Grid>
          {/* mensual */}
          <Grid item md={4} xs={12}>
            <Box className={classes.mainBoxInfo}>
              <Typography variant="h6" >
                <b>Venta mensual</b>
              </Typography>
              <Typography variant="caption" sx={{color:'#e8e8e8'}}>
                Enero 2024
              </Typography>
              {/* right */}
              <Box className={classes.secondBoxInfo}>
                <Typography variant="subtitle1">
                  {sumarCantidad()} ventas
                </Typography>
                <Typography variant="subtitle1">
                  <b>CRC {sumartotal()}</b>
                </Typography>
                {/* <Typography variant="subtitle1">
                  <b>USD 250.000</b>
                </Typography> */}
              </Box>
            </Box>
          </Grid>
          {/* anual */}
          <Grid item md={4} xs={12}>
            <Box className={classes.mainBoxInfo}>
              <Typography variant="h6" component="h6">
                <b>Venta Anual</b>
              </Typography>
              <Typography variant="caption" sx={{color:'#e8e8e8'}}>
                1 enero - 31 diciembre
              </Typography>
              {/* right */}
              <Box className={classes.secondBoxInfo}>
                <Typography variant="subtitle1">
                  {ano.cantidad} ventas
                </Typography>
                <Typography variant="subtitle1">
                  <b>CRC {ano.total}</b>
                </Typography>
                {/* <Typography variant="subtitle1">
                  <b>USD 250.000</b>
                </Typography> */}
              </Box>
            </Box>
          </Grid>
      </Grid>
      </Box>
      
    </Box>
  )
}

export default Report