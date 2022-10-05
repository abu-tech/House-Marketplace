import {useState} from 'react'
import {Link} from 'react-router-dom'
import {FaUserTie} from 'react-icons/fa'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {toast} from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value)

  const resetPassword = async ()=> {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Successfully sent a email!")
    } catch (e) {
      toast.info("Something went wrong!")
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Forgot your password!?</h1>
      <p className="py-6">Don't fret! Just type in your email and we will send you a link to your email to reset your password!.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text flex justify-start font-semibold"><FaUserTie /><p className='mx-0.5'>Your Email</p></span>
          </label>
          <input type="email" placeholder="Email" id='email' className="input input-bordered" value={email} onChange={onChange}/>
        <label className="label">
            <Link to="/sign-in" className="label-text-alt link link-hover">Sign In?</Link>
        </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn text-white" onClick={resetPassword}>Reset Password</button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default ForgotPassword