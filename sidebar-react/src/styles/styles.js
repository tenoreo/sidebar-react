import breakpoints from '../theme/breakpoints'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { makeStyles } from '@material-ui/styles'

const themeBreakpoints = createBreakpoints(breakpoints)

const styles = makeStyles( theme => ({
    mainWrapper:{
        display: 'flex',
        flexDirection: "row",
        zIndex: 3000,
        [themeBreakpoints.down('sm')]: {
          flexDirection: "column",
        },
    },
    drawerWrapper:{
      borderRight: 'solid 1px #E8E8EE',
      height: '100vh',
      width:'230px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 3000,
      [themeBreakpoints.down('sm')]: {
        backgroundColor: "white",
        borderRight: 'none',
        borderBottom: 'solid 1px #E8E8EE',
        zIndex: 3000,
        width: "100%",
        height: 'auto',
      },
    },
    routesWrapper:{
      overflowY: "auto",
      height: '100vh',
      width:'calc(100% - 230px)',
      [themeBreakpoints.down('sm')]: {
        width: "100%",
        height: 'auto',
      },
    },
    drawerLogo:{
      display: "flex",
      alignItems: 'center',
      padding: "20px 50px",
      [themeBreakpoints.down('sm')]: {
        padding: "15px 15px",
      },
    },
    drawerLogoLink:{
      width: "100%",
      [themeBreakpoints.down('sm')]: {
        width: "40%",
      },
    },
    iconHamburger:{
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start'
    }
}));

export default styles