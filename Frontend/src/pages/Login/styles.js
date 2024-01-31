import breakpoints from '../../theme/breakpoints'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { makeStyles } from '@material-ui/styles'

const themeBreakpoints = createBreakpoints(breakpoints)

const styles = makeStyles( theme => ({
  mainWrapper:{
    
    display: "flex",
    flexDirection: "column",       
    alignItems:'center', 
    boxShadow: '0px 7px 29px 0px rgba(100, 100, 111, 0.2)',
    paddingTop:'100px',
    paddingBottom:'100px',
    marginTop:'5%',
    marginRight:'35%',
    marginLeft:'35%',
    borderRadius: '25px',
    px: 4,
    py: 6,
    [themeBreakpoints.down('sm')]: {
      display:'flex',
      flexDirection: "column", 
      alignItems:'center',
      justifyContent:'center',
      paddingTop:'30%',
      margin:'5%',
      boxShadow: 'none'
    },
  },
  drawerLogo:{
      display: "flex",
      alignItems: 'center',
      padding: "20px 50px",
      [themeBreakpoints.down('sm')]: {
        padding: '15px 15px',
      },
  },
  drawerLogoLink:{
    display:'flex',
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    [themeBreakpoints.down('sm')]: {
      width: "100%",
      right:0
    },
  },
  logo:{
    width:'40%',
    [themeBreakpoints.down('sm')]: {
      width:'80%'
    },
  },
  buttonItem:{
    display: "flex",
    alignItems: "center",
    justifyContent:'center',
    gap: 5,
    width: "auto",
    padding: "10px",
    backgroundColor: "#F89C1D",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none",
    marginTop:'25px',
    cursor:'pointer'
  }
}));

export default styles