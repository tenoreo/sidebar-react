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
        alignItems:'center'
      },
    },
    searchBox:{
      paddingTop:'10px',
      width:'500px'
    },
    optionsWraper:{
      display: 'flex',
      alignItems: 'center',
    }

}));

export default styles