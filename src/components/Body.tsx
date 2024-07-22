
import CarImg from '../assets/Images/$_86.jpeg';
 // Adjust the path as needed

export default function Body() {
  return (
    <div
      className='relative h-screen overflow-hidden'
      style={{
        backgroundImage: `url(${CarImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '80vh',
        overflow: 'hidden'
      }}
    >
      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn'>
        <h1 className='text-white text-3xl md:text-5xl font-bold text-center px-4'>
          Find cars for hire in Nairobi and the rest of Kenya
        </h1>
      </div>
      <div className='absolute inset-0 animate-zoomIn'></div>
    </div>
  );
}
