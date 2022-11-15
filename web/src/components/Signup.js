import { TextField, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRef, useState } from 'react';
import { useAuth } from './contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Signup = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPswRef = useRef();

    const { signup, currentUser } = useAuth();

    const navigate = useNavigate();

    const [emailError, setEmailError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [confirmError, setConfirmError] = useState({});
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if ( passwordRef.current.value.length < 6 || confirmPswRef.current.value.length < 6 ) {
            confirmPswRef.current.value = '';
            return setPasswordError({ error: true, helperText: 'Password is too short. At least 6 chars.'});
        }
        else if ( !testPassword(passwordRef.current.value) ) {
            return setPasswordError({ error: true, helperText: 'Password must contain at least a number.'});
        }
        else if( passwordRef.current.value !== confirmPswRef.current.value ) {
            return setConfirmError({ error: true, helperText: 'Passwords do not match'});
        }

        try {
            setEmailError({});
            setPasswordError({});
            setConfirmError({});
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch(e) {
            // console.log(JSON.stringify(e))

            switch(JSON.parse(JSON.stringify(e)).code) {
                case 'auth/email-already-in-use':
                    setEmailError({ error: true, helperText: 'User is already registered' });
                    break;
                case 'auth/invalid-email':
                    setEmailError({ error: true, helperText: 'Invalid e-mail' });
                    break;
                case 'auth/invalid-password':
                    setPasswordError({ error: true, helperText: 'Invalid password' });
                    break;
                case 'auth/internal-error':
                    setPasswordError({ error: true, helperText: 'Missing password' });
                    break;
                default:
                    setEmailError({ error: true, helperText: 'Generic error' });
                    setPasswordError({ error: true, helperText: 'Generic error' });
                    setConfirmError({ error: true, helperText: 'Generic error' });
                    break;
            }
        }
        setLoading(false);
    }

    function testPassword (str) {
        return /[0-9]/.test(str);
    }

    return ( 
        <div className="container">
            <div className='border-div'>
                <div>
                    <div className="logo-container">
                        <div className="logo"></div>
                        <p className="logo-topurl-txt">TopURL</p>
                    </div>
                    <Typography variant="h4" component="h1" className="slogan">Create new account</Typography>
                    <TextField
                        required
                        size="small"
                        label="E-mail"
                        inputRef={emailRef}
                        className='full-width'
                        autoComplete="off"
                        disabled={loading}
                        error={ emailError.error ? true : false}
                        helperText={ emailError.error ? emailError.helperText : ''}
                        onChange={ () => {
                            setEmailError({error: false, helperText: ''})
                        }}
                    />
                    <br/>
                    <br/>
                    <div className="flex-input">
                        <TextField
                            required
                            size="small"
                            label="Password"
                            inputRef={passwordRef}
                            className='sbs-inputs'
                            type="password"
                            autoComplete="off"
                            disabled={loading}
                            error={ passwordError.error ? true : false}
                            helperText={ passwordError.error ? passwordError.helperText : ''}
                            onChange={ () => {
                                setPasswordError({error: false, helperText: ''})
                            }}
                        />
                        <TextField
                            required
                            size="small"
                            label="Confirm"
                            inputRef={confirmPswRef}
                            className='sbs-inputs'
                            autoComplete="off"
                            type="password"
                            disabled={loading}
                            error={ confirmError.error ? true : false}
                            helperText={ confirmError.error ? confirmError.helperText : ''}
                            onChange={ () => {
                                setConfirmError({error: false, helperText: ''})
                            }}
                        />
                    </div>
                    <br/>
                    <Typography variant="caption" component="p" className="input-caption margin-30">
                        Use 6 or more characters with a mix of letters, numbers and symbols.
                    </Typography>
                    <br/>
                    <div className="button-container">
                        <Link to="/login"><Button variant="outlined">Login instead</Button></Link>
                        <LoadingButton
                            onClick={handleSubmit}
                            variant="contained"
                            loading={loading}
                        >Create
                        </LoadingButton>
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
 
export default Signup;