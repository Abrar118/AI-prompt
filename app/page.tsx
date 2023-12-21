import "@styles/home.css"
import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="home-section">
      <h1 className="header-text">
         Discover and Share
         <br className=" max-md:hidden" />
         <span className="header-span text-center ">AI Powered Prompts</span>
      </h1>

      <p className="sub-header">
         Discover, create and share creative and popular prompts for AI
      </p>

      <Feed />
    </section>
  )
}

export default Home