import React, { useState } from 'react';
import {
  Route,
  Routes,
  Outlet
} from "react-router-dom"

import Box from '@mui/material/Box';
import Drawer from './components/drawer';
import DrawerBox from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import getTheme from './theme';
import styles from "./styles/styles.js";
import Report from './pages/Report/index.js';
import Transaction from './pages/Transaction/index.js';
import Clients from './pages/Clients/index.js';
import Products from './pages/Products/index.js';
import Units from './pages/Units/index.js';
import PaymentMethods from './pages/PaymentMethods/index.js';
import Users from './pages/Users/index.js';
import Roles from './pages/Roles/index.js'; 
import Login from './pages/Login/index.js';
import AddTransaction from './pages/ADD/Transactions/index.js';
import AddClients from './pages/ADD/Clients/index.js';
import AddPaymentMethods from './pages/ADD/PaymentMethods/index.js';
import AddUnits from './pages/ADD/Units/index.js';
import AddRoles from './pages/ADD/Roles/index.js';
import AddUsers from './pages/ADD/Users/index.js';
import AddProduct from './pages/ADD/Products/index.js';
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

  const DashboardLayout = () => (
      <Box className={classes.mainWrapper}>
        <Box className={classes.drawerWrapper}>
          <Box className={classes.drawerLogo}>
            <Box className={classes.iconHamburger} sx={{ display: { xs: 'flex', md: 'none'} }}>
              <IconButton aria-label="delete" onClick={openDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Link to="/" className={classes.drawerLogoLink}>
              <img style={{width: '100%'}} src={"/assets/logo.png"} alt ="logo" />
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
            <Outlet />
        </Box>
      </Box>
    );

  return (
    <ThemeProvider  theme={theme}>
        <Routes>
          <Route path="/"  element={<Login />}/>
          <Route element={<DashboardLayout />}>
            <Route path="/report"  element={<Report />} />
            <Route path="/transaction"  element={<Transaction />} />
            <Route path="/addTransaction/:id?"  element={<AddTransaction />} />
            <Route path="/clients"  element={<Clients />} />
            <Route path="/addClient"  element={<AddClients />} />
            <Route path="/products"  element={<Products />} />
            <Route path="/addProduct"  element={<AddProduct />} />
            <Route path="/units"  element={<Units />} />
            <Route path="/addUnits"  element={<AddUnits />} />
            <Route path="/paymentMethods"  element={<PaymentMethods />} />
            <Route path="/addPaymentMethods"  element={<AddPaymentMethods />} />
            <Route path="/users"  element={<Users />} />
            <Route path="/addUsers"  element={<AddUsers />} />
            <Route path="/roles"  element={<Roles />} />
            <Route path="/addRoles"  element={<AddRoles />} />
          </Route>
        </Routes>
    </ThemeProvider>
  );
}

export default App;
