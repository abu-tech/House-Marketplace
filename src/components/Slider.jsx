import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {collection, getDocs, query, orderBy, limit} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import Loader from './Loader';

function Slider() {
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const listingRef = collection(db, 'listings');
                const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
                const querySnap = await getDocs(q);

                let listings = [];
                querySnap.forEach((doc) => {
                    listings.push({
                        id: doc.id, 
                        data: doc.data()
                    })
                })

                setListing(listings);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e)
                toast.info("Something went wrong!")
            }
        }
        fetchListing();

    }, [])

    if(loading){
        return <Loader />
    }

  return (listing &&
    <>
        <Swiper
           slidesPerView={1}
           pagination={{clickable: true}}
           style={{ height: '300px', width: '90%' }}
           modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
           navigation
           autoplay={{
            delay: 2000,
            disableOnInteraction: false,
           }}
           >
            {
              listing.map(({id, data}) => (
                  <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                    <div className='swiperSlideDiv mt-5' style={{background: `url(${data.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}}>
                        <p className='swiperSlideText'>{data.name}</p>
                        <p className='swiperSlidePrice'>{data.discountedPrice ?? data.regularPrice}{data.type === 'rent' && ' / Month'}</p>
                    </div>
                  </SwiperSlide>
              ))
            }
        </Swiper>
    </>
  )
}

export default Slider