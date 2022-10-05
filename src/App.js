import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Explore />}/>
          <Route path='/offers' element={<Offers />}/>
          <Route path='/profile' element={<PrivateRoute/>}>
            {/* this will render the outlet */}
            <Route path='/profile' element={<Profile />}/>
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
        </Routes>
      </Router>
      <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    </>
  );
}

export default App;