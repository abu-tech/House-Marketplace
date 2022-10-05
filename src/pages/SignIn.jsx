import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserTie, FaLock} from 'react-icons/fa'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {toast} from 'react-toastify'
import Oauth from '../components/Oauth';

function SignIn() {

  const [formData, setFormData] = useState({
    email: "",
    password : ""
  });

  const navigate = useNavigate();

  const {email, password} = formData;
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  const handleClick = async ()=> {
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      if(user){
        navigate('/');
        toast.success("Welcome Back!")
      }
    } catch (e) {
      toast.error("Bad User Credentials!")
    }
  }

  return (
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="font-bold xl:text-5xl sm:text-4xl">Welcome Back!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text flex justify-start font-semibold"><FaUserTie /><p className='mx-0.5'>Email</p></span>
          </label>
          <input type="email" placeholder="Email" id='email' className="input input-bordered" value={email} onChange={onChange}/>
        </div>
        <div className="form-control">
          <label className="label">
          <span className="label-text flex justify-start font-semibold"><FaLock /><p className='mx-0.5'>Password</p></span>
          </label>
          <input type="password" placeholder="Password" id='password' className="input input-bordered" value={password} onChange={onChange}/>
          <div className='flex justify-between'>
          <label className="label">
            <Link to="/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link>
          </label>
          <label className="label">
            <Link to="/sign-up" className="label-text-alt link link-hover">New User?</Link>
          </label>
          </div>
        </div>
        <div className="form-control mt-5">
          <button className="btn text-white" onClick={handleClick}>Sign In</button>
        </div>
      </div>
      <Oauth />
    </div>
  </div>
</div>
)
}
  
export default SignIn