import { Dispatch, SetStateAction } from "react";
import { SourceData } from "../types/types"
// import { Box, Modal } from "@mui/material";
import { Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


interface SourceProps {
  setOpenSource: Dispatch<SetStateAction<boolean>>;
  openSource: boolean;
  sourceData: SourceData | null
}

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: "column",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: '24px',
  p: 4,
  borderRadius: '15px',
};


export const Source = ({ setOpenSource, openSource, sourceData }: SourceProps) => {
  const handleCloseModal = () => {
    setOpenSource(false);
  };

  if (sourceData) {
    return (
      <Modal open={openSource} onClose={handleCloseModal}>
        <Box sx={{ ...style, '& > :not(style)': { m: 1, width: 'auto' } }}>
          <div>
            <h2>Source Information</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="source information table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Property</strong></TableCell>
                    <TableCell align="left"><strong>Value</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Connector Name</TableCell>
                    <TableCell>{sourceData.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Database Hostname</TableCell>
                    <TableCell>{sourceData.database_hostname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Database Port</TableCell>
                    <TableCell>{sourceData.database_port}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Database Name</TableCell>
                    <TableCell>{sourceData.database_dbname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Database Server Name</TableCell>
                    <TableCell>{sourceData.database_server_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Database Username</TableCell>
                    <TableCell>{sourceData.database_user}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Box>
      </Modal>
      // <Modal open={openSource} onClose={handleCloseModal}>
      //   <Box sx={{ ...style, '& > :not(style)': { m: 1, width: 'auto' } }}>
      //     <div>
      //       <h2>Source Information</h2>
      //       <ul className="connectiondetails">
      //         <li>Connector Name: {sourceData.name}</li>
      //         <li>Database Hostname: {sourceData.database_hostname}</li>
      //         <li>Database Port: {sourceData.database_port}</li>
      //         <li>Database Name: {sourceData.database_dbname}</li>
      //         <li>Database Server Name: {sourceData.database_server_name}</li>
      //         <li>Database Username: {sourceData.database_user}</li>
      //       </ul>
      //     </div>
      //   </Box>
      // </Modal>
    )
  }
}