import {useState, useEffect} from 'react'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Offers() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async ()=> {
            try {
                //get a reference
                const listingsRef = collection(db, 'listings');

                //create a query
                const q = query(listingsRef,
                    where('offer', '==', true),
                    orderBy('timestamp', 'desc'),
                    limit(10) 
                )

                //execute a  query
                const querySnap = await getDocs(q);

                let listings = [];
                querySnap.forEach((doc) => {
                    listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings);
                setLoading(false);
            } catch (e) {
                toast.info("Could'nt Fetch The Data!")
            }
        }

        fetchData();
    }, [])
  return loading ? <Spinner /> : listings && listings.length > 0 ? 
  
    (
    <div className='bg-base-200 p-8'>
        <h1 className='text-4xl font-bold text-center'>Special Offers</h1>
        <div className='grid grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-cols-3 bg-base-200'>
            {
                listings.map((listing) => (
                    <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                ))
            }
        </div>
    </div>
  )

   : (
   <h1 className='h-screen font-bold text-center pt-10'>oops! There are no current offers :(</h1>
   )
}

export default Offers