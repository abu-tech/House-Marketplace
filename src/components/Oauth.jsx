import { FaTwitter} from 'react-icons/fa'
import {GrGoogle} from 'react-icons/gr'
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'

function Oauth() {
    const navigate = useNavigate();

    const googleAuth = async ()=> {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            //now saving to firestore
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            
            if(!docSnap.exists()){
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }

            navigate('/');
            toast.success("Welcome!")
        } catch (e) {
            toast.info(e.message);
        }
    }

    const twitterAuth = async ()=> {
        try {
            const auth = getAuth();
            const provider = new TwitterAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user)

            //saving to firestore
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if(!docSnap.exists()){
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }

            navigate('/');
            toast.success("Welcome!");
        } catch (e) {
            console.log(e)
            toast.info(e.message)
        }
    }

  return (
    <>
     <div className="flex items-center my-2 mx-10 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>
      <div className="flex justify-center mb-5">
      <button className="btn btn-circle btn-outline mx-5" onClick={googleAuth}>
          <GrGoogle />
      </button>
      <button className="btn btn-circle btn-outline mx-5" onClick={twitterAuth}>
          <FaTwitter />
      </button>
      </div>
    </>
  )
}

export default Oauth