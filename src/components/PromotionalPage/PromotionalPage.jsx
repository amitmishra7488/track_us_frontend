// PromotionalPage.js
import React from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Container,
  useColorMode,
  Button,
  Stack,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import PromotionalPageNavbar from './PromotionalPageNavbar';

const PromotionalPage = () => {
  const { colorMode } = useColorMode();

  const handleLogin = () => {
    alert("Login clicked!");
  };

  const handleSignup = () => {
    alert("Signup clicked!");
  };

  return (
    <ChakraProvider>
      <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} minH="100vh">
        <PromotionalPageNavbar
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />

        <Container maxW="container.lg" mt="56px">
          <Heading as="h2" mb="4">
            Welcome to Your Personal Tracker
          </Heading>

          <Text mb="8">
            Track your goals, expenses, portfolio, and dreams in one place. Stay organized and achieve what matters most to you.
          </Text>

          <Stack spacing="4">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="4">
              {/* Goal Tracking Card */}
              <Box p="6" borderWidth="1px" borderRadius="lg"  boxShadow="lg">
                <Heading fontSize="xl" mb="2">
                  Goals
                </Heading>
                <Text>
                  Set and track your personal and professional goals. Stay motivated and celebrate your achievements.
                </Text>
              </Box>

              {/* Expense Tracking Card */}
              <Box p="6" borderWidth="1px" borderRadius="lg"  boxShadow="lg">
                <Heading fontSize="xl" mb="2">
                  Expenses
                </Heading>
                <Text>
                  Monitor your expenses and budget efficiently. Get insights into your spending habits and financial health.
                </Text>
              </Box>

              {/* Portfolio Tracking Card */}
              <Box p="6" borderWidth="1px" borderRadius="lg"  boxShadow="lg">
                <Heading fontSize="xl" mb="2">
                  Portfolio
                </Heading>
                <Text>
                  Manage and analyze your investment portfolio. Keep track of stocks, cryptocurrencies, and more.
                </Text>
              </Box>

              {/* Dreams Tracking Card */}
              <Box p="6" borderWidth="1px" borderRadius="lg"  boxShadow="lg">
                <Heading fontSize="xl" mb="2">
                  Dreams
                </Heading>
                <Text>
                  Record your dreams and aspirations. Take steps towards making your dreams a reality.
                </Text>
              </Box>
            </SimpleGrid>

            {/* Call-to-Action Button */}
            <Flex justify="center">
              <Button colorScheme="teal" size="lg" onClick={handleSignup}>
                Get Started
              </Button>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default PromotionalPage;
