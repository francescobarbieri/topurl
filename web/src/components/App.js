import '../App.css';
import { AuthProvider } from './contexts/authContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Signup';
import Home from './Home'
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import Redirect from './Redirect';
import MyLinks from './MyLinks';

function App() {
  return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/mylinks" element={<PrivateRoute><MyLinks /></PrivateRoute>}/>
            <Route path="*" element={<Redirect />} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;
