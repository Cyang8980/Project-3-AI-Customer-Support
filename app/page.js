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
        bgcolor: "#000000",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: "1rem", color: "white" }}
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
          bgcolor: "#1E1E3F",
          color: "white",
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
              bgcolor: "#333366",
              color: "white",
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
                    color: "white",
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
                bgcolor: "white",
                borderRadius: "0.3rem",
                input: { color: "black" },
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
