import React from 'react'
import { FormControl,InputLabel,OutlinedInput,InputAdornment } from '@mui/material';
const TextFieldStandard = ({setTipo,tipo,nombre,habilitacion,autoComplete,tipoContenido}) => {
  if(nombre==='Otras señas'){
    return(<FormControl sx={{ m: 1, width: '52ch' }} variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-identificacion">{nombre}</InputLabel>
        <OutlinedInput
        id="outlined-adornment-identificacion"
        label={nombre}
        disabled={habilitacion}
        value={tipo}
        onChange={setTipo}
        onKeyPress={autoComplete}
    />
  </FormControl>)
  }else if(nombre==='subtotal' || nombre==='Descuento' || nombre==='IVA') {
    return(
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
        <InputLabel htmlFor="outlined-adornment-descuento">{nombre}</InputLabel>
            <OutlinedInput
            id="outlined-adornment-descuento"
            label="Descuento"
            type={tipoContenido}
            disabled={habilitacion}
            value={tipo}
            inputProps={{min: 0, max: 100} }
            endAdornment={<InputAdornment position="start">%</InputAdornment>}
            onChange={setTipo}
        />
      </FormControl>
    )
  }else{
    return(<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-identificacion">{nombre}</InputLabel>
        <OutlinedInput
        id="outlined-adornment-identificacion"
        label={nombre}
        disabled={habilitacion}
        value={tipo}
        type={tipoContenido}
        onChange={setTipo}
        onKeyPress={autoComplete}
    />
  </FormControl>)
  }
}

export default TextFieldStandard