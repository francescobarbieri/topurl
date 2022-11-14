import { TextField, Button, Typography } from '@mui/material'
import { useRef, useState } from 'react';
import { useAuth } from './contexts/authContext'
import { Link, useNavigate } from 'react-router-dom';

// Todo:
// - load animation sul button
// - mentre carica si blocca il form (non puoi più modificare i campi)
// - errori dei vari campi di inserimento + errore generico

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch {
            setError('Failed to create sign in')
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
                    <Typography variant="h4" component="h1" className="slogan">Choose login method</Typography>
                    <Button className="googlelogin-button full-width" variant="outlined">Login with google</Button>
                    <div className='login-divider'>
                        <div className="login-divider-hr">
                            <hr></hr>
                        </div>
                        <Typography variant="h6" component="h3" className="login-divider-text">Or</Typography>
                        <div className="login-divider-hr">
                            <hr></hr>
                        </div>
                    </div>
                    <TextField label="E-mail" inputRef={emailRef} className='full-width'/> <br/><br/>
                    <TextField label="Password" inputRef={passwordRef} className='full-width margin-30' />
                    <br/>
                    <div className="button-container">
                        <Link to="/signup"><Button variant="outlined">Signup instead</Button></Link>
                        <Button onClick={handleSubmit} variant="contained">Log In</Button>
                    </div>
                    <br/><br/>            
                    <Typography variant='body1' component="p">Forgot password?  <Link to="/forgotpassword">Click here</Link></Typography>
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
 
export default Login;