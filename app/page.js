"use client"

import { Box, Stack, TextField, Typography } from '@mui/material';
import { POST } from "./api/chat/route";
import { useState } from "react";

export default function Home() {
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const field = document.getElementById("prompt-field");

    const { value } = field;

    field.value = "";
    field.ariaDisabled = true;

    const response = await POST([...conversation, { role: "user", content: value }]);

    if (response.ok) {
      const data = await response.json();
      const { content } = data.choices[0].message;
      setConversation([...conversation, { role: "user", content: value }, { role: "assistant", content }]);
    } else {
      console.error("Failed to fetch response from model");
    }
  };

  return (
    <Box
      component={"main"}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        bgcolor: "#000000", // Dark blue background for the entire page
        color: "white",      // White text for the entire page
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: "1rem", color: "white" }} // Ensure the title text is white
      >
        AI Customer Support
      </Typography>

      <Box
        height={{ xs: "100%", sm: "70%" }}
        width={{ xs: "100%", sm: "70%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        border={1}
        borderRadius={'1rem'}
        sx={{
          bgcolor: "#1E1E3F", // Slightly lighter dark blue for the inner box
          color: "white",      // White text inside the inner box
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          width="100%"
          padding={2}
        >
          <Box
            overflow={"auto"}
            height={"500px"}
            width={"100%"}
            padding={2}
            borderRadius={"0.5rem"}
            border={1}
            sx={{
              bgcolor: "#333366", // Darker background for the conversation area
              color: "white",      // White text for the conversation
            }}
          >
            <Stack
              direction={"column"}
              spacing={2}
            >
              {conversation.map((message, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    color: "white", // Ensure the conversation text is white
                  }}
                >
                  {message.content}
                </Typography>
              ))}
            </Stack>
          </Box>
          <form label={"prompt"} onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              id="prompt-field"
              fullWidth
              sx={{
                bgcolor: "white", // White background for the input field
                borderRadius: "0.3rem",
                input: { color: "black" }, // Black text for the input field
              }}
              type="contained"
              defaultValue={"How may I help you?"}
              onFocus={(e) => e.target.value = ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
            <input type="submit" value="Submit" style={{ display: 'none' }} />
          </form>
        </Stack>
      </Box>
    </Box>
  );
}
