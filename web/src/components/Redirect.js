import { CircularProgress, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Redirect = () => {

    const location = useLocation();
    const [error, setError] = useState({ error: false });

    useEffect( () => {
        console.log(location.pathname);
    }, []);

    return (
    <div className="redirect-container">
        <center>
            { !error.error ? <CircularProgress className="margin-30"/> : ''}
            { !error.error ? <Typography variant="body2" component='p' >TopURL is redirecting ...</Typography> : ''}
        </center>
    </div>);
}
 
export default Redirect;