import breakpoints from '../../theme/breakpoints'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { makeStyles } from '@material-ui/styles'

const themeBreakpoints = createBreakpoints(breakpoints)
 
const styles = makeStyles( theme => ({
    drawerWrapper:{
      paddingLeft: "15px",
      paddingRight: "15px",
      [themeBreakpoints.down('sm')]: {
        marginTop: '80px',
        width:'230px',
      },
    },
    sectionContent:{
      marginBottom: "20px"
    },
    drawerButtonIconBox:{
      display: "flex",
      alignItems: "center",
    },
    drawerItem:{
      display: "flex",
      alignItems: "center",
      gap: 5,
      width:"auto",
      padding: "10px",
      backgroundColor: "white",
      borderRadius: "10px",
      marginTop: "0px",
      color: "#9E9E9E",
      textDecoration: "none",
      "&:hover" : {
        backgroundColor: "#F6F6F9",
      }
    },
    drawerItemActive:{
      display: "flex",
      alignItems: "center",
      gap: 5,
      width: "auto",
      padding: "10px",
      backgroundColor: "#F89C1D",
      borderRadius: "10px",
      marginTop: "0px",
      color: "white",
      textDecoration: "none"
    }
}));

export default styles