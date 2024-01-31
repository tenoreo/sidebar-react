import React from 'react'
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert,Snackbar  } from '@mui/material'; 
import styles from "./styles";
import { verifyUser } from '../../service/user';
import {useNavigate} from 'react-router-dom';
import fontStyles from '../../styles/fontStyles';
const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [email,setEmail]=React.useState('');
  const [result,setResult]=React.useState();
  const [password,setPassword]=React.useState('');
  const [message,setMessage]=React.useState('');
  const classes = styles();
  const fontClasses = fontStyles();
  const navigate=useNavigate();
  const changeRoute=()=>{
    const path='/report';
    navigate(path);
  }
  React.useEffect(()=>{
    if(result){
      if(result.length>0){
        localStorage.setItem('id',result[0].iduser);
        changeRoute();
      }else{
        setMessage('Usuario y contraseña incorrecto');
        handleClick();
      }
    }
   
  },[result])
  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleEmail=(event)=>{
    setEmail(event.target.value)
  }
  const handlePassword=(event)=>{
    setPassword(event.target.value)
  }

  const verify=()=>{
    if(email && password){
      verifyUser(email,password)
      .then((res)=>{
        setResult(res.data);
      }).catch(error=>{
        setMessage('Hubo un error en el sistema.');
        handleClick();
      })
    }else{
      setMessage('Los campos del correo y contraeña les falta por llenarse')
      handleClick();
    }
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      // const data = new FormData(event.currentTarget);
    };
    return (
      <>
      <Box className={classes.mainWrapper}>
          <Link to="/" className={classes.drawerLogoLink}>
            <img className={classes.logo} src={"/assets/logo.png"} alt ="logo" />
          </Link>
          <Typography component="h6" variant="h6" sx={{ paddingTop:'40px'}}>
            <b>Login into your account</b>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              variant='standard'
              value={email}
              onChange={handleEmail}
            />
            <TextField
            variant='standard'
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
            />
            <Link style={{textDecoration: "none"}} onClick={verify}>
              <Box className={classes.buttonItem}>
                <span className={fontClasses.dashBoardItemFont}><b>Login</b></span>
              </Box>
            </Link>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
        </Snackbar>
      </>
    );
}

export default Login