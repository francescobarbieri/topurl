import { TextField, Typography, Popover, Box, Dialog, DialogTitle } from "@mui/material";
import { useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Footer from "./Footer";
import { QRCodeSVG } from 'qrcode.react';


const MyLinks = () => {

    // states

    const [tablePage, setTablePage] = useState(0);
    const [showPopper, setShowPopper] = useState({openedPopoverId: null, anchorEl: null});
    const [qrDialog, setQrDialog] = useState({openStatus: false, url: null});
    const [filterSearch, setFilterSearch] = useState('');
    const search = useRef();

    // data fetch and preparation

    function createData(originalLink, shorted, date) {
        let truncated = '';

        if(originalLink.length > 38)
            truncated = originalLink.substr(0, 35) + '...';
        else
            truncated = originalLink;

        return { truncated, originalLink, shorted, date };
    }

    const rows = [
        createData('https://www.federica.eu/smartexportacademy/', '/abc1234', 'DD/MM/YYY'),
        createData('https://www.youtube.com/watch?v=B1AfaWIbQdU&list=PLMPdeA59PPg0Lb0NG6rug-DijxyzRXvMr&index=5&ab_channel=OakHarborWebDesigns', '/abc1235', 'DD/MM/YYY'),
        createData('https://www.youtube.com/watch?v=PKwu15ldZ7k&ab_channel=WebDevSimplified', '/abc1236', 'DD/MM/YYY'),
        createData('https://firebase.google.com/docs/auth/web/google-signin', '/abc1237', 'DD/MM/YYY'),
        createData('https://stackoverflow.com/questions/952924/how-do-i-chop-slice-trim-off-last-character-in-string-using-javascript', '/abc1238', 'DD/MM/YYY'),
        createData('https://stackoverflow.com/questions/952924/how-do-i-chop-slice-trim-off-last-character-in-string-using-javascript', '/abc1238', 'DD/MM/YYY'),
    ].filter(searchData);

    function searchData(value, index, array) {
        console.log(array)
        if(filterSearch === 0)
            return (array.indexOf(value) === index);
        else
            return(value.originalLink.includes(filterSearch))
    }
    
    // pagination actions & empty rows calculation

    function TablePaginationActions(props) {

        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return(
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={tablePage === 0}
                    aria-label="first page"
                >
                    <FirstPageIcon></FirstPageIcon>
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={tablePage === 0}
                    aria-label="previous page"
                >
                    <KeyboardArrowLeft></KeyboardArrowLeft>
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    <KeyboardArrowRight></KeyboardArrowRight>
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    <LastPageIcon></LastPageIcon>
                </IconButton>
            </Box>
        )
    }

    const emptyRows = Math.max(0, (1 + tablePage) * 5 - rows.length);

    // handling page change

    function onPageChange (event, newPage) {
        setTablePage(newPage);
    }

    // qrcode dialog

    function QRDialog (props) {
        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
        };

        return (
            <Dialog
                onClose={handleClose}
                open={open}
            >
                <DialogTitle>Qr Code</DialogTitle>
                <div sx={{p:2, w:1, h:1}}>
                    <QRCodeSVG value={qrDialog.url}></QRCodeSVG>
                </div>
            </Dialog>
        );
    }

    const handleQrClose = (value) => {
        setQrDialog({openStatus: false, url: null});
    };

    return (
        <div className="container">
            <QRDialog
                selectedValue={'close'}
                open={qrDialog.openStatus}
                onClose={handleQrClose}
            />
            <div className='mylinks-border-div'>
                <div>
                    <div className="logo-container">
                        <div className="logo"></div>
                        <p className="logo-topurl-txt">TopURL</p>
                    </div>
                    <div className="mylinks-header">
                        <Typography variant="h4" component="h1" className="slogan">My links</Typography>
                        <TextField
                            label="Search"
                            size="small"
                            inputRef={search}
                            onChange={ () => {
                                setFilterSearch(search.current.value)
                            }}
                            autoComplete="off"
                        ></TextField>
                    </div>
                    <div style={{ width: '100%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Original link</TableCell>
                                    <TableCell align="right">Shorted link</TableCell>
                                    <TableCell align="right" style={{ width: 100 }}>Created</TableCell>
                                    <TableCell align="right" style={{ width: 120 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {( rows.slice(tablePage * 5, tablePage * 5 + 5)
                            ).map((row) => (
                                <TableRow
                                key={row.shorted}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" onClick={ (e) => setShowPopper(
                                        {openedPopoverId: row.shorted, anchorEl: e.currentTarget })}
                                        id={row.shorted}
                                        >
                                        <span className="clickable">{row.truncated}</span>
                                    </TableCell>
                                    <Popover
                                        open={ showPopper.openedPopoverId === row.shorted}
                                        onClose={ () => setShowPopper({ openedPopoverId: null, anchorEl: null })}
                                        anchorEl={ showPopper.anchorEl }
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Typography variant="body2" component="p" className="popover-mylinks">
                                            <a href={row.originalLink} target="_blank">{row.originalLink}</a>
                                        </Typography>
                                    </Popover>
                                    <TableCell align="right">{row.shorted}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">
                                        <IconButton>
                                            <QueryStatsOutlinedIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => setQrDialog({openStatus: true, url: 'https://topurl.eu'+row.shorted})}
                                        >
                                            <QrCode2OutlinedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <HighlightOffOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 73 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}

                            </TableBody>
                            <TableFooter>
                                <TableRow variant="footer">
                                    <TablePagination
                                        onPageChange={onPageChange}
                                        colSpan={4}
                                        count={rows.length}
                                        rowsPerPage={5}
                                        rowsPerPageOptions={[5]}
                                        page={ tablePage }
                                        SelectProps={{
                                            inputProps: {
                                            'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default MyLinks;