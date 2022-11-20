import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/layout";
import {useEffect, useState} from 'react'

function Layout({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false)
    useEffect(() => {
       if (localStorage.getItem("SESSION_ID")){
            setAuthenticated(true)
       } else {
            setAuthenticated(false)
       }
    }, [])
  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar isAuthenticated={isAuthenticated}/>
        <Box pt="100px" bgColor="white">{children}</Box>
      <Footer />
    </div>
  );
}

export default Layout;
