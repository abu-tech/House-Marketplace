import {useState, useEffect} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import Loader from '../components/Loader'


function Contact() {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(true);

    const params = useParams()

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, 'users', params.landlordId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                setLandlord(docSnap.data())
            }
            else{
                toast.info("Couldn't get the Landlord data!")
            }
            setLoading(false)
        }

        getLandlord()
    }, [params.landlordId])

    const onChange = (e) => setMessage(e.target.value)

    if(loading) return <Loader />

  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">Contact Owner!</h1>
            <p className="py-6">Type in the Message Box your message to the owner and your contact details too, Owner will contact you back.</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Message</span>
                </label>
                <textarea className="textarea textarea-bordered" rows={5} id='message' placeholder="Message" value={message} onChange={onChange}></textarea>
                </div>
                <div className="form-control mt-6">
                    <a type='button' href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`} className="btn btn-outline">Send Message</a>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Contact