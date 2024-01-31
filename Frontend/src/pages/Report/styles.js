import breakpoints from '../../theme/breakpoints'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { makeStyles } from '@material-ui/styles'

const themeBreakpoints = createBreakpoints(breakpoints)

const styles = makeStyles( theme => ({
    mainWrapper:{
      paddingTop: "80px",
      paddingLeft:'50px',
      paddingRight:'50px',
      [themeBreakpoints.down('sm')]: {
        padding: "20px"
      },
    },
    wrapperBox:{
      [themeBreakpoints.down('sm')]: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
      },
    },
    wrapperBox2:{
      [themeBreakpoints.down('sm')]: {
        display:'flex',
        flexDirection:'column',
        // justifyContent:'center',
        // alignItems:'center',
        width:'85%',
        paddingLeft:'15px'
      },
    },
    chartBox:{
      borderRadius:'10px',
      border:'solid 1px #e8e8e8',
      width:'52%',
      marginTop:'10px',
      [themeBreakpoints.down('sm')]: {
        width: "95%",
        padding:'10px'
      },
    },
    boxInfo:{
      marginTop:'10px',
      width:'52%',
      [themeBreakpoints.down('sm')]: {
        width:'100%'
      },
    },
    mainBoxInfo:{
      borderRadius:'10px',
      border:'solid 1px #e8e8e8',
      padding:'10px'
    },
    secondBoxInfo:{
      display:'flex',
      flexDirection:'column',
      alignItems:'end'
    },
    linkButton:{
      textDecoration: "none"
    },
    buttonIconBox:{
      display: "flex",
      alignItems: "center",
    },
    buttonItem:{
      display: "flex",
      alignItems: "center",
      justifyContent:'center',
      gap: 5,
      padding: "10px",
      backgroundColor: "#F89C1D",
      borderRadius: "10px",
      color: "white",
      textDecoration: "none",
      cursor:'pointer',
      [themeBreakpoints.down('sm')]: {
        width:'100%',
      },
    }    
    
}));

export default styles