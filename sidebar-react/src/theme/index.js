import breakpoints from './breakpoints'
import { createTheme } from '@mui/material/styles';
import palette from './palette'
import typography from './typography'

const getTheme = () =>
  createTheme({
    breakpoints,
    typography,
    palette,
  })

  export default getTheme
