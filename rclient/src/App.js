import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Connect from './pages/Connect';
import Landing from './pages/Landing_Page';
import Login from './Authentication/Login';
import Registration from './Authentication/Registration';
import Success from './pages/Success';
import Fluctuation from './pages/Fluctuation';
import ProtectedRoute from './Context/Protected/ProtectedRoute';
import { UserAuthContextProvider } from './Context/authContext/AuthContextProvider';
import Dashboard from './pages/Dashboard';
import PopUp from './Component/PopUp';
import Profile from './userPages/Profile';
import Folder from './userPages/Folder';


function App() {
  return (
    <>
    <UserAuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/home" element={<Landing/>} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/connect" element={<Connect />} />
        <Route exact path="/result" element={<Success />} />
        <Route exact path="/fluctuation" element={<Fluctuation/>} />
        <Route exact path="/reset" element={<PopUp/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/dashboard" 
        element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>}>
          <Route index element={<Navigate to="profile" replace/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='folders' element={<Folder/>}/>
        </Route>
        <Route path="*" element={"Not found"} />
      </Routes>
    </UserAuthContextProvider>
    </>
  );
}

export default App;
