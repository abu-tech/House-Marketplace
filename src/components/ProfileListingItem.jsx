import {Link} from 'react-router-dom'
import {AiTwotoneDelete} from 'react-icons/ai'

function ProfileListingItem({listing, id, onDelete}) {
  return (
    <div className="card card-compact card-side w-72 md:w-80 h-36 bg-base-100 hover:shadow-xl transition duration-150 ease-out hover:ease-in">
    <div className="flex-row items-center card-body">
        <div className='w-60 md:w-72'>
            <h2 className="card-title font-bold">{listing.name}</h2>
            <div className='flex justify-between'>
                <Link to={`/category/${listing.type}/${id}`} className="btn btn-outline mt-3">View</Link>
                <button type='button' className='btn btn-circle btn-outline mt-3' onClick={() => onDelete(id)}><AiTwotoneDelete /></button>
            </div>
        </div>
    </div>
</div>
  )
}

export default ProfileListingItem