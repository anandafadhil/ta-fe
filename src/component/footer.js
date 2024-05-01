import React from 'react';
import { Box, Container, Text, Link, VStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box borderTop='1px' borderColor='gray' bg="#EBFFFB" color="white" w="100%" p={4} mt={0}>
      <Container maxW="container.xl">
        <VStack spacing={1}>
          <Text color='black' fontSize="sm">© {new Date().getFullYear()} PredictApp. All rights reserved.</Text>
          <Text color='black' fontSize="xs">
            Designed by <Link color="teal.500" href="https://pddikti.kemdikbud.go.id/">PDDIKTI</Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;