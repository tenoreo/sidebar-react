import React from 'react'
import {Box,Paper,Table,TableBody,TableCell,TableContainer,TableHead,Pagination,TableRow,Typography} from '@mui/material';
import { styled } from "@mui/system";
const PaginationContainer = () => {    
    const StyledPagination = styled(Pagination)({
          "& .MuiPagination-text ":{
            display:'flex',
            flexDirection: "row",
            alignItems:'right',
            content:"'Pagina'"
          },
          "& .MuiPagination-ul li:last-child": {
              marginLeft: "16px",
          },
          "& .MuiPagination-ul li:last-child button::before": {
              content: "'Siguiente'",
              marginRight: "8px",
          },
          "& .MuiPagination-ul li:first-of-type": {
              marginRight: "16px",
          },
          "& .MuiPagination-ul li:first-of-type button::after": {
              content: "'Anterior'",
              marginLeft: "8px",
          }
    });
  
    return <StyledPagination />
  };
const TableInformation = ({columnas,filas}) => {
    const columns=columnas || [];
    const rows=filas || [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selected,setSelected]=React.useState(null);
    const transformDate=(fecha)=>{
      const originalDate = new Date(fecha);
      return `${(originalDate.getFullYear()).toString().padStart(2, '0')}-${(originalDate.getMonth() + 1).toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;
    }
    const saber=(dato)=>{
      console.log(dato)
    }
  return (
    <Box>
        <Box >
        <Paper sx={{ width: '81%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow >
                    {columns.map((column,index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length===0?(
                    <TableRow>
                      
                        <TableCell align='center' colSpan={columns.length} >
                          <Typography variant="h6" component="h6" sx={{color:'#9E9E9E'}}>
                            No se encontraron registros
                          </Typography>
                        </TableCell>
                      
                      
                    </TableRow>
                  ):(
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,index) => {
                      return (
                        <TableRow 
                          hover 
                          role="checkbox" 
                          tabIndex={-1} 
                          key={index} 
                          selected={selected===row.idtrans || selected===row.idpay}
                          onClick={()=>{setSelected(row.idpay);console.log(row.idpay)}}>
                          {columns.map((column,index) => {
                            const value = row[column.id];
                            if(column.id==='iva'){
                              return (
                                <TableCell key={index} align={column.align}>
                                  {value+"%"}
                                </TableCell>
                                )
                            }else if(column.id==='fecharegistro'){
                              return (
                                <TableCell key={index} align={column.align}>
                                  {transformDate(value)}
                                </TableCell>
                                )
                            }else{
                              return (
                                <TableCell key={index} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                            
                          })}
                        </TableRow>
                      );
                    })
                  )

                  }
                  
                  
                </TableBody>
              </Table>
            </TableContainer>
            
            {/* <TablePagination
              rowsPerPageOptions={-1}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ page }) => {
                return `Pagina ${page+1} de ${Math.floor(rows.length/10)+1}`;
              }}
              backIconButtonProps={{
                color: "secondary",

              }}
              nextIconButtonProps={{ color: "secondary" }}
              SelectProps={{
                inputProps: {
                  "aria-label": "page number"
                }
              }}
              labelRowsPerPage={<span>Rows:</span>}
            /> */}
        </Paper>
        <Box sx={{display:'flex',justifyContent:'end',paddingTop:'10px',width:'81%'}}>
          <PaginationContainer variant='text'/>
        </Box>
      </Box>  
    </Box>
  )
}

export default TableInformation