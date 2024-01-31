import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import BackHandRoundedIcon from '@mui/icons-material/BackHandRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import fontsStyles from '../../styles/fontStyles';
import styles from "./styles";

const DrawerItems = [
  {
    section: '',
    paths: 
    [
      {
        label: "Informes",
        icon: <AnalyticsIcon style={{fontSize: "20px"}}/>,
        path: "/Report"
      }
    ]
  },
  {
    section: 'Ventas',
    paths: 
    [
      {
        label: "Transacciones",
        icon: <FileCopyRoundedIcon style={{fontSize: "20px"}}/>,
        path: "/Transaction"
      },
      {
        label: "Clientes",
        icon: <PeopleAltRoundedIcon style={{fontSize: "20px"}}/>,
        path: "/Clients"
      },
      {
        label: "Productos",
        icon: <ViewInArRoundedIcon style={{fontSize: "20px"}}/>,
        path: "/Products"
      },
      {
        label: "Unidades",
        icon: <TableViewRoundedIcon style={{fontSize: "20px"}}/>,
        path: "/Units"
      },
      {
        label: "Métodos de pago",
        icon: <LocalAtmRoundedIcon style={{fontSize: "20px"}}/>,
        path: "/PaymentMethods"
      },
    ]
  }
  ,
  {
    section: 'Administración',
    paths: 
    [
      {
        label: "Usuarios",
        icon: <AccountBoxRoundedIcon style={{fontSize: "20px"}}/>,
        path: "/Users"
      },
      {
        label: "Roles",
        icon: <BackHandRoundedIcon style={{fontSize: "20px"}}/>,
        path: "/Roles"
      }
    ]
  }
]

const Drawer = () => {
  const classes = styles();
  const fontClasses = fontsStyles()
  const location = useLocation()
  const [pathname, setPathname] = useState("")
  
  useEffect(() => {
    setPathname(location.pathname)
  }, [location])

  return (
    <Box className={classes.drawerWrapper}>
      {DrawerItems.map((item, index) => (
        <Box key={index} className={classes.sectionContent}>
          <p className={fontClasses.dashBoardCategory}>{item.section}</p>
          <Box>
            {
              item.paths.map((item, index) => (
                <Link style={{textDecoration: "none"}} key={index} to={item.path}>
                  <Box className={pathname === item.path? classes.drawerItemActive: classes.drawerItem}>
                    <span className={classes.drawerButtonIconBox}>{item.icon}</span>
                    <span className={fontClasses.dashBoardItemFont}>{item.label}</span>
                  </Box>
                </Link>
              ))
            }
          </Box>
        </Box>
        ))
      }
    </Box>
  );
}

export default Drawer;
