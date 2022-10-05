import {getAuth, updateProfile, updateEmail} from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import{useState} from 'react';
import {FaUserTie, FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
 
function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);
  const auth = getAuth();
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const {name,email} = userData;

  const handleEdit = ()=> {
    setChangeDetails(!changeDetails);
  }

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const updateDetails = async ()=> {
    try {
      //update profile
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      }
      //update Email
      if(auth.currentUser.email !== email){
        await updateEmail(auth.currentUser, email)
      }
      //update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name: name,
        email: email
      })
      setChangeDetails(!changeDetails);
      toast.success("Profile Updated")
    } catch (e) {
      console.log(e);
      toast.info("Could'nt update the Details!")
    }
  }

    return(
<div className="h-screen bg-base-200">
  <div className="bg-base-200"><h1 className="font-bold text-4xl text-center pt-5">My Profile</h1></div>
  <div className="hero-content flex-col lg:flex-row-reverse mt-5">
  <div className="text-center lg:text-left">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
  </div>
  <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <h1 className='font-bold text-center mb-3'>Personal Details</h1>
        <div className="form-control">
          <label className="label">
          <span className="label-text flex justify-start font-semibold"><FaUser /><p className='mx-0.5'>Name</p></span>
          </label>
          <input type="text" placeholder="Name" id='name' className={changeDetails ? "input input-bordered" : "input input-bordered disabled:opacity-75"} disabled={!changeDetails} onChange={onChange} value={name}/>
        </div>
        <div className="form-control">
          <label className="label">
          <span className="label-text flex justify-start font-semibold"><FaUserTie /><p className='mx-0.5'>Email</p></span>
          </label>
          <input type="email" placeholder="Email" id='email' className={changeDetails ? "input input-bordered" : "input input-bordered disabled:opacity-75"} disabled={!changeDetails} onChange={onChange} value={email}/>
        </div>
        <div className="flex-row justify-between form-control mt-6">
          <button className="btn text-white" onClick={handleEdit}>{changeDetails ? 'Cancel' : 'Edit'}</button>
          <button className={changeDetails ? "btn btn-ghost text-black bg-base-200" : "btn btn-ghost text-white hidden"} onClick={updateDetails}>Save Details</button>
        </div>
      </div>
    </div>
  </div>
</div>
    )
  }

  export default Profile