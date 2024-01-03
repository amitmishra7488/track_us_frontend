import React from 'react';
import { Box, Flex, IconButton, useColorMode, Link, Tooltip } from '@chakra-ui/react';
import { FaEnvelope, FaTwitter, FaFacebook, FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Box as="footer" py="4" bg={colorMode === 'light' ? 'gray' : 'gray.600'} borderTop="1px solid" borderColor="gray.300">
      <Flex justify="center" align="center" mx="auto" maxW="600px">

        <Tooltip label="Email">
          <Link href="mailto:your.email@example.com" isExternal mx="2">
            <IconButton
              aria-label="Email"
              icon={<FaEnvelope />}
              size="sm"
              variant="outline"
              colorScheme={colorMode === 'light' ? 'teal' : 'cyan'}
              _hover={{ 
                color: colorMode === 'light' ? '#FBBC05' : '#F59E0B',
                bg: 'transparent',
                boxShadow: '0 0 10px rgba(251, 188, 5, 0.8)',
              }}
            />
          </Link>
        </Tooltip>

        <Tooltip label="Twitter">
          <Link href="https://twitter.com/yourtwitter" isExternal mx="2">
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="sm"
              variant="outline"
              colorScheme={colorMode === 'light' ? 'teal' : 'cyan'}
              _hover={{ 
                color: colorMode === 'light' ? '#1DA1F2' : '#4C51BF',
                bg: 'transparent',
                boxShadow: '0 0 10px rgba(29, 161, 242, 0.8)',
              }}
            />
          </Link>
        </Tooltip>

        <Tooltip label="Facebook">
          <Link href="https://facebook.com/yourfacebook" isExternal mx="2">
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              size="sm"
              variant="outline"
              colorScheme={colorMode === 'light' ? 'teal' : 'cyan'}
              _hover={{ 
                color: colorMode === 'light' ? '#316FF6' : '#2C5282',
                bg: 'transparent',
                boxShadow: '0 0 10px rgba(49, 111, 246, 0.8)',
              }}
            />
          </Link>
        </Tooltip>

        <Tooltip label="Instagram">
          <Link href="https://instagram.com/yourinstagram" isExternal mx="2">
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              size="sm"
              variant="outline"
              colorScheme={colorMode === 'light' ? 'teal' : 'cyan'}
              _hover={{ 
                color: colorMode === 'light' ? '#feda75' : '#ED8936',
                bg: 'transparent',
                boxShadow: '0 0 10px rgba(254, 218, 117, 0.8)',
              }}
            />
          </Link>
        </Tooltip>

        <Tooltip label="Contact Us">
            <IconButton
              aria-label="Contact Us"
              icon={<FaPhoneAlt />}
              onClick={()=> navigate("/comingsoon")}
              size="sm"
              variant="outline"
              colorScheme={colorMode === 'light' ? 'teal' : 'cyan'}
              _hover={{ 
                color: colorMode === 'light' ? '#3DDC84' : '#38A169',
                bg: 'transparent',
                boxShadow: '0 0 10px rgba(61, 220, 132, 0.8)',
              }}
            />
        </Tooltip>

      </Flex>
    </Box>
  );
};

export default Footer;
