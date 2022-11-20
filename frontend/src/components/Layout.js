import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/layout";
import {useEffect, useState} from 'react'

function Layout({ children }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />
        <Box pt="100px" bgColor="white">{children}</Box>
      <Footer />
    </div>
  );
}

export default Layout;
