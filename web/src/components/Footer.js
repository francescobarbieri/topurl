import { Typography } from "@mui/material";
import { useAuth } from "./contexts/authContext";
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    async function handleLogout () {
        try {
            await logout();
            navigate("/login");
        } catch {
            // errors (do I really need an error here?)
        }
    }

    return (
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
                        { currentUser ? <a href="#" className='footer-link' onClick={handleLogout}><Typography variant="body2" component="p">Logout</Typography></a> : '' }
                    </div>
                </div>
            </div>
    );
}
 
export default Footer;