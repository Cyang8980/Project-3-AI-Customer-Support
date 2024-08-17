import { Box, Typography } from "@mui/material";

export default function ChatBubble({ message, index }) {

    let options = { };

    switch (message.role) {
        case "user":
            options.alignSelf = "flex-end";
            options.bgcolor = "rgb(var(--primary-rgb))";
            options.flexDirection = "row";
            options.right= "-21.1px";
            options.svg = { fill: "rgb(var(--primary-rgb))" };
          break;
        case "assistant":
            options.alignSelf = "flex-start";
            options.bgcolor = "white";
            options.flexDirection = "row-reverse";
            options.left= "-21.1px";
            options.svg = { fill: "white" };
            options.svg.transform = 'scale(-1,1) translate(-87.621, 0)';
        break;
    }


    return (
        <Box alignSelf={options.alignSelf}
            display={'flex'}
            flexDirection={'column'}
            alignItems={options.alignSelf}>
            <Box 
                display={"flex"}
                flexDirection={options.flexDirection}
                alignItems={"flex-end"}
                marginRight={"0.5rem"}
                marginLeft={"0.5rem"}>
                <Box 
                    position={"relative"}
                    key={index}
                    bgcolor={options.bgcolor}
                    borderRadius={"0.5rem"}
                    left={options.left}
                    right={options.right}
                    width={"fit-content"}
                    height={"fit-content"}
                sx={
                    {
                        wordWrap: "break-word",
                        color: "black",
                    }
                }>
                <Typography
                    key={index}
                    variant="body1"
                    padding={"0.5rem"}
                    sx={{
                        wordWrap: "break-word",
                        color: "black",
                    }}
                >
                    {message.content}
                    </Typography>
                </Box>
                <svg style={options.svg.style} xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 87.621 64.619" fill="none">
                    <path d="M 55.316 0.008 C 55.472 39.971 58.234 55.576 87.621 64.619 L 0.00 64.619 L 55.316 0.00 Z" fill={options.svg.fill} transform={options.svg.transform}></path>
                </svg>
            </Box>
          <Typography
              key={index}
              variant="caption"
              marginTop={'0.25rem'}
              sx={{
              color: "lightgrey",
              }}>{message.timestamp}</Typography>
      </Box>
    )
}