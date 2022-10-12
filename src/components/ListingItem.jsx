import { Link } from "react-router-dom"
import {RiHotelBedFill} from 'react-icons/ri'
import {IoLocationSharp} from 'react-icons/io5'
import { FaRupeeSign} from 'react-icons/fa'
import {MdBathtub} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'

function ListingItem({listing, id, onDelete}) {
  return (
    <div className="card card-compact w-80 bg-base-100 m-8 md:w-96 hover:shadow-2xl transition duration-150 ease-out hover:ease-in">
            <figure><img src={listing.imageUrls[0]} alt={listing.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{listing.name}</h2>
                <span className="flex justify-start font-semibold"><IoLocationSharp /><p className='mx-2'>{listing.location}</p></span>
                <span className="flex font-semibold"><RiHotelBedFill /><p className='mx-2'>{listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}</p></span>
                <span className="flex font-semibold"><MdBathtub /><p className='mx-2'>{listing.bathrooms} {listing.bathrooms > 1 ? 'bathrooms' : 'Bathroom'}</p></span>
                <span className="flex justify-start font-semibold"><FaRupeeSign /><p className='mx-2'>{listing.offer ? listing.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : listing.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{listing.type === 'rent' ? ' / Month' : ''}</p></span>
                <div className="card-actions justify-end">
                    <Link to={`/category/${listing.type}/${id}`} className="btn text-white">View Details</Link>
                    {onDelete && (<button className="btn btn-square"><AiTwotoneDelete /></button>)} 
                </div>
            </div>
    </div>
  )
}

export default ListingItem