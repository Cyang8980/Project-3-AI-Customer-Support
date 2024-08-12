'use client'

import { Box, Button, Stack, TextField, Avatar, Typography } from '@mui/material'
import { useState } from 'react'
import {useRef, useEffect } from'react';


export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true)

  setMessage('')
  setMessages((messages) => [
    ...messages,
    { role: 'user', content: message },
    { role: 'assistant', content: '' },
  ])

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break;
      
      const text = decoder.decode(value, { stream: true })
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          { ...lastMessage, content: lastMessage.content + text },
        ]
      })
    }
  }
  catch (error) {
    console.error('Error:', error)
    setMessages((messages) => [
      ...messages,
      { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
    ])
  }
    // Send the message to the server
    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader()  // Get a reader to read the response body
      const decoder = new TextDecoder()  // Create a decoder to decode the response text
  
      let result = ''
      // Function to process the text from the response
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true })  // Decode the text
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]  // Get the last message (assistant's placeholder)
          let otherMessages = messages.slice(0, messages.length - 1)  // Get all other messages
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },  // Append the decoded text to the assistant's message
          ]
        })
        return reader.read().then(processText)  // Continue reading the next chunk of the response
      })
    })
  }

  return (
    <Box
      bgcolor="white"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
    <Box

    width= "100%"
    bgcolor= "black"
    p={2}
    textAlign='center'
    Position="fixed"
    left={0}
    top={0}
    zIndex={1}
    >
 
      <Typography varaint="h4" component="h1">
        Headstart AI
      </Typography>
    </Box>
      <Stack
      bgcolor= "black"
        direction={'column'}
        width="500px"
        height="700px"
        border="3px solid black"
        p={2}
        spacing={3}
        sx={{boxShadow: 3}}
      >
      
        <Stack
        bgcolor= "black"
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
         
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              {message.role === 'assistant' ? (
                <img
                  src="chat.jpg"
                  alt="AI Profile"
                  style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
                />
              ) : (
                <img
                  src="/path-to-your-customer-profile-pic.jpg"
                  alt="Customer Profile"
                  style={{ width: 40, height: 40, borderRadius: '50%', marginLeft: 10 }}
                />
              )}

              
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
          sx={{bgcolor: 'white', borderRadius:1}}
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}