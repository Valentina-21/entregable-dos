
import loadingGif from '/images/loading.gif'

const Loader = () => {
  return (
    <div className='loader'>
       <img className='loader__img' src={loadingGif} alt="Loading..." />
    </div> 
  )
};

export default Loader
