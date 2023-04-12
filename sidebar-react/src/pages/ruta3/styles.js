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
    }
}));

export default styles