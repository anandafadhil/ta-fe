'use client';
import Image from "next/image";
import * as React from 'react';
import {
  ChakraProvider, VStack, Container,
  Flex, Spacer, Center, Square, Text, Box,
  Button
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import './styles.css';

export default function Home() {
  const router = useRouter();

  const handleStatClick = () => {
    router.push('/StatisticPage');
  };

  const handlePredictClick = () => {
    router.push('/PredictSingular');
  };
  return (
    <ChakraProvider resetCSS={false}>
      <Navbar />
      <Container
        margin={0}
        maxWidth='100vw'
        w='100%'
        bg='#3161A3'
        bgImage="/assets/worldmap-bg.png"
        bgSize="cover"
        bgPosition="center"
        h='100vh' display='flex' justifyContent='center' alignItems='center'>        {/* <Center>
          <Box bg='#3161A3' w='70%' h='200px' marginTop='40px'>
            <Text>
              
            </Text>
          </Box>
        </Center> */}

        <Center>
          <Box w='100%' h='100%' display='flex' justifyContent='center' alignItems='center'>
            <Text fontSize='100px' color='white'>
              PDDIKTI
            </Text>
          </Box>
        </Center>
        {/* <Box h='200px' marginTop='80px'>

          <Box  h='100px'>
            <Box h='100px'>
              <Center>
                <Button w='200px' h='50px' onClick={handlePredictClick}>Predict</Button>
              </Center>
            </Box>

          </Box>
          <Box h='100px'>
            <Box  h='100px'>
              <Center>
                <Button w='200px' h='50px' onClick={handleStatClick}>Statistic</Button>
              </Center>
            </Box>

          </Box>
        </Box> */}
      </Container>

    </ChakraProvider>
  );
}
