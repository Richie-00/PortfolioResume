import Navigation from "../components/Navigation"
import Header from "../components/Header"
import Links from "../components/Links"
import Skill from "../components/Skill"
import Footer from "../components/Footer"
import Project from "../components/Image"
import Loading from '../components/Loading'
function Home() {
  return (
    <div>
      <Loading />
        <Navigation />  
        <Links />
        <Header />
        <Skill />
        <Project/>
       <Footer />
    </div>
  )
}

export default Home