// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Flex,
//   Text,
//   Input,
//   Button,
//   IconButton,
//   useColorMode,
// } from "@chakra-ui/react";
// import { FaWindowClose } from "react-icons/fa";
// import Cookies from "universal-cookie";

// const ChatInterface = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const { colorMode } = useColorMode();
//   const [hasDisplayedGreeting, setHasDisplayedGreeting] = useState(false);
//   const cookies = new Cookies();
//   const token = cookies.get("token");

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleInputChange = (event) => {
//     setInputMessage(event.target.value);
//   };

//   const handleInputKeyPress = (event) => {
//     if (event.key === "Enter") {
//       sendMessage();
//     }
//   };

//   const sendMessage = async () => {
//     if (inputMessage.trim() === "") {
//       return;
//     }

//     const newMessages = [...messages, { text: inputMessage, isUser: true }];
//     setMessages(newMessages);
//     setInputMessage("");

//     try {
//       const response = await axios.post("https://track-us.vercel.app/chatbot/reply", {
//         message: inputMessage,
//       },
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//       );
//       const botReply = response.data.reply;
//       const updatedMessages = [
//         ...newMessages,
//         { text: botReply, isUser: false },
//       ];
//       setMessages(updatedMessages);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   useEffect(() => {
//     if (isOpen && !hasDisplayedGreeting) {
//       axios
//         .get("https://track-us.vercel.app/chatbot/greet", {
//           headers: {
//             Authorization: token,
//           },
//         })
//         .then((response) => {
//           const botGreeting = response.data;
//           const updatedMessages = [
//             ...messages,
//             { text: botGreeting, isUser: false },
//           ];
//           setMessages(updatedMessages);
//           setHasDisplayedGreeting(true);
//         })
//         .catch((error) => {
//           console.error("Error fetching greeting:", error);
//         });
//     }
//   }, [isOpen, hasDisplayedGreeting]);

//   return (
//     <Box
//       className="chat-interface"
//       position="fixed"
//       bottom="50px"
//       right="20px"
//       zIndex="999"
//       transition="transform 0.3s ease-in-out"
//       transform={`translateY(${isOpen ? "0" : "100%"})`}
//     >
//       <Box
//         className="chat-container"
//         bg={colorMode === "dark" ? "gray.800" : "white"}
//         border="1px"
//         borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
//         borderRadius="5px"
//         width="300px"
//         height="500px"
//         boxShadow="md"
//         display="flex"
//         flexDirection="column"
//       >
//         <Flex
//           className="chat-header"
//           align="center"
//           justify="space-between"
//           padding="10px"
//           bg={colorMode === "dark" ? "gray.700" : "gray.100"}
//           cursor="pointer"
//           onClick={toggleChat}
//         >
//           <Text
//             color={colorMode === "dark" ? "white" : "black"}
//             fontWeight="bold"
//           >
//             ChatBot
//           </Text>
//           <IconButton
//             icon={<FaWindowClose />}
//             onClick={toggleChat}
//             size="sm"
//             color={colorMode === "dark" ? "white" : "black"}
//           />
//         </Flex>
//         <Box className="chat-body" overflowY="auto" padding="10px" flex="1">
//           {messages.map((message, index) => (
//             <Flex
//               key={index}
//               className={`message ${message.isUser ? "user" : "bot"}`}
//               p="5px"
//               m="5px"
//               borderRadius="5px"
//               flexDirection="column" // Align each message's content in a column
//               justifyContent={message.isUser ? "flex-end" : "flex-start"}
//               mb="7px"
//               alignSelf={message.isUser ? "flex-end" : "flex-start"} // Align message container to the right or left
//               // maxWidth="70%" // Limit message container width for better readability
//             >
//               <Text
//                 color={colorMode === "dark" ? "white" : "black"}
//                 bg={message.isUser ? "#1a2b2b" : "#1a1a1a"}
//                 p="8px"
//                 borderRadius="5px"
//                 alignSelf={message.isUser ? "flex-end" : "flex-start"} // Align message content inside container
//               >
//                 {message.text}
//               </Text>
//             </Flex>
//           ))}
//         </Box>
//         {isOpen && (
//           <Flex className="chat-footer" align="center" padding="10px">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={inputMessage}
//               onChange={handleInputChange}
//               onKeyPress={handleInputKeyPress}
//               flex="1"
//               bg={colorMode === "dark" ? "gray.700" : "white"}
//               borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
//               _focus={{
//                 borderColor: colorMode === "dark" ? "gray.400" : "blue.300",
//               }}
//             />
//             <Button
//               onClick={sendMessage}
//               bg={colorMode === "dark" ? "blue.600" : "blue.500"}
//               color="white"
//               ml="2"
//             >
//               Send
//             </Button>
//           </Flex>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ChatInterface;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaWindowClose } from "react-icons/fa";
import { GoDependabot } from "react-icons/go";
import Cookies from "universal-cookie";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { colorMode } = useColorMode();
  const [hasDisplayedGreeting, setHasDisplayedGreeting] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") {
      return;
    }

    const newMessages = [...messages, { text: inputMessage, isUser: true }];
    setMessages(newMessages);
    setInputMessage("");

    try {
      const response = await axios.post(
        "https://track-us.vercel.app/chatbot/reply",
        {
          message: inputMessage,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const botReply = response.data.reply;
      const updatedMessages = [
        ...newMessages,
        { text: botReply, isUser: false },
      ];
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (isOpen && !hasDisplayedGreeting) {
      axios
        .get("https://track-us.vercel.app/chatbot/greet", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const botGreeting = response.data;
          const updatedMessages = [
            ...messages,
            { text: botGreeting, isUser: false },
          ];
          setMessages(updatedMessages);
          setHasDisplayedGreeting(true);
        })
        .catch((error) => {
          console.error("Error fetching greeting:", error);
        });
    }
  }, [isOpen, hasDisplayedGreeting]);

  return (
    <Box
      className="chat-interface"
      position="fixed"
      bottom="5em"
      right="1.5em"
      zIndex="999"
      transition="transform 0.3s ease-in-out"
      transform={`translateY(${isOpen ? "0" : "100%"})`}
    >
      {isOpen ? (
        <Box
          className="chat-container"
          bg={colorMode === "dark" ? "gray.800" : "white"}
          border="1px"
          borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
          borderRadius="5px"
          width="300px"
          height="500px"
          boxShadow="md"
          display="flex"
          flexDirection="column"
        >
          <Flex
            className="chat-header"
            align="center"
            justify="space-between"
            padding="10px"
            bg={colorMode === "dark" ? "gray.700" : "gray.100"}
            cursor="pointer"
            onClick={toggleChat}
          >
            <Text
              color={colorMode === "dark" ? "white" : "black"}
              fontWeight="bold"
            >
              ChatBot
            </Text>
            <IconButton
              icon={<FaWindowClose />}
              onClick={toggleChat}
              size="sm"
              color={colorMode === "dark" ? "white" : "black"}
            />
          </Flex>
          <Box className="chat-body" overflowY="auto" padding="10px" flex="1">
            {messages.map((message, index) => (
              <Flex
                key={index}
                className={`message ${message.isUser ? "user" : "bot"}`}
                p="5px"
                m="5px"
                borderRadius="5px"
                flexDirection="column"
                justifyContent={message.isUser ? "flex-end" : "flex-start"}
                mb="7px"
                alignSelf={message.isUser ? "flex-end" : "flex-start"}
              >
                <Text
                  color={colorMode === "dark" ? "white" : "black"}
                  bg={message.isUser ? (colorMode === "dark" ? "#1a2b2b" : "#E2E8F0") : (colorMode === "dark" ? "#1a1a1a" : "#718096")}
                  p="8px"
                  borderRadius="5px"
                  alignSelf={message.isUser ? "flex-end" : "flex-start"}
                >
                  {message.text}
                </Text>
              </Flex>
            ))}
          </Box>
          {isOpen && (
            <Flex className="chat-footer" align="center" padding="10px">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                flex="1"
                bg={colorMode === "dark" ? "gray.700" : "white"}
                borderColor={
                  colorMode === "dark" ? "gray.600" : "gray.300"
                }
                _focus={{
                  borderColor:
                    colorMode === "dark" ? "gray.400" : "blue.300",
                }}
              />
              <Button
                onClick={sendMessage}
                bg={colorMode === "dark" ? "blue.600" : "blue.500"}
                color="white"
                ml="2"
              >
                Send
              </Button>
            </Flex>
          )}
        </Box>
      ) : (
        <IconButton
          icon={<GoDependabot />}
          size="lg"
          onClick={toggleChat}
          position="absolute"
          bottom="0"
          right="0"
          borderRadius="50%"
          cursor="pointer"
          zIndex="1000"
          colorScheme={"teal"}
          variant="outline"
        />
      )}
    </Box>
  );
};

export default ChatInterface;


