import { TextField, Button, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useAuth } from './contexts/authContext';
import { Link } from 'react-router-dom';

const Signup = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPswRef = useRef();

    const { signup, currentUser } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== confirmPswRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError('Failed to create an account');
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
                    <Typography variant="h4" component="h1" className="slogan">Create new account</Typography>
                    <TextField label="E-mail" inputRef={emailRef}  className='full-width'/> <br/><br/>
                    <div className="flex-input">
                        <TextField label="Password" inputRef={passwordRef}  className='sbs-inputs'/>
                        <TextField label="Confirm" inputRef={confirmPswRef}  className='sbs-inputs'/>
                    </div>
                    <br></br>
                    <Typography variant="caption" component="p" className="input-caption margin-30">
                        Use 6 or more characters with a mix of letters, numbers and symbols.
                    </Typography>
                    <br/>
                    <div className="button-container">
                        <Link to="/login"><Button variant="outlined">Login instead</Button></Link>
                        <Button onClick={handleSubmit} variant="contained">Create</Button>
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
 
export default Signup;