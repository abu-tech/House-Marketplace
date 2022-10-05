import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import pgCategoryImage from '../assets/jpg/pgCategoryImage.jpg'


function Explore() {
  return (
  <div className='h-screen bg-base-200'>
  <div className='flex flex-col items-center bg-base-200 lg:flex-row lg:justify-center'>  
  <div className="card w-80 bg-base-100 shadow-lg image-full mt-10 mx-20 mb-5 md:w-96 md:m-10">
    <figure><img src={rentCategoryImage} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <Link className="btn btn-outline text-white">Explore</Link>
      </div>
    </div>
  </div>
  <div className="card w-80 bg-base-100 shadow-lg image-full mt-10 mx-20 mb-5 md:w-96 md:m-10">
    <figure><img src={sellCategoryImage} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <Link className="btn btn-outline text-white">Explore</Link>
      </div>
    </div>
  </div>
  <div className="card w-80 bg-base-100 shadow-lg image-full mt-10 mx-20 mb-10 md:w-96 md:m-10">
    <figure><img src={pgCategoryImage} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div className="card-actions justify-end">
        <Link className="btn btn-outline text-white">Explore</Link>
      </div>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Explore