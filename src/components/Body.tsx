
import CarImg from '../assets/Images/$_86.jpeg'
export default function Body() {
  return (
    <div className='h-screen bg-center overflow-hidden'
    style={{backgroundImage:`url(${CarImg})`,backgroundSize:'cover',backgroundPosition:'center', backgroundRepeat:'no-repeat', height:'80vh',overflow:'hidden'}}>
      {/* <h1 className='welcome note'>
        <strong>Find cars for hire in Nairobi and the rest of Kenya</strong>
      </h1> */}
    </div>
  )
}
