import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import Box from '@mui/material/Box';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleIcon from '@mui/icons-material/People';
import fontsStyles from '../../styles/fontStyles';
import styles from "./styles";

const DrawerItems = [
  {
    section: '',
    paths: 
    [
      {
        label: "Dashboard",
        icon: <AnalyticsIcon style={{fontSize: "20px"}}/>,
        path: "/"
      }
    ]
  },
  {
    section: 'Titulo de seccion',
    paths: 
    [
      {
        label: "Pagina 1",
        icon: <PeopleIcon style={{fontSize: "20px"}}/>,
        path: "/ruta2"
      },
      {
        label: "Pagina 2",
        icon: <FileCopyIcon style={{fontSize: "20px"}}/>,
        path: "/ruta3"
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
