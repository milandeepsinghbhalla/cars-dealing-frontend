import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import axios from "axios";
import Swal from "sweetalert2";
import ManagementTable from "./ManagementTable";
import links from "../assets/util/links";
import { Grid, Pagination } from "@mui/material";

const ManageCars = () => {
  const headCells = ["SrNo.", "Name", "New Or Old", "Added By", "Actions"];
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);

  const handleChange = (event, value) => {
    setPage(value)
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/get-five-cars", {
        page: value,
      })
      .then((response) => {
        if (response.status < 200 || response.status > 299) {
          Swal.fire({
            title: "error",
            text: response.messaage,
            icon: "error",
            // confirmButtonText: 'Cool'
          });
        }
        console.log("response", response);
        setRows(response.data.finalFiveCars);
        setTotal(response.data.total);
        dispatch(endLoader());
    })
    .catch((err) => {
      console.log("error while getting 5 cars", err);
    });
  };
  useEffect(() => {
    dispatch(startLoader());
    axios
      .post(links.backendUrl + "/get-five-cars", {
        page: page,
      })
      .then((response) => {
        dispatch(endLoader());
        if (response.status < 200 || response.status > 299) {
          Swal.fire({
            title: "error",
            text: response.messaage,
            icon: "error",
            // confirmButtonText: 'Cool'
          });
        }
        console.log("response", response);
        setRows(response.data.finalFiveCars);
        setTotal(response.data.total);
      })
      .catch((err) => {
        console.log("error while getting 5 cars", err);
      });
  }, []);
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item mx={3} mt={5} mb={5} xs={10}>
          {rows.length > 0 && (
            <ManagementTable rows={rows} headerCells={headCells} />
          )}
        </Grid>
        <Grid container justifyContent={'center'} pb={3}  xs={10}>
          { total && <Pagination
            

            color="primary"
            onChange={handleChange}
            count={Math.ceil(total / 5)}
          />}
        </Grid>
      </Grid>
    </>
  );
};

export default ManageCars;
