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
// import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import links from '../assets/util/links';
import Swal from 'sweetalert2';

const ManagementTable = ({headerCells, rows, deleteRow})=>{

  const navigate = useNavigate()

  const viewCarhandler = (carId)=>{
    // open edit car modal
    navigate('/car-details/'+ carId)
    
  }

  const carDeleteHandler = (carId)=>{
    axios.post(links.backendUrl + '/delete-car',{
      carId: carId
    })
    .then((response)=>{

      if(response.status<200 || response.status>299){
        Swal.fire({
          title: "error",
          text: response.data.message,
          icon: "error",
        })
      }
      else{
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: 'success'
        })
        // window.location.reload();
        deleteRow(carId)
        
      }
    })
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
                <TableCell >{row.adminEmail ? row.adminEmail.email : row.adminId.email}</TableCell>
                <TableCell ><Button m={1} variant='contained' color='primary' startIcon={<PreviewIcon />} onClick={()=>{
                    viewCarhandler(row.carId)
                }}>View</Button> <Button variant='contained'  color='error' startIcon={<DeleteIcon />} onClick={()=>{
                  carDeleteHandler(row.carId);
                }} m={1}>Delete</Button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}


export default ManagementTable;