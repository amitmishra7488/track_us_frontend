import React, {  useState, useEffect } from "react";
import { FaMicrophone, FaMicrophoneAltSlash } from "react-icons/fa";
import { Box, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Chitti = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const commands = [
    {
      command: "open *",
      callback: (page) => {
        navigate(page.toLowerCase());
        handleCommandExecution();
      },
    },
    {
      command: "switch to *",
      callback: () => {
        toggleColorMode();
        handleCommandExecution();
      },
    },
    {
      command: "reset",
      callback: () => {
        handleCommandExecution();
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (transcript) {
      setShowTranscript(true);
      const timeoutId = setTimeout(() => {
        setShowTranscript(false);
        handleReset();
        stopHandle();
      }, 5000); // Adjust the time (in milliseconds) based on your preference

      return () => clearTimeout(timeoutId);
    }
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <Box>Browser does not support Speech Recognition.</Box>;
  }

  const handleListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    resetTranscript();
  };

  const handleCommandExecution = () => {
    handleReset(); // Reset transcript immediately after command execution
    setShowTranscript(false); // Hide the transcript
  };
  const boxShadowColor = colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)';

  const boxShadowStyle = {
    boxShadow: `0 4px 6px ${boxShadowColor}`,
  };

  return (
    <>
      <Flex
        position="fixed"
        bottom="5em"
        right="5em"
        zIndex="900"
        transition="transform 0.3s ease-in-out"
        gap="0.2em"
      >
        <IconButton
          icon={isListening ? <FaMicrophoneAltSlash /> : <FaMicrophone />}
          size="lg"
          onClick={isListening ? stopHandle : handleListening}
          aria-label={isListening ? "Stop Listening" : "Start Listening"}
          colorScheme={isListening ? "red" : "teal"}
          variant="outline"
        />
        <motion.div
          animate={{
            translateY: isListening ? [0, -5, 0] : 0,
            opacity: isListening ? [1, 0.5, 1] : 1,
          }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          <Text
            color={colorMode === "light" ? "black" : "white"}
            fontFamily="cursive"
            fontWeight="bold"
            fontSize="lg"
          >
            {isListening ? "Listening..." : null}
          </Text>
        </motion.div>
      </Flex>

      {showTranscript && (
        <>
          <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background="rgba(0, 0, 0, 0.5)"
            zIndex="1000"
          ></Box>
          <Box
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex="1001"
            textAlign="center"
            padding="2rem"
            // background="white"
            borderRadius="8px"
          >
            <Text
              color={colorMode === "light" ? "black" : "white"}
              fontFamily="cursive"
              fontWeight="bold"
              fontSize="lg"
              style={boxShadowStyle}
              
            >
              {transcript + " ....😊"}
            </Text>
          </Box>
        </>
      )}
    </>
  );
};

export default Chitti;
