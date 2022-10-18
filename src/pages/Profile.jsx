import {getAuth, updateProfile, updateEmail} from 'firebase/auth';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import{useState, useEffect} from 'react';
import {FaUserTie, FaUser, FaHome} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import ProfileListingItem from '../components/ProfileListingItem';
import { getStorage, ref, deleteObject } from "firebase/storage";
 
function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const auth = getAuth();
  const [userData, setUserData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const navigate = useNavigate();

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

  const onDelete = async (listingId) => {
    const storage = getStorage();
    const imagesToDelete = listings.filter((listing) => listing.id === listingId);
    const imagesArray = imagesToDelete[0].data.imageUrls;

    imagesArray.forEach((urlToDelete) => {
      //Get the filename from the upload URL
      let fileName = urlToDelete.split('/').pop().split('#')[0].split('?')[0];
      // Replace "%2F" in the URL with "/"
      fileName = fileName.replace('%2F', '/');

      const imageToDeleteRef = ref(storage, `${fileName}`);

      //Delete the file
      deleteObject(imageToDeleteRef)
        .catch((error) => {
          console.log(error)
          toast.error('Failed to delete images');
        });
    });

    try {
      setLoading(true)
      const docRef = doc(db, 'listings', listingId);
      await deleteDoc(docRef);
      const updatedListings = listings.filter((listing) => listing.id !== listingId);
      setLoading(false);
      setListings(updatedListings);
      toast.success("Sucessfully deleted!")
    } catch (e) {
      toast.info("Something Went Wrong!")
    }
  }

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')

        const q = query(
          listingsRef,
          where('userRef', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc')
        )

        const querySnap = await getDocs(q)

        let listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (e) {
        setLoading(false);
        toast.info("Something Went Wrong!")
      }
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

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

  if(loading){
    return <Loader />
  }

    return(
        <div className="min-h-screen bg-base-200">
          <div className="bg-base-200"><h1 className="font-bold text-2xl text-center pt-5 md:text-4xl">My Profile And Listings</h1></div>
          <div className="px-10 flex flex-col items-center lg:flex-row mt-5">
            <div className="card flex-shrink-0 w-full max-w-sm mb-8 shadow-xl bg-base-100 lg:ml-0">
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
                  <div className='mt-7 flex justify-center'>
                    <Link to='/create-listing' className='btn btn-ghost text-black bg-base-200 w-full'><span className='flex'><FaHome /><p className='mx-2'>Sell or Rent</p></span></Link>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:mx-10 xl:grid-cols-3 ">
                {(!loading && listings?.length > 0) ? (
                  <>
                    {listings.map((listing) => (
                      <ProfileListingItem
                      key={listing.id}
                      id={listing.id}
                      listing={listing.data}
                      onDelete={() => onDelete(listing.id)}
                      onEdit={() => onEdit(listing.id)}
                      />
                    ))}
                  </>
                ) : (
                    <h1 className='text-2xl font-bold'>No Listings!</h1>
                )}
              </div>
          </div>
        </div>
    )
  }

  export default Profile