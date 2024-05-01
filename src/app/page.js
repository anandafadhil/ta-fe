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
import Footer from "../component/footer";

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
        h='89vh' display='flex' justifyContent='center' alignItems='center'>        {/* <Center>
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
      </Container>
      <Footer />
    </ChakraProvider>
  );
}
