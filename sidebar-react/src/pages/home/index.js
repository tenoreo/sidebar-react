import { Box } from '@mui/material';
import React from 'react';
import styles from "./styles";


const Home = () => {
  const classes = styles();

  return (
    <Box className={classes.mainWrapper}>
      Hola mundo pagina 1
      
    </Box>
  );
}

export default Home;
