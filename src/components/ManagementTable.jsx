import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ManagementTable = ({headerCells, rows})=>{

  const editCarhandler = ()=>{
    // open edit car modal
    
  }
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerCells.map((headerCell)=>{
                return  <TableCell>{headerCell}</TableCell>
                 
              })}
              {/* <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <TableRow
              key={row.carId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              
                
                <TableCell >{(i + 1)}</TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell>{row.oldOrNew}</TableCell>
                <TableCell >{row.adminEmail.email}</TableCell>
                <TableCell ><Button m={1} variant='contained' color='primary' startIcon={<EditIcon />} onClick={editCarhandler}>Edit</Button> <Button variant='contained' color='error' startIcon={<DeleteIcon />} m={1}>Delete</Button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}


export default ManagementTable;