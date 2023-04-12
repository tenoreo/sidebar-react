import React, { useState } from 'react';
import {
  Route,
  Routes,
} from "react-router-dom"

import Box from '@mui/material/Box';
import Drawer from './components/drawer';
import DrawerBox from '@mui/material/Drawer';
import Home from './pages/home';
import Ruta2 from './pages/ruta2';
import Ruta3 from './pages/ruta3';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from './theme';
import styles from "./styles/styles.js";

const App = () => {
  const classes = styles();  
  const [drawerState, setDrawer] = useState(false)
  const theme = getTheme()

  const openDrawer = () => {
    setDrawer(true)
  }

  const closeDrawer  = () => {
    setDrawer(false)
  }

  return (
    <ThemeProvider  theme={theme}>
      <Box className={classes.mainWrapper}>
        <Box className={classes.drawerWrapper}>
          <Box className={classes.drawerLogo}>
            <Box className={classes.iconHamburger} sx={{ display: { xs: 'flex', md: 'none'} }}>
              <IconButton aria-label="delete" onClick={openDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Link to="/" className={classes.drawerLogoLink}>
              <img style={{width: '100%'}} src={""} alt ="logo" />
            </Link>
            <Box className={classes.iconHamburger}></Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Drawer />
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none'} }}>
            <DrawerBox
              anchor={'left'}
              open={drawerState}
              onClose={closeDrawer}
            >
              <Drawer />
            </DrawerBox>
          </Box>
        </Box>
        <Box className={classes.routesWrapper}> 
            <Routes>
              <Route path="/"  element={<Home />} />
              <Route path="/ruta2"  element={<Ruta2 />} />
              <Route path="/ruta3"  element={<Ruta3 />} />
            </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
