'use client';
import Image from "next/image";
import * as React from 'react';
import {
  ChakraProvider, VStack, Container,
  Center, Text, Box, Button, GridItem
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import './styles.css';
import { RiGraduationCapFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineExclamationCircle, AiOutlineSearch } from "react-icons/ai";
import Footer from "../component/footer";

export default function Home() {
  const router = useRouter();

  const handleScroll = () => {
    const element = document.getElementById("moreInfo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <ChakraProvider resetCSS={false}>
      <Navbar />
      {/* Main Container */}
      <Container
        margin={0}
        maxWidth='100vw'
        w='100%'
        bg='white'
        h='85vh' >

        {/* Landing Page Text */}
        <Box
          marginRight="10px"
          bgImage="/assets/map-indo.png"
          bgSize="cover"
          bgPosition="center"
          w='100%'
          h='100%'
          borderRadius='40px'>
          <Box
            ml={{ base: '20px', md: '40px', lg: '60px' }}
            display="flex"
            flexWrap="wrap"
            w={{ base: '100%', md: '80%', lg: '80%' }}
            color="white"
            alignItems="center">
            <Text lineHeight="1" mt='60px' fontSize={{ base: '30px', md: '40px', lg: '70px' }} fontWeight="bold">
              Prediksi Ketepatan
            </Text>
            <Box as="span" ml={4} mt='60px'>
              <RiGraduationCapFill size="70px" />
            </Box>
            <Text fontSize={{ base: '30px', md: '40px', lg: '70px' }} fontWeight="bold" w="100%">
              Waktu Lulus Mahasiswa
            </Text>
          </Box>

          <Box
            p={{base:'4px', md:'4px'}}
            ml={{ base: '0px', md: '40px', lg: '60px' }}
            display="flex"
            flexWrap="wrap"
            w={{ base: '100%', md: '70%', lg: '45%' }}
            color="white"
            alignItems="center"
          >
            <Text fontSize={{ base: '16px', md: '24px' }} textAlign={{ base: 'center', md: 'justify', lg: 'justify' }}>
              Dan pelajari statistik performa ketepatan waktu kelulusan setiap prodi dan institusi pendidikan tinggi di seluruh Indonesia, menggunakan data dari<br></br> <strong>Pangkalan Data Pendidikan Tinggi Indonesia (PDDikti)</strong>.
            </Text>
          </Box>

          {/* Scrollable */}
          <Box
            position="absolute"
            bottom={{ base: '100px', md: '100px', lg: '100px' }}
            left={{ base: '50%', md: '50%', lg: "12%" }}
            transform="translateX(-50%)">
            <Button
              color='white'
              bg='#004AAD'
              borderRadius="full"
              borderColor='white'
              boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
              onClick={handleScroll}
            >
              <Box display="flex" flexWrap="wrap">
                <Text fontSize={{ base: '16px', md: '24px' }}>
                  Pelajari lebih lanjut
                </Text>
                <Box as="span" ml={2} mt={1}>
                  <FaChevronDown size="24px" />
                </Box>
              </Box>
            </Button>
          </Box>
        </Box>

      </Container>

      {/* Additional Information Section */}
      <Box
        id="moreInfo"
        h="850px"
        display='flex'
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent='center'
        p={6}
        gap={10}
        w="100%"
      >
        {/* Left Card */}
        <GridItem
          w={{ base: '100%', md: '50%', lg: '30%' }}
          mt='30px'
          height='250px'
          bg='#EFF0F1'
          borderRadius='2xl'
          boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p="40px"
        >
          {/* Text Box */}
          <Box color="black" w='70%'>
            <Text fontSize={{ base: '18px', md: '24px' }} fontWeight="bold">
              Dapatkan petunjuk
            </Text>
            <Text fontSize="18px" textAlign="justify">
              Untuk mengevaluasi apakah Mahasiswa tahun kedua berada pada jalur yang benar untuk menyelesaikan studi tepat waktu!
            </Text>
          </Box>

          {/* Icon */}
          <Box
            ml='50px'
            display='flex'
            justifyContent="center"
            alignItems="center" w='30%'>
            <Box>
              <AiOutlineExclamationCircle left="10%" size="100px" color="red" />
            </Box>
          </Box>

        </GridItem>

        {/* Right Card */}
        <GridItem
          w={{ base: '100%', md: '50%', lg: '30%' }}
          mt='30px'
          height='250px'
          bg='#EFF0F1'
          borderRadius='2xl'
          boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p="40px"
        >

          {/* Text Box */}
          <Box color="black">
            <Text fontSize={{ base: '18px', md: '24px' }} fontWeight="bold">
              Lakukan monitoring
            </Text>
            <Text fontSize="18px" textAlign="justify">
              Atas performa kemampuan seluruh prodi dan institusi di Indonesia untuk mendorong mahasiswanya untuk lulus tepat waktu!
            </Text>
          </Box>

          {/* Icon */}
          <Box
            ml='50px'
            display='flex'
            justifyContent="center"
            alignItems="center" w='30%'>
            <Box>
              <AiOutlineSearch left="10%" size="100px" color="black" />
            </Box>
          </Box>

        </GridItem>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}
