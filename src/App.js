import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import Category from './pages/Category'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateListing from './pages/CreateListing'
import Listing from './pages/Listing'
import PrivateRoute from './components/PrivateRoute'
import Contact from './pages/Contact'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound'


function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Explore />}/>
          <Route path='/offers' element={<Offers />}/>
          <Route path='/category/:categoryName' element={<Category />}/>
          <Route path='/profile' element={<PrivateRoute/>}>
            {/* this will render the outlet */}
            <Route path='/profile' element={<Profile />}/>
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path='/category/:categoryName/:id' element={<Listing />}/>
          <Route path='/contact/:landlordId' element={<Contact />} />
          <Route path='/*' element={<NotFound />}/>
        </Routes>
      </Router>
      <ToastContainer
      position="top-center"
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
