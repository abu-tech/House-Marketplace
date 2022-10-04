import {useLocation, Link, useNavigate} from 'react-router-dom'
import {getAuth} from 'firebase/auth';
import {useAuthStatus} from '../hooks/useAuthStatus'




function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    const {loggedIn, setLoggedIn} = useAuthStatus();
    const pathMatch = (route) => {
        if(route === location.pathname)
        return true;
    }
    // if(checkingStatus){
    //   setTimeout(()=>{

    //   }, 2000)
    // }

    const handleSignout = async ()=> {
      await auth.signOut();
      setLoggedIn(false);
      navigate('/');
    }

  return (
    <div className="navbar bg-base-100 shadow-md">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link to="/" className="font-semibold">Explore</Link></li>
        <li><Link to="/offers" className="font-semibold">Offers</Link></li>
        <li><Link to="/profile" className="font-semibold">Profile</Link></li>
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl" href="/">House Marketplace</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal p-0">   
        <li className="mx-3"><Link className={pathMatch('/') ? "btn btn-ghost underline decoration-2" : "btn btn-ghost"} to="/">Explore</Link></li>
        <li className="mx-3"><Link className={pathMatch('/offers') ? "btn btn-ghost underline decoration-2" : "btn btn-ghost"} to="/offers">Offers</Link></li>
        <li className="mx-3"><Link className={pathMatch('/profile') ? "btn btn-ghost underline decoration-2" : "btn btn-ghost"}to="/profile">Profile</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    {loggedIn ? <a className="btn text-white" onClick={handleSignout}>Sign Out</a> : <Link className="btn text-white" to="sign-in">Sign In</Link>}
  </div>
</div>
  )
}

export default Navbar