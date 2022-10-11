import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from '../firebase.config'
import {v4 as uuid} from 'uuid'
import {useNavigate} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { uuidv4 } from '@firebase/util';


function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    sharing: 'single',
    food: 3,
    images: {},
    latitude: 0,
    longitude: 0
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address ,
    offer,
    regularPrice,
    discountedPrice,
    sharing,
    food,
    images,
    latitude,
    longitude
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if(isMounted){
      onAuthStateChanged(auth, (user) => {
        if(user){
          setFormData({...formData, userRef: user.uid});
        }
        else{
          navigate('/sign-in');
        }
      })
    }

    return () => {
      isMounted.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onMutate = (e) => {
    let boolean = null;

    if(e.target.value === 'true'){
      boolean = true;
    }

    if(e.target.value === 'false'){
      boolean = false;
    }

    //files
    if(e.target.files){
      setFormData((prevState) => ({
        ...prevState, 
        images: e.target.files
      }))
    }

    if(!e.target.files){
      setFormData((prevState) => ({
        ...prevState, 
        [e.target.id]: boolean ?? e.target.value
      }))
    }

}
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(discountedPrice >= regularPrice){
      setLoading(false);
      toast.info("Discounted Price must be smaller than Regular Price!")
      return ;
    }

    if(images.length > 4){
      setLoading(false);
      toast.info("Max 4 Images Only!");
      return ;
    }

    let geolocation ={};
    let location;

    const res = await fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_MAP_API_KEY}&query=${address}`);
    const data = await res.json();

    geolocation.lat = data.data[0]?.latitude ?? 0;
    geolocation.lng = data.data[0]?.longitude ?? 0;
    location = address;

    if(location === undefined || location.includes('undefined')){
      setLoading(false)
      toast.info('Please enter a correct address')
      return
  }
    console.log(data);
    console.log(geolocation.lat, geolocation.lng)

    //store image in firebase
    const storeImg = async (image)=> {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, `images/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            reject(error)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      })
    }

    //now run through loop to get the urls for the all the images
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImg(image))
    ).catch(() => {
      setLoading(false);
      toast.info("Images not uploaded!");
      return;
    })

    console.log(imgUrls)
    setLoading(false)
  }

  if(loading){
    return <Loader />
  }  
  
  return (
    <div className='bg-base-200'>
        <form className='flex justify-center py-12 px-5' onSubmit={onSubmit}>
        <div className="card flex flex-shrink-0 w-full max-w-sm shadow-lg bg-base-100 md:max-w-xl">
        <h1 className='text-4xl font-bold text-center pt-5'>Create Listing</h1>
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <div>
              <button type='button' className={type === 'rent' ? "btn btn-active text-white mr-3" : "btn btn-ghost bg-base-200 mr-3"} id='type' value='rent' onClick={onMutate}>Rent</button>
              <button type='button' className={type === 'sale' ? "btn btn-active text-white mx-3" : "btn btn-ghost bg-base-200 mx-3"} id='type' value='sale' onClick={onMutate}>Sell</button>
              <button type='button' className={type === 'pg' ? "btn btn-active text-white mx-3" : "btn btn-ghost bg-base-200 mx-3"} id='type' value='pg' onClick={onMutate}>PG</button>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input type="text" placeholder="Name" id='name' className="input input-bordered font-semibold" value={name} onChange={onMutate} maxLength='30' required/>
          </div>
          {type === 'pg' && (
            <div className='flex flex-col md:flex-row'>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Sharing</span>
              </label>
              <input type="text" id='sharing' className="input input-bordered font-semibold w-1/3 md:w-1/2" value={sharing} onChange={onMutate} required/>
            </div>
            <div className="form-control md:ml-12">
                <label className="label">
                  <span className="label-text font-semibold">Food</span>
                </label>
                <div className='flex'>
                <input type="number" id='food' className="input input-bordered w-1/4 font-semibold" value={food} onChange={onMutate} required minLength='1' maxLength='50'/>
                <p className='font-semibold flex items-center ml-3'>Times / Day</p>
                </div>
            </div>
            </div>
          )}
          <div className='flex'>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Bedrooms</span>
              </label>
              <input type="number" id='bedrooms' className="input input-bordered w-1/3 font-semibold" value={bedrooms} onChange={onMutate} required minLength='1' maxLength='50'/>
            </div>
            <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Bathrooms</span>
            </label>
            <input type="number" id='bathrooms' className="input input-bordered w-1/3 font-semibold" value={bathrooms} onChange={onMutate} required minLength='1' maxLength='50'/>
            </div>
          </div>
          <div className='flex flex-col md:flex-row'>
          <div className="form-control my-1">
            <label className="label">
              <span className="label-text font-semibold">Parking Area</span>
            </label>
            <div>
              <button type='button' className={parking ? "btn btn-active text-white" : "btn btn-ghost bg-base-200"} id='parking' value={true} onClick={onMutate}>Yes</button>
              <button type='button' className={!parking ? "btn btn-active text-white mx-3" : "btn btn-ghost bg-base-200 mx-3"} id='parking' value={false} onClick={onMutate}>No</button>
            </div>
          </div>
          <div className="form-control my-1 md:ml-5">
            <label className="label">
              <span className="label-text font-semibold">Furnished</span>
            </label>
            <div>
              <button type='button' className={furnished ? "btn btn-active text-white" : "btn btn-ghost bg-base-200"} id='furnished' value={true} onClick={onMutate}>Yes</button>
              <button type='button' className={!furnished ? "btn btn-active text-white mx-3" : "btn btn-ghost bg-base-200 mx-3"} id='furnished' value={false} onClick={onMutate}>No</button>
            </div>
          </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Address</span>
            </label>
            <textarea className="textarea textarea-bordered h-24 font-semibold" id="address" value={address} placeholder="Address" onChange={onMutate} required></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Offer</span>
            </label>
            <div>
              <button type='button' className={offer ? "btn btn-active text-white" : "btn btn-ghost bg-base-200"} id='offer' value={true} onClick={onMutate}>Yes</button>
              <button type='button' className={!offer ? "btn btn-active text-white mx-3" : "btn btn-ghost bg-base-200 mx-3"} id='offer' value={false} onClick={onMutate}>No</button>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Regular Price</span>
            </label>
            <div className='flex'>
              <input type="number" id='regularPrice' className="input input-bordered w-1/3 font-semibold" value={regularPrice} onChange={onMutate} required minLength='500' maxLength='1000000000'/>
              {(type === 'rent' || type === 'pg') && <p className='font-semibold flex items-center mx-2'> <FaRupeeSign /> / Month</p>}
            </div>
          </div>
          {offer && (
            <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Discounted Price</span>
            </label>
            <div className='flex'>
              <input type="number" id='discountedPrice' className="input input-bordered w-1/3 font-semibold" value={discountedPrice} onChange={onMutate} required minLength='500' maxLength='1000000000'/>
              {(type === 'rent' || type === 'pg') && <p className='font-semibold flex items-center mx-2'> <FaRupeeSign /> / Month</p>}
            </div>
          </div>
          )}
          <div className="form-control flex justify-center">
            <label className="label">
              <span className="label-text font-semibold">Images (Max: 4)</span>
            </label>
            <input className="
            formInputFile
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0" 
            type="file" id="images" max='6'accept='.jpg,.png,.jpeg' onChange={onMutate} multiple></input>
          </div>
          <div className="form-control mt-6">
            <button type='submit' className="btn text-white">Create Listing</button>
          </div>
        </div>
      </div>
      </form>
    </div>
  )
}

export default CreateListing