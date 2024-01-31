import breakpoints from './breakpoints'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const themeBreakpoints = createBreakpoints(breakpoints)

const typography = {
  h1:{
    fontSize: 40,
    fontWeight: 700,
    color: "#151B25",
    [themeBreakpoints.down('md')]: {
      fontSize: 20,
    },
    fontFamily: [
      'Poppins',
    ].join(','),
  },
  h2:{
    fontSize: 30,
    fontWeight: 700,
    color: "#151B25",
    [themeBreakpoints.down('md')]: {
      fontSize: 18,
    },
    fontFamily: [
      'Poppins',
    ].join(','),
  },
  h3:{
    fontSize: 20,
    fontWeight: 600,
    color: "#151B25",
    [themeBreakpoints.down('md')]: {
      fontSize: 15,
    },
    fontFamily: [
      'Poppins',
    ].join(','),
  },
  body1: {
    fontSize: 16,
    fontWeight: 400,
    color: "#151B25",
    fontFamily: [
      'Poppins',
    ].join(','),
  },
  body2: {
    fontSize: 14,
    fontWeight: 400,
    color: "#151B25",
    fontFamily: [
      'Poppins',
    ].join(','),
  }
}

export default typography