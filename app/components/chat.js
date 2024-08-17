"use client" 
import { Box, Stack, TextField, Typography, /* Modal */ } from '@mui/material';
import { POST } from "../api/chat/route";
import { useState } from "react";
import ChatBubble from './chatbubble';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid lightgrey',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
};

export default function Chat() {
    const [conversation, setConversation] = useState([]);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const field = document.getElementById("prompt-field");
    
        const { value } = field;

        const userStamp = new Date().toLocaleTimeString();
    
        field.value = "";
        field.ariaDisabled = true;
    
        const response = await POST({ messages: [...conversation, { role: "user", content: value }]});
        const botStamp = new Date().toLocaleTimeString();

        if (response.ok) {
          const data = await response.json();
          const { content } = data.choices[0].message;
          setConversation([...conversation, { role: "user", content: value, timestamp: userStamp }, { role: "assistant", content, timestamp: botStamp }]);
          document.activeElement.blur();
        } else {
          console.error("Failed to fetch response from model");
        }
    };

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       setImage(e.target.result);
    //       setImageFileName(file.name);
    //     }
    //     reader.readAsDataURL(file);
    // }
    

    return (
        <>
            {/* <Modal
                id={"image-upload-modal"}
                open={imageModalOpen}
                keepMounted
                onClose={e => setImageModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{ ...style, 
                    left: '50%', 
                    position: 'absolute',
                    display: 'flex', 
                    justifyContent: 'center', 
                    top: imageModalOpen ? '50%' : '-50%',
                    alignItems: 'center', 
                    transition: 'top 0.8s cubic-bezier(0.175, -0.885, 0.35, 1.175)'}}
                    borderRadius={"1rem"}
                    visibility={'visible'}>
                    <button type="close" style={{ position: 'relative', left: '50%', top: '-10%', border: 'none', background: 'none', color: 'lightgrey'}}
                        onClick={e => setImageModalOpen(false)}>
                        <i className='fa-solid fa-x' style={{ color: 'lightgrey' }}></i>
                    </button>
                    <Typography
                    variant="h4"
                    sx={{ marginBottom: "1rem", color: "lightgrey" }}
                    >
                    Upload Image
                    </Typography>
                    <input type="file" accept="image/*" onChange={handleImageUpload}/>
                </Box>
            </Modal> */}
        <Box
        height={{ xs: "100%", sm: "70%" }}
        width={{ xs: "100%", sm: "70%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        border={'2px solid lightgrey'}
        borderRadius={'1rem'}
        sx={{
          // bgcolor: "#1E1E3F",
          color: "lightgrey",
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
            border={'2px solid lightgrey'}  
            sx={{
              // bgcolor: "#333366",
              backdropFilter: 'blur(10px)',
              color: "lightgrey",
            }}
          >
            <Stack
              direction={"column"}
              spacing={2}
            >
              {conversation.map((message, index) => {
                // let item;
                // switch (message.role) {
                //   case "user":
                //     item = (
                //     <Box alignSelf="flex-end">
                //       <Box 
                //         key={index}
                //         bgcolor={"rgb(var(--primary-rgb))"}
                //         borderRadius={"0.5rem"}
                //         marginRight={"0.5rem"}
                //         sx={
                //           {
                //             wordWrap: "break-word",
                //             lightgreySpace: "pre-wrap",
                //             color: "black",
                //             alignSelf: "flex-end",
                //           }
                //         }>
                //         <Typography
                //           key={index}
                //           variant="body1"
                //           padding={"0.5rem"}
                //           sx={{
                //             wordWrap: "break-word",
                //             lightgreySpace: "pre-wrap",
                //             color: "black",

                //           }}
                //         >
                //             {message.content}
                //             </Typography>
                //         </Box>
                //         <svg style={{position: "relative", top: "-25px", right: "-69px"}}  xmlns="http://www.w3.org/2000/svg" height="25px"viewBox="0 0 87.621 64.619" fill="none">
                //             <path d="M 55.316 0.008 C 55.472 39.971 58.234 55.576 87.621 64.619 L 0.00 64.619 L 55.316 0.00 Z" fill={"rgb(var(--primary-rgb))"}></path>
                //         </svg>
                //         <Typography
                //             key={index}
                //             variant="caption"
                //             sx={{
                //             color: "lightgrey",
                //             alignSelf: "flex-end",
                //             }}>{message.timestamp}</Typography>
                //     </Box>
                //     );
                //     break;
                //   case "assistant":
                //     item = (<>
                //     <Box alignSelf="flex-start">
                //       <Box
                //         key={index}
                //         bgcolor={"white"}
                //         borderRadius={"0.5rem"}
                //         marginLeft={"0.5rem"}
                //         sx={
                //           {
                //             wordWrap: "break-word",
                //             lightgreySpace: "pre-wrap",
                //             color: "black",
                //             alignSelf: "flex-start",
                //           }
                //         }>
                //         <Typography
                //           key={index}
                //           variant="body1"
                //           padding={"0.5rem"}
                //           sx={{
                //             wordWrap: "break-word",
                //             lightgreySpace: "pre-wrap",
                //             color: "black",
                //           }}
                //         >
                //           {message.content}
                //         </Typography>
                //         </Box>
                //         <svg style={{position: "relative", top: "-25px", left: "-4px"}}  xmlns="http://www.w3.org/2000/svg" height="25px"viewBox="0 0 87.621 64.619" fill="none">
                //                 <path d="M 55.316 0.008 C 55.472 39.971 58.234 55.576 87.621 64.619 L 0.00 64.619 L 55.316 0.00 Z" fill={"white"} transform='scale(-1,1) translate(-87.621, 0)'></path>
                //         </svg>
                //         <Typography
                //             key={index}
                //             variant="caption"
                //             position={"relative"}
                //             // display={"inline"}
                //             sx={{
                //             color: "lightgrey",
                //             left: "0",
                //             }}>{message.timestamp}</Typography>
                //     </Box>
                //     </>);
                //     break;
                //   default:
                //     item = null;
                // }
                return <ChatBubble key={index} message={message} />;
                })}
            </Stack>
          </Box>
          <form label={"prompt"} onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField sx={{
                display: "flex",
                color: "black",
                borderRadius: "0.3rem 0.3rem 0 0",
                border: "2px solid lightgrey",
                borderBottom: "none",
                textarea: { color: "white" },
                backdropFilter: 'blur(10px)',
                padding: '0 0.5rem 0 0.5rem',
              }}
              id="prompt-field"
              // fullWidth
              size="medium"
              multiline={true}
              rows={4}
              type="contained"
              underline="none"
              variant='standard'
              placeholder={"How may I help you?"}
              InputProps={{disableUnderline: true}}
              onFocus={(e) => e.target.value = ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
            <Box
              border={'2px solid lightgrey'}
              sx={{
                // bgcolor: "lightgrey",
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                borderRadius: '0 0 0.3rem 0.3rem',
                backdropFilter: 'blur(10px)',
              }}>
              {/* <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <button type="button" onClick={e => setImageModalOpen(!imageModalOpen)}>
                    <i className='fa-solid fa-image' style={{ fontSize: '1.5rem', padding: '5px'}}></i>
                </button>
                {image && <>
                    <img src={image} alt="image" style={{ width: '50px', height: '50px'}}/>
                    { imageFileName && <span>{imageFileName}</span> }
                  </>}
              </Box> */}
              <button
                type='submit'>
                  <i className='fa-solid fa-paper-plane' style={{ fontSize: '1.5rem', margin: '0.5rem'}}></i>
              </button>
            </Box>
          </form>
        </Stack>
      </Box>
    </>
    )
}