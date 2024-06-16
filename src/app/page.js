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
          p='4px'
          borderRadius='40px'>
          <Box
            ml={{ base: '0px', sm: '0px', md: '40px', lg: '60px' }}
            display="flex"
            flexWrap="wrap"
            w={{ base: '100%', md: '80%', lg: '80%' }}
            color="white"
            alignItems="center">
            <Text lineHeight="1"
              mt={{ base: '120px', sm: '120px', md: '60px', lg: '60px' }}
              fontSize={{ base: '26px', sm: '26px', md: '40px', lg: '50px', xl: '70px' }}
              textAlign={{ base: 'center', sm: 'center', md: 'justify', lg: 'justify' }}
              fontWeight="bold" w='100%'>
              Prediksi Ketepatan
            </Text>

            <Text
              fontSize={{ base: '26px', sm: '26px', md: '40px', lg: '50px', xl: '70px' }}
              textAlign={{ base: 'center', sm: 'center', md: 'justify', lg: 'justify' }}
              fontWeight="bold" w="100%">
              Waktu Lulus Mahasiswa
            </Text>
          </Box>

          <Box
            mt={{ base: '40px' }}
            p={{ base: '4px', md: '4px' }}
            ml={{ base: '0px', md: '40px', lg: '60px' }}
            display="flex"
            flexWrap="wrap"
            w={{ base: '100%', md: '70%', lg: '45%' }}
            color="white"
            alignItems="center"
          >
            {/* Text 1 (visible on base and md screens) */}
            <Text
              textAlign={{ base: 'center', sm: 'center', md: 'justify', lg: 'justify' }}
              fontSize={{ base: '16px', md: '24px' }}
              mr={{ base: '0px', md: '2' }}
              mt={{base:'40px'}}
              display={{ base: 'block', md: 'block', lg: 'none' }}
            >
              Dan mempelajari statistik performa ketepatan waktu kelulusan setiap prodi dan institusi pendidikan tinggi di seluruh Indonesia, menggunakan data dari
            </Text>

            {/* Text 2 (visible on base and md screens) */}
            <Text
              w='100%'
              textAlign={{ base: 'center', sm: 'center', md: 'justify', lg: 'justify' }}
              mt={{ base: '16px' }}
              fontSize={{ base: '16px', md: '24px' }}
              fontWeight="bold"
              display={{ base: 'block', md: 'block', lg: 'none' }}
            >
              <strong>Pangkalan Data Pendidikan Tinggi Indonesia (PDDikti)</strong>.
            </Text>

            {/* Combined text visible on lg screens */}
            <Text
              w='100%'
              fontSize={{ base: '16px', md: '24px' }}
              textAlign={{ base: 'center', sm: 'center', md: 'justify', lg: 'justify' }}
              display={{ base: 'none', md: 'none', lg: 'block' }}
            >
              Dan mempelajari statistik performa ketepatan waktu kelulusan setiap prodi dan institusi pendidikan tinggi di seluruh Indonesia, menggunakan data dari <strong>Pangkalan Data Pendidikan Tinggi Indonesia (PDDikti)</strong>.
            </Text>
          </Box>


          {/* Scrollable */}
          <Box
            position="absolute"
            bottom={{ base: '100px', md: '100px', lg: '100px' }}
            left={{ base: '50%', sm: '50%', md: '50%', lg: '20%', xl: '15%' }}
            transform="translateX(-50%)"
          >
            {/* Conditional rendering for button layout */}
            <Box
              display={{ base: 'block', md: 'flex' }} // Display block on base/xs, flex on larger screens
              flexDirection={{ base: 'column', md: 'row' }} // Stack vertically on base/xs, horizontally on larger screens
              alignItems={{ base: 'center', md: 'initial' }} // Center align on base/xs, initial alignment on larger screens
            >
              <Button
                color='white'
                bg='#004AAD'
                borderRadius="full"
                borderColor='white'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                onClick={handleScroll}
                mb={{ base: '4px', md: '0px' }} // Add margin-bottom on base/xs, no margin on larger screens
              >
                <Box display="flex" alignItems="center">
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
        </Box>

      </Container>

      {/* Additional Information Section */}
      <Box
        id="moreInfo"
        h="850px"
        display='flex'
        flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
        justifyContent='center'
        p={6}
        gap={10}
        w="100%"
      >
        {/* Left Card */}
        {/* Visible on sm */}
        <GridItem
          w={{ base: '100%', md: '100%', lg: '40%', xl: '40%' }}
          mt='30px'
          height='250px'
          bg='#EFF0F1'
          borderRadius='2xl'
          boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'
          display={{ base: 'none', sm: 'flex', md: 'flex' }}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p="10px"
        >
          {/* Text Box */}
          <Box
            color="black"
          >
            <Text fontSize={{ base: '18px', md: '24px' }} fontWeight="bold">
              Dapatkan petunjuk
            </Text>
            <Text fontSize="18px" textAlign="justify">
              Untuk mengevaluasi apakah Mahasiswa tahun kedua berada pada jalur yang benar untuk menyelesaikan studi tepat waktu!
            </Text>
          </Box>

          {/* Icon */}
          <Box
            ml='40px'
            display='flex'
            justifyContent="center"
            alignItems="center" w='30%'>
            <Box>
              <AiOutlineExclamationCircle left="10%" size="100px" color="red" />
            </Box>
          </Box>

        </GridItem>

        {/* Visible on base */}
        <GridItem
          w={{ base: '100%', md: '100%', lg: '40%', xl: '40%' }}
          mt='30px'
          height='250px'
          bg='#EFF0F1'
          borderRadius='2xl'
          boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'
          display={{ base: 'flex', sm: 'none' }}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          p="10px"
        >
          {/* Icon */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w={{ base: '100%', sm: '100%', md: '30%' }}
          >
            <Box>
              <AiOutlineExclamationCircle size="100px" color="red" />
            </Box>
          </Box>
          {/* Text Box */}
          <Box color="black" textAlign={{ base: 'center', sm: 'center', md: 'initial' }}>
            <Text fontSize={{ base: '18px', md: '24px' }} fontWeight="bold">
              Dapatkan petunjuk
            </Text>
            <Text fontSize="18px" textAlign="center">
              Untuk mengevaluasi apakah Mahasiswa tahun kedua berada pada jalur yang benar untuk menyelesaikan studi tepat waktu!
            </Text>
          </Box>

        </GridItem>

        {/* Right Card */}
        {/* Visible on sm */}
        <GridItem
          w={{ base: '100%', md: '100%', lg: '40%', xl: '40%' }}
          mt='30px'
          height='250px'
          bg='#EFF0F1'
          borderRadius='2xl'
          boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'
          display={{ base: 'none', sm: 'flex', md: 'flex' }}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          p="10px"
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
            ml='40px'
            display='flex'
            justifyContent="center"
            alignItems="center" w='30%'>
            <Box>
              <AiOutlineSearch left="10%" size="100px" color="black" />
            </Box>
          </Box>

        </GridItem>

        {/* Visible on base */}
        <GridItem
          w={{ base: '100%', md: '100%', lg: '40%', xl: '40%' }}
          mt='30px'
          height='250px'
          bg='#EFF0F1'
          borderRadius='2xl'
          boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'
          display={{ base: 'flex', sm: 'none' }}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          p="10px"
        >

          {/* Icon */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            w={{ base: '100%', sm: '100%', md: '30%' }}
          >
            <Box>
              <AiOutlineSearch size="100px" color="black" />
            </Box>
          </Box>

          {/* Text Box */}
          <Box color="black" textAlign={{ base: 'center', sm: 'center', md: 'initial' }}>
            <Text fontSize={{ base: '18px', md: '24px' }} fontWeight="bold">
              Lakukan monitoring
            </Text>
            <Text fontSize="18px" textAlign="center">
              Atas performa kemampuan seluruh prodi dan institusi di Indonesia untuk mendorong mahasiswanya untuk lulus tepat waktu!
            </Text>
          </Box>


        </GridItem>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}
