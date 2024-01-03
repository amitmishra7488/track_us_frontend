// import React, { useState } from 'react';
// import { Box, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, useColorMode } from '@chakra-ui/react';
// import UseWhatsapp from 'whatsapp-react-component';

// const ContactUs = () => {
//   const { colorMode } = useColorMode();

//   const [formData, setFormData] = useState({
//     name: '',
//     mobileNumber: '',
//     message: '',
//   });

//   const { name, mobileNumber, message } = formData;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Assuming your WhatsApp number is hardcoded
//     const whatsappNumber = ''
//     const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//     `Name: ${name}\nMobile: ${mobileNumber}\nMessage: ${message}`
//   )}`;

//   window.location.href = whatsappLink;
//   };

//   return (
//     <Box p="4">
//       <Heading mb="4">Contact Us</Heading>
//       <Text mb="8" color={colorMode === 'light' ? 'gray.700' : 'gray.300'}>
//         Have a question or just want to say hello? We'd love to hear from you!
//       </Text>
//       <form onSubmit={handleSubmit}>
//         <FormControl mb="4">
//           <FormLabel>Name</FormLabel>
//           <Input type="text" name="name" value={name} onChange={handleChange} required />
//         </FormControl>
//         <FormControl mb="4">
//           <FormLabel>Mobile Number</FormLabel>
//           <Input type="tel" name="mobileNumber" value={mobileNumber} onChange={handleChange} required />
//         </FormControl>
//         <FormControl mb="4">
//           <FormLabel>Message</FormLabel>
//           <Textarea name="message" value={message} onChange={handleChange} required />
//         </FormControl>
//         <Button type="submit" colorScheme="teal">
//           Send Message
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default ContactUs;
