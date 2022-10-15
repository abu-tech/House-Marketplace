import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {getAuth} from 'firebase/auth'
import Loader from '../components/Loader'
import {RiHotelBedFill} from 'react-icons/ri'
import {IoLocationSharp, IoFastFood} from 'react-icons/io5'
import {FaRupeeSign} from 'react-icons/fa'
import {MdBathtub, MdLocalParking} from 'react-icons/md'
import {GiSofa} from 'react-icons/gi'
import {BsPeopleFill, BsShareFill} from 'react-icons/bs'
import {toast} from 'react-toastify'

function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();
    const params = useParams();
    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setListing(docSnap.data());
                setLoading(false);
            }
        }

        fetchListing();
    }, [params.id]);

    const handleShare = () => { 
      navigator.clipboard.writeText(window.location.href)
      toast.info("Link Copied!")
    }

    if(loading){
      return <Loader />
    }

  return (
    <div className='p-12 bg-base-100 grid grid-cols-1 lg:grid-cols-2 lg:gap-2'>
      <div className='bg-base-100 h-screen'>
        <div className='card-body'>
          <div className='flex justify-between'><h1 className='font-bold text-md sm:text-2xl '>{listing.name}</h1><button type='button' className="btn btn-circle btn-outline" onClick={handleShare}><BsShareFill /></button>
          </div>
          <div className='flex flex-end mb-5'>
          <span className="badge mr-2 text-xs sm:text-sm"><FaRupeeSign/>{listing.offer ? listing.regularPrice-listing.discountedPrice : 'No'} Discount</span>
          <span className="badge badge-accent mx-2 text-xs sm:text-sm">For {listing.type[0].toUpperCase()+listing.type.slice(1)}</span>
          </div>
          <span className="flex justify-start font-semibold"><IoLocationSharp /><p className='mx-2'>{listing.location}</p></span>
          <span className="flex font-semibold"><RiHotelBedFill /><p className='mx-2'>{listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}</p></span>
          <span className="flex font-semibold"><MdBathtub /><p className='mx-2'>{listing.bathrooms} {listing.bathrooms > 1 ? 'bathrooms' : 'Bathroom'}</p></span>
          {listing.type === 'pg' && <span className="flex justify-start font-semibold"><BsPeopleFill /><p className='mx-2'>{listing.sharing[0].toUpperCase()+listing.sharing.slice(1)} Sharing</p></span>}
          {listing.type === 'pg' && <span className="flex justify-start font-semibold"><IoFastFood /><p className='mx-2'>Food {listing.food} Times / Day</p></span>}
          {listing.parking ? <span className="flex font-semibold"><MdLocalParking /><p className='mx-2'>Parking Available</p></span> : <span className="flex font-semibold"><MdLocalParking /><p className='mx-2'>Parking not Available</p></span>}
          {listing.furnished ? <span className="flex font-semibold"><GiSofa /><p className='mx-2'>Furnished</p></span> : <span className="flex font-semibold"><MdLocalParking /><p className='mx-2'>Not Furnished</p></span>}
          <span className="flex justify-start font-semibold"><FaRupeeSign /><p className='mx-2'>{listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 
          listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{listing.type === 'rent' ? ' / Month' : ''}</p></span>
          {auth.currentUser?.uid !== listing.userRef && (
            <div className="card-actions my-2">
              <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className="btn btn-outline">Contact Owner</Link>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* map */}
        map and images
      </div>
    </div>
  )
}

export default Listing