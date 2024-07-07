import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from "@mui/icons-material/Preview";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import links from "../assets/util/links";
import DoneIcon from '@mui/icons-material/Done';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    //   border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
const EnquiriesTable = ({ headerCells, rows, deleteRow, completeRow }) => {
  const navigate = useNavigate();
    const dispatch = useDispatch()
  const viewCarhandler = (carId) => {
    // open edit car modal
    navigate("/car-details/" + carId);
  };

  const enquiryDeleteHandler = (enquiryId) => {
    dispatch(startLoader())
    axios
      .post(links.backendUrl + "/delete-enquiry", {
        enquiryId: enquiryId,
      })
      .then((response) => {
        dispatch(endLoader())
        if (response.status < 200 || response.status > 299) {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Success",
            text: response.data.message,
            icon: "success",
          });
          // window.location.reload();
          deleteRow(enquiryId);
        }
    });
};

  const [openEnquiryModal,setOpenEnquiryModal] = React.useState(false)
  const openEnquiryModalHandler = ()=>{
    setOpenEnquiryModal(true)
  }
  const handleCloseEnquiryModal = ()=>{
    setOpenEnquiryModal(false)
  }

  const enquiryCompleteHandler = (enquiryId)=>{
    dispatch(startLoader())
     axios.post(links.backendUrl +  '/complete-enquiry',{
        enquiryId: enquiryId
     })
     .then(response=>{
        dispatch(endLoader())
        console.log(response);
        if (response.status < 200 || response.status > 299) {
            Swal.fire({
              title: "Error",
              text: response.data.message,
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Success",
              text: response.data.message,
              icon: "success",
            });
            // window.location.reload();
            completeRow(enquiryId);
          }
     })
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerCells.map((headerCell) => {
              return <TableCell>{headerCell}</TableCell>;
            })}
            {/* <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell >{(i + 1)}</TableCell> */}
              <TableCell>{row.enquiredBy.email}</TableCell>
              <TableCell>{row.enquirySubject}</TableCell>
              {/* <TableCell >{row.enquiryText}</TableCell> */}
              <TableCell>
                <Button
                  m={1}
                  variant="contained"
                  color="primary"
                  startIcon={<PreviewIcon />}
                  onClick={() => {
                    viewCarhandler(row.carId);
                  }}
                >
                  View
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  m={2}
                  variant="contained"
                  color="primary"
                  startIcon={<PreviewIcon />}
                  onClick={() => {
                    openEnquiryModalHandler()
                  }}
                >
                  View
                </Button>
                <Modal
                  open={openEnquiryModal}
                  onClose={handleCloseEnquiryModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                {row.enquirySubject}
                            </Typography>

                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {row.enquiryText}
                            </Typography>
                        </Grid>
                    </Grid>
                  </Box>
                </Modal>

                
              </TableCell>
              <TableCell>
                {row.completed?'Completed':'In Progress' }
              </TableCell>
              <TableCell>
              <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DoneIcon />}
                  onClick={() => {
                    enquiryCompleteHandler(row._id);
                  }}
                //   sx={{
                //     marginLeft: '0.5rem'
                //   }}
                >
                  Mark Completed
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    enquiryDeleteHandler(row._id);
                  }}
                  sx={{
                    marginLeft: '0.5rem'
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EnquiriesTable;
