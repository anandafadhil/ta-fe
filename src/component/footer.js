import React from 'react';
import { Box, Container, Text, Link, VStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box color="white" w="100%" p={4} mt={0}>
      <Container maxW="container.xl">
        <VStack spacing={1}>
          <Text color='black' fontSize="sm">End to End Machine Learning, Analisis, dan Visualisasi Data Pendidikan Tinggi Indonesia</Text>
          <Text color='black' fontSize="sm">
            © 2024
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;