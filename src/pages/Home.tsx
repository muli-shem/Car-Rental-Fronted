
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
// import { Container } from 'lucide-react'
import ExploreFleet from '../Fleet/ExploreFleet'
import FAQAndInfo from './Fqs'
const Home = () => {
  return (
    <div>
       <Navbar/>
       {/* <Container className="bg-base-200 grid grid-cols-1  place-items-center min-h-screen max-h-full">
      <Body/>
      </Container> */}
       <Body/>
       <ExploreFleet/>
       <FAQAndInfo/>
       <Footer/>
    </div>
   
  )
}

export default Home
