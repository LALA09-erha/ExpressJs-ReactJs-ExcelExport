import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button"
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const HomeComponent = () => {
    const [movies, setMovies] = useState([]);

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setMovies(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const handleExport = () => {
        const headings = [[
            'Movie',
            'Category',
            'Director',
            'Rating'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Movie Report.xlsx');
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const css={
        right: 'right',
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
        
       <br></br>
          <div className="row">

                       <div className="custom-file">
                   <ButtonGroup>
                   <Button variant="contained"  onClick={handleOpen}>
                   Choose file
                   </Button>
                   <div style={{ display: "flex" }}>

                   <Button   style={{ marginRight: "auto" }}  variant="outlined" onClick={handleExport} >
                       Export <i className="fa fa-download"></i>

                   </Button>
                   <Button variant="contained" endIcon={<SendIcon />}>
                        Export DB
                    </Button>      
                   </div>
                   </ButtonGroup>    
                    <Modal
                       open={open}
                       onClose={handleClose}
                       aria-labelledby="modal-modal-title"
                       aria-describedby="modal-modal-description"
              >
                       <Box sx={style}>

                       <Input type="file" className="custom-file-input" id="inputGroupFile" onChange={handleImport}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                       </Box>
                    </Modal>
               </div>
               </div>     

            
          
 <TableContainer component={Paper}>
 <Table sx={{ minWidth: 650 }} aria-label="simple table">
 <TableHead>
 <TableRow>
 
     
       
  
  
 <TableCell>Id</TableCell>
 <TableCell>Movie</TableCell>
 <TableCell>Category</TableCell>
 <TableCell>Directory</TableCell>
 <TableCell>Rating</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>

     {
         movies.length
         ?
         movies.map((movie, index) => (
             <TableRow key={index}>
                 <TableCell scope="row">{ index + 1 }</TableCell>
                 <TableCell>{ movie.Movie }</TableCell>
                 <TableCell>{ movie.Category }</TableCell>
                 <TableCell>{ movie.Director }</TableCell>
                 <TableCell><span className="badge bg-warning text-dark">{ movie.Rating }</span></TableCell>
             </TableRow> 
         ))
         :
         
             <td colSpan="5" className="text-center">No Movies Found.</td>
          
     }
  </TableBody>   
    
    
          
           
</Table>
</TableContainer>
    
        </>

    );
};

export default HomeComponent;