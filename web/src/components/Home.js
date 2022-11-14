import { Button, Typography, TextField, Accordion, AccordionDetails, AccordionSummary, InputAdornment, IconButton } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useAuth } from './contexts/authContext'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [error, setError] = useState('');
    const [openAccordion, setOpenAccordion] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const urlRef = useRef()
    const urlPasswordRef = useRef()
    const urlConfirmPswRef = useRef()
    const customUrlRef = useRef()

    async function handleLogout () {
        try {
            await logout();
            navigate("/login");
        } catch {
            setError("failed to logout")
        }
    }

    return ( 
        <div className="container">
            <div className='border-div'>
                <div>
                    <div className="logo-container">
                        <div className="logo"></div>
                        <p className="logo-topurl-txt">TopURL</p>
                    </div>
                    <Typography variant="h4" component="h1" className="slogan">Short your link now!</Typography>
                    <Typography variant="h6" component="h3">Paste your link here! 👇🏻​</Typography>
                    <br/>
                    <TextField
                        autoFocus={true}
                        size='small'
                        label="Paste URL"
                        inputRef={urlRef}
                        className='full-width'
                        required/>
                    <br/>
                    <br/>
                    <Accordion
                        disableGutters={true}
                        elevation={2}
                        onChange={ () => {
                            setOpenAccordion(!openAccordion)
                        }}
                    >
                        <AccordionSummary
                            aria-controls="panel1d-content"
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography variant='body1' component='p'>Show { !openAccordion ? 'more' : 'less'} options</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="flex-input">
                            <TextField
                                label="Password"
                                inputRef={urlPasswordRef}
                                className='sbs-inputs'
                                size='small'
                                type="password" />
                            <TextField
                                label="Confirm"
                                inputRef={urlConfirmPswRef}
                                className='sbs-inputs'
                                size='small'
                                type="password" />
                        </div>
                        <br/>
                        <TextField
                            label="Custom URL"
                            inputRef={customUrlRef}
                            className='full-width'
                            size='small'
                        />
                        <br/>
                        <br/>
                        <Typography variant="caption" component="p" className="input-caption">Custom URLs must be gobally unique for TopURL domain. Up to 24 characters allowed.</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <br/><br/>
                    <div className='button-container'>
                        <Button variant='outlined'>My links</Button>
                        <Button variant='contained' >Short</Button>
                    </div>
                </div>
                <div className='sidebar'>
                    <div className='main-img'></div>
                    <Typography variant="h6" component="p" className='main-img-descr'>"Where the shorter,<br/>the better."</Typography>
                </div>
            </div>
            <div className='footer'>
                <hr className='footer-bar'></hr>
                <div className='footer-container'>
                    <div className='footer-main'>
                        <a href="#" className='footer-link'>
                            <Typography variant="body2" component="p">About</Typography>
                        </a>
                        <a href="#" className='footer-link'>
                            <Typography variant="body2" component="p">Security</Typography>
                        </a>
                        <a href="#" className='footer-link'>
                            <Typography variant="body2" component="p">Chrome Extension</Typography>
                        </a>
                        <a href="#" className='footer-link'>
                            <Typography variant="body2" component="p">Mobile App</Typography>
                        </a>
                        <a target="_blank" href="https://github.com/francescobarbieri/topurl" className='footer-link'>
                            <Typography variant="body2" component="p">GitHub</Typography>
                        </a>
                    </div>
                    <div className='footer-logout'>
                        <a href="#" className='footer-link' onClick={handleLogout}>
                            <Typography variant="body2" component="p">Logout</Typography>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;