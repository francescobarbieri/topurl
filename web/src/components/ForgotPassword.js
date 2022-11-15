import { useState, useRef } from 'react';
import { Button, Typography, TextField, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuth } from './contexts/authContext';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const ForgotPassword = () => {

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
                        size="small"
                        autoComplete="off"
                        label="E-mail"
                        disabled={loading}
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
                        <LoadingButton 
                            onClick={handleSubmit}
                            variant="contained"
                            loading={loading}
                        >Reset password
                        </LoadingButton >
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
 
export default ForgotPassword;