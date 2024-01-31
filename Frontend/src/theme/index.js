import breakpoints from './breakpoints'
import { createTheme } from '@mui/material/styles';
import palette from './palette'
import typography from './typography'
import components from './components'

const getTheme = () =>
  createTheme({
    breakpoints,
    typography,
    palette,
    components
  })

  export default getTheme
