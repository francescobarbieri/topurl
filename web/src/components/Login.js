import { TextField, Button, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useRef, useState } from 'react';
import { useAuth } from './contexts/authContext'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [emailError, setEmailError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setEmailError({});
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch(e) {
            // console.log(JSON.stringify(e));
            // email invalida
            // email troppo lunga
            // password invalida
            // user not found

            switch(JSON.parse(JSON.stringify(e)).code) {
                case 'auth/invalid-email':
                    setEmailError({ error: true, helperText: 'Invalid e-mail' });
                    break;
                case 'auth/invalid-password':
                    setPasswordError({ error: true, helperText: 'Invalid password' });
                    break;
                case 'auth/user-not-found':
                    setEmailError({ error: true, helperText: 'User not found' });
                    break;
                case 'auth/internal-error':
                    setPasswordError({ error: true, helperText: 'Missing password' });
                    break;
                default:
                    setEmailError({ error: true, helperText: 'Generic error' });
                    setPasswordError({ error: true, helperText: 'Generic error' });
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
                    <Typography variant="h4" component="h1" className="slogan">Choose login method</Typography>
                    <Button className="googlelogin-button full-width" variant="outlined">Login with google</Button>
                    <div className='login-divider'>
                        <div className="login-divider-hr">
                            <hr></hr>
                        </div>
                        <Typography variant="body1" component="h3" className="login-divider-text">Or</Typography>
                        <div className="login-divider-hr">
                            <hr></hr>
                        </div>
                    </div>
                    <TextField
                        required
                        label="E-mail"
                        inputRef={emailRef}
                        className='full-width'
                        autoComplete="off"
                        size='small'
                        disabled={loading}
                        error={ emailError.error ? true : false}
                        helperText={ emailError.error ? emailError.helperText : ''}
                        onChange={ () => {
                            setEmailError({error: false, helperText: ''})
                        }}
                    />
                    <br/><br/>
                    <TextField
                        required
                        label="Password"
                        inputRef={passwordRef}
                        className='full-width margin-30'
                        autoComplete="off"
                        type="password"
                        size='small'
                        disabled={loading}
                        error={ passwordError.error ? true : false}
                        helperText={ passwordError.error ? passwordError.helperText : ''}
                        onChange={ () => {
                            setPasswordError({error: false, helperText: ''})
                        }}
                    />
                    <br/>
                    <div className="button-container">
                        <Link to="/signup"><Button variant="outlined">Signup instead</Button></Link>
                        <LoadingButton 
                            onClick={handleSubmit}
                            variant="contained"
                            loading={loading}
                        > Log In
                        </LoadingButton>
                    </div>
                    <br/><br/>            
                    <Typography variant='body2' component="p">Forgot password?  <Link to="/forgotpassword">Click here</Link></Typography>
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
 
export default Login;