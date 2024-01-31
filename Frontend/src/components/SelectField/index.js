import React from 'react'
import { FormControl,InputLabel,Select,MenuItem } from '@mui/material'
const SelectField = ({datos,setTipo,tipo,nombre}) => {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" >
        <InputLabel htmlFor="outlined-adornment-tipo">{nombre}</InputLabel>
            <Select
                labelId="outlined-adornment-tipo"
                id="demo-simple-select"
                value={tipo}
                label={nombre}
                onChange={(event)=>setTipo(event)}
            >
                {datos.map((res,index)=>{
                  return(<MenuItem key={index} value={res.id || res.idproduct || res.idrol || res.idunit}>{res.nombre}</MenuItem>);
                })}
            </Select>
    </FormControl>
  )
}

export default SelectField