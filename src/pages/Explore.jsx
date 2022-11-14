import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import pgCategoryImage from '../assets/jpg/pgCategoryImage.jpg'
import Slider from '../components/Slider'

function Explore() {
  return (
  <div className='bg-base-200'>
    <h1 className='text-2xl font-bold text-center pt-5'>Explore Categories</h1>
    <Slider />
    <div className='flex flex-col items-center bg-base-200 lg:flex-row lg:justify-center'>  
      <div className="card w-80 bg-base-100 image-full mt-10 mx-20 mb-5 shadow-2xl md:w-96 md:m-10 hover:shadow-none transition duration-150 ease-out hover:ease-in">
        <figure><img src={rentCategoryImage} alt="img" /></figure>
        <div className="card-body">
          <h2 className="card-title">Flats for Rent!</h2>
          <p>Service to others is the rent you pay for your room here on earth</p>
          <div className="card-actions justify-end">
            <Link to='/category/rent' className="btn btn-outline text-white">Explore</Link>
          </div>
        </div>
      </div>
      <div className="card w-80 bg-base-100 image-full mt-10 mx-20 mb-5 shadow-2xl md:w-96 md:m-10 hover:shadow-none transition duration-150 ease-out hover:ease-in">
        <figure><img src={sellCategoryImage} alt="img" /></figure>
        <div className="card-body">
          <h2 className="card-title">Flats for Sale!</h2>
          <p>The magic thing about home is that it feels good to leave, and it feels even better to come back</p>
          <div className="card-actions justify-end">
            <Link to='/category/sale' className="btn btn-outline text-white">Explore</Link>
          </div>
        </div>
      </div>
      <div className="card w-80 bg-base-100 image-full mt-10 mx-20 mb-10 shadow-2xl md:w-96 md:m-10 hover:shadow-none transition duration-150 ease-out hover:ease-in">
        <figure><img src={pgCategoryImage} alt="img" /></figure>
        <div className="card-body">
          <h2 className="card-title">Looking for Paying Guest?!</h2>
          <p>Looking for an home like environment including food and all?</p>
          <div className="card-actions justify-end">
            <Link to='/category/pg' className="btn btn-outline text-white">Explore</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Explore
