import breakpoints from '../../theme/breakpoints'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { makeStyles } from '@material-ui/styles'

const themeBreakpoints = createBreakpoints(breakpoints)

const styles = makeStyles( theme => ({
    mainWrapper:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'column',
        marginTop: '50px',
        marginBottom: '50px'
    },
    icon:{
        fontSize:'150px',
        color:'#66BB6A',
        marginBottom: '20px'
    },
    firstInfo:{
        marginBottom: '5px'
    },
    secondInfo:{
        marginBottom: '40px'
    },
    firstButton:{
        fontFamily: 'Poppins',
        borderRadius:'10px',
        textIndent:'0.5em',
        textTransform:'none',
        padding:'10px', 
        width: '250px', 
        marginBottom: '10px',
    },
    secondButton:{
        fontFamily: 'Poppins', 
        background:"#F89C1D",
        borderRadius:'10px',
        textIndent:'0.5em',
        textTransform:'none',
        padding:'10px',  
        width: '250px'
    }

}));

export default styles;