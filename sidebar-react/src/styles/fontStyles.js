import breakpoints from '../theme/breakpoints'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { makeStyles } from '@material-ui/styles'

const themeBreakpoints = createBreakpoints(breakpoints)

const fontsStyles = makeStyles( theme => ({
  dashBoardCategory:{
    margin: 0,
    fontSize: 12,
    fontWeight: 700,
    color: "##18181B",
    lineHeight: '12px',
    fontFamily: [
      'Poppins',
    ].join(','),
    paddingLeft: "10px",
    marginBottom: "10px",
    [themeBreakpoints.down('sm')]: {
      fontSize: 12,
      marginBottom: "10px",
    },
  },
  dashBoardItemFont:{
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 'auto',
    fontFamily: [
      'Poppins',
    ].join(','),
    [themeBreakpoints.down('sm')]: {
      fontSize: 12,
      margin: 0,
    },
  }
}))

export default fontsStyles