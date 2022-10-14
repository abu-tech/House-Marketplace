import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {getAuth} from 'firebase/auth'
import Loader from '../components/Loader'
import { async } from '@firebase/util'

function Listing() {
    const [Listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

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
  return (
    <div>Listing</div>
  )
}

export default Listing