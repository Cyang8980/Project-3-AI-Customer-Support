"use client"

import { Box, Typography } from '@mui/material';
import { useEffect } from "react";
import Backdrop from './components/backdrop';
import Chat from './components/chat';


export default function Home({ theme }) {

  useEffect(() => {
    const fascript = document.createElement("script");
    fascript.src = "https://kit.fontawesome.com/6f87d9c6a8.js";
    fascript.crossOrigin = "anonymous";
    document.head.appendChild(fascript);
  },[]);

  return (
    <>
    <Box
      component={"main"}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        // bgcolor: "#000000",
        color: "lightgrey",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: "1rem", color: "lightgrey" }}
      >
        AI Customer Support
      </Typography>
        <Chat/>
      {/* <Backdrop/> */}
    </Box>
    </>
  );
}
