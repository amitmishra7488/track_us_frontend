import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import comingSoon from "../../images/comingSoon.png";
const IncompleteComponent = () => {
  return (
      <Box
        p="6"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        textAlign="center"
        boxShadow="md"
        maxW="400px"
        width="100%"
        bg="transparent"
        margin="auto"
        mt="5em"
      >
        <Image
          src={comingSoon}
          alt="Coming Soon"
          mb="4"
        />
        <Text fontSize="xl" fontWeight="bold" mb="2">
          This Feature is Coming Soon
        </Text>
        <Text>
          We are currently working on this feature. Stay tuned for updates!
        </Text>
      </Box>
  );
};

export default IncompleteComponent;
