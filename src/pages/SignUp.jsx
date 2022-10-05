import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserTie, FaLock, FaUser} from 'react-icons/fa'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from '../firebase.config'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import {toast} from 'react-toastify'
import Oauth from '../components/Oauth';

function SignIn() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password : ""
  });

  const navigate = useNavigate();

  const {name, email, password} = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  const handleClick = async ()=> {
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');

      toast.success("Welcome! New User")
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="font-bold xl:text-5xl sm:text-3xl">Welcome!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
          <span className="label-text flex justify-start font-semibold"><FaUser /><p className='mx-0.5'>Name</p></span>
          </label>
          <input type="text" placeholder="Name" id='name' className="input input-bordered" value={name} onChange={onChange}/>
        </div>
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
          <label className="label">
            <Link to="/sign-in" className="label-text-alt link link-hover">Already a User?</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn text-white" onClick={handleClick}>Sign Up</button>
        </div>
      </div>
      <Oauth />
    </div>
  </div>
</div>
)
}
  
export default SignIn