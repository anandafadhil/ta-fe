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
import StackedBarChart from "../../component/StackedBarChart"
import GeoChartExample from "../../component/GeoChartExample"
import PieChartExample from "../../component/PieChartExample"
import Footer from "../../component/footer"
// import { UniversityStatistic } from "./University/page"


import '../styles.css';
import UniversityStatistic from "./University/page";
import { fetchDatawithYear } from "@/src/api/fetch";

export default function PageComponent(props) {
  const router = useRouter();
  const { data, avgYearAllUniv, dataPie, dataStacked, defaultBar, defaultGeo } = props;

  const handleSearchClick = () => {
    const univID = formData.univInput; // Ensure you're using the updated form data state
    // setIsUniv(univ_id);
    localStorage.setItem('IDUNIVSTAT', JSON.stringify(univID));
    router.push(`/StatisticPage/University`);
  };

  const [formData, setFormData] = useState({
    univInput: '',
    univInputLabel: ''
  });

  const handleChange = async (selectedOption, fieldName) => {
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


  const optionsUni = data.distinct_universities.map(([id, name]) => ({
    value: id,
    label: name
  }));

  const [optionsProdi, setOptionsProdi] = useState([]);
  useEffect(() => {
    const selectYear = [
      { value: "2011", label: "2011" },
      { value: "2012", label: "2012" },
      { value: "2013", label: "2013" },
      { value: "2014", label: "2014" },
      { value: "2015", label: "2015" },
      { value: "2016", label: "2016" },
      { value: "All", label: "All Time" }
    ];
    setOptionsProdi(selectYear);
  }, []);


  const [chartData, setChartData] = useState("" || defaultGeo)
  const handleChangeYear = async (selectedOption, fieldName) => {
    const newData = await fetchDatawithYear({
      endpoint: `/get-geochart`,
      selectedYear: selectedOption.value,
    })


    if (newData) {
      // const convertedData = newData.map(item => [item.provinsi, item.persentase]);
      setChartData(newData);
    }
    if (selectedOption) {
      const { value } = selectedOption;
      setFormData({
        ...formData,
        [`${fieldName.name}Value`]: value
      });
    } else {
      setFormData({
        ...formData,
        [`${fieldName.name}Value`]: ''
      });
    }
  };
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
                      option: (provided) => ({
                        ...provided,
                        color: "black", 
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
                      bg='#13ABC4'
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

          {/* Average Grad Time in Text */}
          <Box w='100%'>
            <Box p={4} color='white' height='200px' marginTop='30px' borderRadius='md'>
              <GridItem
                w='100%'
                height='150px'
                bg='#3161A3'
                borderRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                display="grid"
                gridTemplateColumns="1fr" // Two columns
              >
                <Center>
                  <Text fontSize='30px' fontWeight='bold' color='white'>
                    Rata-Rata Tahun Lulus Seluruh Mahasiswa Indonesia
                  </Text>
                </Center>
                <Center >
                  <Text fontSize='18px' color='white'>
                    {avgYearAllUniv[0]?.avg_grad} Tahun
                  </Text>
                </Center>

              </GridItem>

            </Box>
          </Box>

          {/* 3 Statistics' Box */}
          <Box w='100%'>
            <Box p={4} color='white' height='500px' marginTop='30px' borderRadius='md'>
              <GridItem
                w='100%'
                height='450px'
                bg='#3161A3'
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
                  <BarChartExample2 defaultBar={defaultBar} />
                </GridItem>

                {/* Stacked Bar Chart */}
                <GridItem
                  w='90%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                >
                  <StackedBarChart dataStacked={dataStacked} />
                </GridItem>

                {/* Pie Chart */}
                <GridItem
                  w='90%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                >
                  <PieChartExample dataPie={dataPie} />
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
                bg='#3161A3'
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
                        <Text mb='6px' fontSize="30px" color="white" fontWeight="bold">
                          Persentase Ketepatan Waktu Lulus per Provinsi
                        </Text>
                      </Center>


                      {/* Geo Chart's Year */}
                    </Box>
                    <Box justifyContent='center' alignItems='center' display='flex'>
                      <Box  >
                        <Center>
                          <Select
                            width='100%'
                            name="yearSelected"
                            value={formData.yearSelected}
                            onChange={(option) => handleChangeYear(option, { name: 'yearSelected' })}
                            options={optionsProdi}
                            placeholder={formData.yearSelected ? formData.yearSelected : 'All Time'}
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
                bg='#3161A3'
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
                  <GeoChartExample defaultGeo={chartData} />
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