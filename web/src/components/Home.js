import { Button, Typography, TextField, Accordion, AccordionDetails, AccordionSummary, InputAdornment, Popover } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Footer from './Footer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [showPopper, setShowPopper] = useState(false)

    const [urlError, setUrlError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [confirmError, setConfirmError] = useState({});
    const [custmoUrlError, setCustomUrlError] = useState({});
    const [openAccordion, setOpenAccordion] = useState(false);

    const urlRef = useRef()
    const urlPasswordRef = useRef()
    const urlConfirmPswRef = useRef()
    const customUrlRef = useRef()

    async function handleShorting () {

        // limitations:
        // url: must be a url, less than 2048 chars
        // password: must match, no more than 16 chars, only numbers, letters, and !, @, #
        // customurl: no more than 24 chars, only numbers, letters, and !, @, #

        if(urlRef.current.value.length > 2048) {
            return setUrlError({ error: true, helperText: 'Url is too long.'});
        }
        else if (!isValidURL(urlRef.current.value) || urlRef.current.value.length == 0 ) {
            return setUrlError({ error: true, helperText: 'Invalid URL.'});
        }
        else if (urlPasswordRef.current.lenght > 16) {
            return setPasswordError ({ error: true, helperText: 'Password too long.' });
        }
        else if (!isValidPassword(urlPasswordRef.current)) {
            urlConfirmPswRef.current.value = '';
            return setPasswordError ({ error: true, helperText: 'Only letters, numbers and !, @, # are allowed.' });
        }
        else if (urlPasswordRef.current.value !== urlConfirmPswRef.current.value) {
            urlConfirmPswRef.current.value = '';
            return setConfirmError ({ error: true, helperText: 'Passwords not matching.' });
        }
        else if (!isValidCustomURL(customUrlRef.current.value) && customUrlRef.current.value !== '') {
            return setCustomUrlError ({ error: true, helperText: 'Invalid path. https://topurl.eu/<CustomUrl>' });
        }
        else if (customUrlRef.current.value.length > 24) {
            return setCustomUrlError ({ error: true, helperText: 'URL too long. Up to 24 characters.' });
        }

        try {
            // await chiamata api
        } catch (e) {
            // gestione errori
        }
    }

    function isValidURL(url) {
        try {
            return Boolean(new URL(url));
        } catch {
            return false;
        }
    }

    function isValidPassword(psw) {
        const specialChars = /^[a-zA-Z0-9!@#]*$/
        return specialChars.test(psw);
    }

    function isValidCustomURL(url) {
        const specialChars = /^[a-zA-Z0-9-._!$&()*+=:@]*$/
        return specialChars.test(url);
    }

    function handleMoreInfoCustomUrl (event) {
        if(anchorEl)
        {
            setShowPopper(false);
            setAnchorEl(null);
        }
        else
        {
            setShowPopper(true);
            setAnchorEl(event.currentTarget);
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
                    <Typography variant="h6" component="h3">Paste your link here: ​</Typography>
                    <br/>
                    <TextField
                        autoFocus={true}
                        size='small'
                        label="Paste URL"
                        inputRef={urlRef}
                        className='full-width'
                        error={ urlError.error ? true : false}
                        helperText={ urlError.error ? urlError.helperText : ''}
                        onChange={ () => {
                            setUrlError({error: false, helperText: ''})
                        }}
                        required/>
                    <br/>
                    <br/>
                    <Accordion
                        disableGutters={true}
                        elevation={1}
                        onChange={ () => {
                            setOpenAccordion(!openAccordion)
                        }}
                    >
                        <AccordionSummary
                            aria-controls="panel1d-content"
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography sx={{color: 'rgba(0,0,0, 0.60)'}} variant='body1' component='p'>Show { !openAccordion ? 'more' : 'less'} options</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <div className="flex-input">
                            <TextField
                                label="Password"
                                inputRef={urlPasswordRef}
                                className='sbs-inputs'
                                size='small'
                                type="password"
                                error={ passwordError.error ? true : false}
                                helperText={ passwordError.error ? passwordError.helperText : ''}
                                onChange={ () => {
                                    setPasswordError({error: false, helperText: ''})
                                }}/>
                            <TextField
                                label="Confirm"
                                inputRef={urlConfirmPswRef}
                                className='sbs-inputs'
                                size='small'
                                type="password"
                                error={ confirmError.error ? true : false}
                                helperText={ confirmError.error ? confirmError.helperText : ''}
                                onChange={ () => {
                                    setConfirmError({error: false, helperText: ''})
                                }}/>
                        </div>
                        <br/>
                        <div>
                            <TextField
                                id="customUrl"
                                label="Custom URL"
                                inputRef={customUrlRef}
                                className='full-width'
                                size='small'
                                error={ custmoUrlError.error ? true : false}
                                helperText={ custmoUrlError.error ? custmoUrlError.helperText : ''}
                                onChange={ () => {
                                    setCustomUrlError({error: false, helperText: ''})
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <InfoOutlinedIcon onClick={handleMoreInfoCustomUrl} className="clickable"/>
                                    </InputAdornment>
                                }}
                            />
                            <Popover
                                open={showPopper}
                                anchorEl={anchorEl}
                                onClose={handleMoreInfoCustomUrl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Typography variant="body2" component="p" sx={{ p: 2, maxWidth: 350 }}>You can use this field to customize the shorted url with a custom "path". Submit only the part between square brackets: 
                                <span style={{fontWeight: 600}}> https://topurl.eu/<span style={{color: '#0551a8'}}>[CustomUrl]</span></span></Typography>
                            </Popover>
                        </div>
                        <br />
                        <Typography variant="caption" component="p" className="input-caption">Custom URLs must be gobally unique for TopURL domain. Up to 24 characters allowed.</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <br/><br/>
                    <div className='button-container'>
                        <Link to="/mylinks">
                            <Button variant='outlined'>My links</Button>
                        </Link>
                        <Button variant='contained' onClick={handleShorting} >Short</Button>
                    </div>
                </div>
                <div className='sidebar'>
                    <div className='main-img'></div>
                    <Typography variant="h6" component="p" className='main-img-descr'>"Where the shorter,<br/>the better."</Typography>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Home;