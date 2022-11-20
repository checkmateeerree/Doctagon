import React from 'react'
import Hero from '../components/HomePage/Hero'
import Features from "../components/HomePage/Features"
import CallToAction from '../components/HomePage/CallToAction'
import Diagnoser from '../components/Diagnoser'

const Home = ({isAuthenticated}) => {
    console.log(isAuthenticated)
  return (
    <div> 
        {!isAuthenticated && 
            <>
                <Hero />
                <Features />
                <CallToAction />
            </>
        }
        {isAuthenticated &&
            <>
                <Diagnoser />
            </>
        }
   
    </div>
  )
}

export default Home