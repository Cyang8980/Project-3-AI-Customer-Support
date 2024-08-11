"use client"

import { Box, Stack, TextField } from '@mui/material'
import { POST } from "./api/chat/route";
import { useState } from "react";


export default function Home() {
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const field = document.getElementById("prompt-field")

    const { value } = field;

    field.value = "";
    field.ariaDisabled = true;

    const response = await POST([...conversation, {role:"user", content:value}]);

    if(response.ok) {
      const data = await response.json();

      const { content } = data.choices[0].message;
      setConversation([...conversation, {role: "user", content: value}, { role: "assistant", content }]);
    }
    else {
      console.error("Failed to fetch response from model");
    }
  }

  return (
      <Box
        component={"main"}
        height={"100vh"}
        width={"100vw"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        >
        <Box
          height={{ xs: "100%", sm: "50%" }}
          width={{ xs: "100%", sm: "50%" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          border={1}
          borderRadius={'1rem'}
          sx={{
            bgcolor: "rgb(50, 50, 255, 0.2)",
          }}>     
          <Stack
            direction={"column"}
            spacing={2}>
            <Box
              overflow={"auto"}>
              <Stack
                direction={"column"}
                height={"500px"}
                spacing={2}
                overflow={"auto"}>
                  { conversation.map((message, index) => { return <Box key={index}><p>{message.content}</p></Box> })}
              </Stack>
            </Box>
            <form label={"prompt"} onSubmit={handleSubmit}>
              <TextField
                id="prompt-field"
                width={"100%"}
                sx={{
                  display: "flex",
                  width: "100%",
                  bgcolor: "white",
                  borderRadius: "0.3rem",
                }}
                type="contained"
                defaultValue={"How may I help you?"}
                // onChange={(e) => setPrompt(e.target.value)}
                onFocus={(e) => e.target.value = ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                }}}>
              </TextField>
                <input type="submit" value="Submit"></input>
            </form>
          </Stack>
        </Box>
      </Box>
  );
}

