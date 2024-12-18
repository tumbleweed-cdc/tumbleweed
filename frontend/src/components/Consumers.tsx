import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsumers, deleteConsumer } from "../services/consumerService";
import { ConsumerData } from "../types/types";
import { Consumer } from "./Consumer";
import { ConsumerForm } from "./ConsumerForm";
import { sortConsumersByDate } from "../utils/sorting";
import { ErrorSnack } from "./ErrorSnack";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box, Button
} from '@mui/material';
import { SuccessSnack } from "./SuccessSnack";
import { ZodError } from "zod";

interface ConsumerProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Consumers = ({ setLoading }: ConsumerProps) => {
  const [consumers, setConsumers] = useState<ConsumerData[] | []>([]);
  const [selectedConsumer, setSelectedConsumer] = useState<ConsumerData | null>(null)
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openConsumer, setOpenConsumer] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchConsumers = async (): Promise<void> => {
      setLoading(true);
      try {
        const request = await getConsumers();
        const data = sortConsumersByDate(request.data);
        setConsumers(data);
      } catch (error) {
        console.error(error);
        setError(true);
        if (error instanceof ZodError) {
          setErrorMsg('There was an error fetching the data. Please try again later.');
        } else {
          setErrorMsg("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchConsumers();
  }, []);

  const handleDeleteConsumer = async () => {
    try {
      if (selectedConsumer) {
        const source = selectedConsumer.name;
        await deleteConsumer(source);
        setConsumers(prevSources => prevSources.filter(sourceString => sourceString.name !== source));
        setSelectedConsumer(null);
        setSuccess(true);
        setSuccessMsg("Consumer deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("An unknown error occurred");
      }
    }
  }

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const currentConsumers = consumers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCloseSnackbar = () => {
    setError(false);
    setErrorMsg('');
    setSuccess(false);
    setSuccessMsg('');
  }

  return (
    <>
      <div className="connectionlist">
        {error && (
          <ErrorSnack
            message={errorMsg}
            handleCloseSnackbar={handleCloseSnackbar}
            openStatus={error}
          />
        )}
        {success && (
          <SuccessSnack
            message={successMsg}
            handleCloseSnackbar={handleCloseSnackbar}
            openStatus={success}
          />
        )}
        <div id="consumerlist">
          <h1>Consumer List</h1>
          {consumers.length > 0 && (
            <>
              <TableContainer component={Paper} sx={{ borderRadius: '15px', maxWidth: '100%', overflowX: 'auto', marginLeft: "50px", marginRight: "50px", boxSizing: 'border-box' }}>
                <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} size="small" aria-label="consumer list table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{fontWeight: 700, position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 1 }}>
                        Name
                      </TableCell>
                      <TableCell sx={{fontWeight: 700 }}>Subscribed Topics</TableCell>
                      <TableCell sx={{fontWeight: 700 }}>Date Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentConsumers.map(consumer => (
                      <TableRow key={consumer.name}>
                        <TableCell>
                          <Link
                            className="link"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedConsumer(consumer);
                              setOpenConsumer(true);
                            } }
                            to={''}
                          >
                            {consumer.name}
                          </Link>
                        </TableCell>
                        <TableCell>{consumer.subscribed_topics.join(', ')}</TableCell>
                        <TableCell>{consumer.date_created}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer><Box display="flex" alignItems="center" justifyContent="right" sx={{ width: '100%', marginTop: 2, marginLeft: 6 }}>
              <Box sx={{ flex: 'none' }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={consumers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    '& .MuiTablePagination-toolbar': { minHeight: '36px' },
                    '& .MuiTablePagination-selectLabel, .MuiTablePagination-input, .MuiTablePagination-displayedRows': {
                      fontSize: '0.75rem', fontFamily: "Montserrat", fontWeight: 400
                    },
                  }} 
                />
              </Box>
              </Box>
            </>
          )}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained"
              className="connectionButton"
              onClick={() => setOpenForm(true)}
              sx={{
                fontFamily: "Montserrat",
                marginLeft: '50px',
                fontWeight: 400,
                borderRadius: '30px',
                backgroundColor: '#70AF85',
                '&:hover': {
                  backgroundColor: '#F58B33',
                },
              }}
            >
              Create New Consumer
            </Button>
          </Box>
        </div>
        {selectedConsumer && openConsumer &&
          <>
            <Consumer
              setOpenConsumer={setOpenConsumer}
              openConsumer={openConsumer}
              handleDeleteConsumer={handleDeleteConsumer}
              selectedConsumer={selectedConsumer}
              setSelectedConsumer={setSelectedConsumer}
            />
          </>}
        {openForm &&
          <ConsumerForm
            setConsumers={setConsumers}
            setOpenForm={setOpenForm}
            openForm={openForm}
            setError={setError}
            setErrorMsg={setErrorMsg}
            setSuccess={setSuccess}
            setSuccessMsg={setSuccessMsg}
          />}
      </div>
    </>
  )
}
