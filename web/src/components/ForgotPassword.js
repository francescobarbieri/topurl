import { useState, useRef } from 'react';
import { Button, Typography, TextField, Alert } from '@mui/material';
import { useAuth } from './contexts/authContext';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    // to-do:
    // adding an alert to let ppl know that the mail has been sent and they need to check their inbox

    const emailRef = useRef();
    const { resetPassword, currentUser } = useAuth();
    const [emailError, setEmailError] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setEmailError({});
            setLoading(true);
            await resetPassword(emailRef.current.value);
            emailRef.current.value = '';
            setSuccess(true);
        } catch(e) {
            // console.log(JSON.stringify(e))

            switch(JSON.parse(JSON.stringify(e)).code) {
                case 'auth/invalid-email':
                    setEmailError({ error: true, helperText: 'Invalid e-mail' });
                    break;
                case 'auth/user-not-found':
                    setEmailError({ error: true, helperText: 'User not found' });
                    break;
                default:
                    setEmailError({ error: true, helperText: 'Generic error' });
                    break;
            }
        }
        setLoading(false);
    }

    return ( 
        <div className="container">
            <div className='border-div'>
                <div>
                    <div className="logo-container">
                        <div className="logo"></div>
                        <p className="logo-topurl-txt">TopURL</p>
                    </div>
                    <Typography variant="h4" component="h1" className="slogan">Password reset</Typography>
                    { success ? <div>
                            <Alert 
                                severity="success"
                                onClose={() => { setSuccess(false) }}
                            >An email has been sent, check your inbox!
                            </Alert>
                            <br/><br/>
                        </div>
                    : '' }
                    <TextField
                        required
                        label="E-mail"
                        inputRef={emailRef}
                        className='full-width'
                        error={ emailError.error ? true : false }
                        helperText={ emailError.error ? emailError.helperText : '' }
                        onChange={ () => {
                            setEmailError({ error: false, helperText: '' })
                        }}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <div className="button-container">
                        <Link to="/"><Button variant="outlined">Go back</Button></Link>
                        <Button onClick={handleSubmit} variant="contained">Reset password</Button>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ForgotPassword;