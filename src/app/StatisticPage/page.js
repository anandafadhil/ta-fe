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


import '../styles.css';

export default function PredictForm() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleUploadClick = () => {
    router.push('/PredictBulk');
  };

  const [formData, setFormData] = useState({
    univInput: '',
});
console.log(formData);

  const handleChange = (selectedOption, fieldName) => {
    console.log(selectedOption);
    console.log(fieldName);
    if (selectedOption) {
      const { label } = selectedOption;
      setFormData({ ...formData, [fieldName.name]: label });
    } else {
      setFormData({ ...formData, [fieldName.name]: '' });
    }
  };

  const optionsUni = [
    { value: "S-BN", label: 'Bina Nusantara' },
    { value: "N-ITB", label: 'Institut Teknologi Bandung' },
    { value: "N-UGM", label: 'Universitas Gajah Mada' },
    { value: "N-UI", label: 'Universitas Indonesia' }
  ];

  return (
    <ChakraProvider resetCSS={false}>
      <div>
        <Navbar />
        <Container
          margin={0}
          maxWidth='100vw'
          w='100%'
          bg='#EBFFFB'
          h='89vh'>

          {/* Header */}
          <Box p={4} bg='#EBFFFB'>
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

          {/* University Search */}
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
              bg='#13ABC4'
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap='10'
              w='70%'
              boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
              borderRadius='md'>

              {/* Univ Input */}
              <SimpleGrid  columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                <Box p='1' ml='1' color='black' fontWeight='bold'>
                  Nama Universitas
                </Box>
                <Box p='2'>
                  <Select
                    className="w-full"
                    name="univInput"
                    value={formData.univInput}
                    onChange={handleChange}
                    options={optionsUni}
                    placeholder={formData.univInput ? formData.univInput : 'Input Universitas Pilihan'}
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

              {/* Button */}
              <SimpleGrid  columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                <Box p={4} marginTop='20px'>
                  <Center>
                    <Button
                      color='white'
                      bg='#13ABC4'
                      w='200px'
                      h='50px'
                      boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                    // onClick={handleClick}
                    >
                      Confirm
                    </Button>
                  </Center>
                </Box>
              </SimpleGrid>

            </Flex>
          </Box>

          {/* Divider */}
          <Divider orientation="horizontal" my={8} borderWidth={2} borderColor="gray.400" />


          <Box w='100%'>
            <Box p={4} color='white' height='500px' marginTop='20px' borderRadius='md'>
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

          {/* Geo Chart */}
          <Box position="relative" >
            <Center>
              <Box
                mb='30px'
                bg="#13ABC4"
                w='100%'
                borderRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
              >
                <Box p="4" height="1000px" alignItems="center" justifyContent="center" borderRadius='md'>
                  {/* <GridItem>
                    <Center>
                      <Text fontSize="30px" color="black" fontWeight="bold">
                        Persentase Ketepatan Waktu Lulus per Provinsi
                      </Text>
                    </Center>

                  </GridItem> */}
                  <GridItem
                    w='100%'
                    h='90%'
                    justifySelf='center'
                    alignSelf='center'
                    padding='4px' // Add padding
                    marginTop=''
                  >
                    <GeoChartExample />
                  </GridItem>
                </Box>
              </Box>
            </Center>




          </Box>

        </Container>
      </div >
    </ChakraProvider >
  );


}