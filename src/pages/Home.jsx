
import BannerSection from '../components/Home/BannerSection'
import HolidayPackages from '../components/Home/HolidayPackages'
import PopularExperiences from '../components/Home/PopularExperiences'
import TopAttractions from '../components/Home/TopAttractions'
import TopCities from '../components/Home/TopCities'
import TopThingsToDo from '../components/Home/TopThingsToDo'
import TravelInspiration from '../components/Home/TravelInspiration'
import UAEVisaServices from '../components/Home/UAEVisaServices'

function Home() {
  return (
    <>
    <BannerSection />
    <TopCities />
    <TopAttractions />
    <HolidayPackages />
    <PopularExperiences />
    <UAEVisaServices />
    <TravelInspiration />
    <TopThingsToDo />
    </>
  )
}

export default Home
