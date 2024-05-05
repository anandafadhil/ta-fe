"use client"

import {
  ChakraProvider, VStack, Container,
  Flex, Spacer, Center, Square, Text,
  Box, Grid, GridItem, Button, Input,
  SimpleGrid, InputSelect,
  FormControl, Modal, ModalOverlay,
  ModalContent, ModalCloseButton,
  ModalFooter, ModalBody, ModalHeader,
  useDisclosure, FormLabel, Textarea,
  Divider
} from "@chakra-ui/react";
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import Select from "react-select";
import dynamic from "next/dynamic";
import BarChartExample2 from "../../component/BarChartExample2"
import LineChartExample2 from "../../component/LineChartExample2"
import GeoChartExample from "../../component/GeoChartExample"
import PieChartExample from "../../component/PieChartExample"
import Footer from "../../component/footer"
// import { UniversityStatistic } from "./University/page"


import '../styles.css';
import UniversityStatistic from "./University/page";

export default function PredictForm() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isUniv, setIsUniv] = useState({});

  const handleSearchClick = () => {
    const univ_id = formData.univInput; // Ensure you're using the updated form data state
    console.log(univ_id);
    setIsUniv(univ_id);
    router.push(`/StatisticPage/University?univ_id=${univ_id}`);
  };

  const [formData, setFormData] = useState({
    univInput: '',
    univInputLabel: ''
  });
  console.log(formData);

  const handleChange = (selectedOption, fieldName) => {
    console.log(selectedOption.value);
    console.log(fieldName);
    if (selectedOption) {
      const { value, label } = selectedOption; // Destructure both value and label from selectedOption
      setFormData({
        ...formData,
        [`${fieldName}Input`]: value, // Dynamically create key for value
        [`${fieldName}InputLabel`]: label // Dynamically create key for label
      });
    } else {
      setFormData({
        ...formData,
        [`${fieldName}Input`]: '',
        [`${fieldName}InputLabel`]: ''
      });
    }
  };


  const optionsUni = [
    { value: "S-BN", label: 'Bina Nusantara' },
    { value: "N-ITB", label: 'Institut Teknologi Bandung' },
    { value: "N-UGM", label: 'Universitas Gajah Mada' },
    { value: "N-UI", label: 'Universitas Indonesia' }
  ];

  const newOptions = [
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" }
  ];

  return (
    <ChakraProvider resetCSS={false}>
      <div>
        <Navbar />
        <Container
          margin={0}
          maxWidth='100vw'
          w='100%'
          h='100%'>

          {/* Header */}
          <Box p={4}>
            <Flex color='black' >
              <Box
                p='4'
                width='320px'
                height='50px'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <Text fontSize='30px' color='black'>
                  Statistik Universitas
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Univ Search's Box */}
          <Box
            mt='20px'
            p={4}
            color='white'
            height='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Flex
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap='10'
              w='70%'
              borderWidth='3px'
              borderRadius='md'>

              {/* Univ Search */}
              <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                <Box p='1' ml='1' color='black' fontWeight='bold'>
                  Nama Universitas
                </Box>
                <Box p='2'>
                  <Select
                    className="w-full"
                    name="univInput"
                    value={formData.univInputLabel}
                    onChange={(option) => handleChange(option, 'univ')}
                    options={optionsUni}
                    placeholder={formData.univInputLabel ? formData.univInputLabel : 'Input Universitas Pilihan'}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "0.5rem",
                        paddingLeft: "0.2rem",
                        height: "55px",
                      }),
                      indicatorSeparator: (base) => ({
                        ...base,
                        visibility: "hidden",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        paddingRight: "0.5rem",
                        svg: {
                          height: 24,
                          width: 24,
                          fill: "black",
                        },
                      }),
                      menu: (provided) => ({
                        ...provided,
                        maxHeight: "120px", // Adjust the max height as needed
                        overflowY: "auto", // Add scrollbar if needed
                      }),
                      // New style to change label font color to black
                      option: (provided) => ({
                        ...provided,
                        color: "black", // Change label font color to black
                      }),
                    }}
                  />
                </Box>
              </SimpleGrid>

              {/* Univ Search's Button */}
              <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                <Box p={4} marginTop='20px'>
                  <Center>
                    <Button
                      color='white'
                      bg='#3161A3'
                      w='200px'
                      h='50px'
                      boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                      onClick={handleSearchClick}
                    >
                      Confirm
                    </Button>
                  </Center>
                </Box>
              </SimpleGrid>

            </Flex>
          </Box>

          {/* Divider */}
          {/* <Divider orientation="horizontal" my={8} borderWidth={2} borderColor="gray.400" /> */}

          {/* 3 Statistics' Box */}
          <Box w='100%'>
            <Box p={4} color='white' height='500px' marginTop='30px' borderRadius='md'>
              <GridItem
                w='100%'
                height='450px'
                bg='#13ABC4'
                borderRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr" // Two columns
              >
                {/* Bar Chart */}
                <GridItem
                  w='90%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px' // Add padding
                >
                  <BarChartExample2 />
                </GridItem>

                {/* Line Chart */}
                <GridItem
                  w='90%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                >
                  <LineChartExample2 />
                </GridItem>

                {/* Pie Chart */}
                <GridItem
                  w='90%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                >
                  <PieChartExample />
                </GridItem>
              </GridItem>

            </Box>
          </Box>

          {/* Geo Chart's Box */}
          <Box w='100%'>
            <Box p={4} color='white' height='1080px' marginTop='20px' borderRadius='md'>
              {/* Upper Box */}
              <GridItem
                w='100%'
                height='125px'
                bg='#13ABC4'
                display="grid"
                gridTemplateColumns="1fr" // Two columns
                borderTopLeftRadius='md'
                borderTopRightRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow

              >
                <GridItem
                  height='90%'
                  width='95%'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px' // Add padding
                >
                  {/* Geo Chart's Title */}
                  <Box alignItems='center' justifyContent='center'>
                    <Box >
                      <Center>
                        <Text mb='6px' fontSize="30px" color="black" fontWeight="bold">
                          Persentase Ketepatan Waktu Lulus per Provinsi
                        </Text>
                      </Center>

                      {/* Geo Chart's Year */}
                    </Box>
                    <Box justifyContent='center' alignItems='center' display='flex'>
                      <Box  >
                        <Center>
                          <Select
                            options={newOptions}
                            styles={{
                              option: (provided) => ({
                                ...provided,
                                color: 'black', // Set the font color to black
                              })
                            }}
                          />
                        </Center>
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
              </GridItem>

              {/* Geo Chart */}
              <GridItem
                w='100%'
                height='920px'
                bg='#13ABC4'
                display="grid"
                gridTemplateColumns="1fr"
                borderBottomLeftRadius='md'
                borderBottomRightRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
              >
                <GridItem
                  height='95%'
                  width='95%'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px' // Add padding
                >
                  <GeoChartExample />
                </GridItem>
              </GridItem>
            </Box>
          </Box>

        </Container>
        <Footer />
      </div >
    </ChakraProvider >
  );


}