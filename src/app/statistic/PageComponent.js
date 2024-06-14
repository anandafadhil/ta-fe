"use client"

import {
  ChakraProvider, Container,
  Flex, Center, Text,
  Box, Grid, GridItem, Button, Input,
  SimpleGrid,

} from "@chakra-ui/react";
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import Select from "react-select";
import dynamic from "next/dynamic";
import BarChartExample2 from "@/src/component/BarChartExample2"
import StackedBarChart from "@/src/component/StackedBarChart"
import GeoChartExample from "@/src/component/GeoChartExample"
import PieChartExample from "@/src/component/PieChartExample"
import Footer from "@/src/component/footer"
import useStore from "@/src/store"
import '../styles.css';
import { fetchDatawithYear } from "@/src/api/fetch";

export default function PageComponent(props) {
  const router = useRouter();
  const { data, selectYear, totalProdi, totalUniv, avgYearAllUniv, dataPie, dataStacked, defaultBar, defaultGeo } = props;
  const setFormDatas = useStore((state) => state.setFormDatas);
  const formDatas = useStore((state) => state.formDatas);

  // const [formData, setformData] = useS({
  //   univInput: '',
  //   univInputLabel: '',
  // });
  console.log(formDatas);
  console.log(formDatas.univInput)

  const handleSearchClick = () => {
    router.push(`/statistic/university`);
    // setUnivID(univID);
  };

  // console.log(univID);

  const handleChange = async (selectedOption, fieldName) => {
    if (selectedOption) {
      const { value, label } = selectedOption;
      setFormDatas({
        ...formDatas,
        [`${fieldName}Input`]: value,
        [`${fieldName}InputLabel`]: label
      });
    } else {
      setFormDatas({
        ...formDatas,
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
    const newYear = selectYear.map(item => ({
      value: item.value_tahun,
      label: item.tahun_angkatan
    }));
    setOptionsProdi(newYear);
  }, []);


  const [chartData, setChartData] = useState("" || defaultGeo)
  const handleChangeYear = async (selectedOption, fieldName) => {
    const newData = await fetchDatawithYear({
      endpoint: `/geochart`,
      selectedYear: selectedOption.value,
    })


    if (newData) {
      setChartData(newData);
    }
    if (selectedOption) {
      const { value } = selectedOption;
      setFormDatas({
        ...formDatas,
        [`${fieldName.name}Value`]: value
      });
    } else {
      setFormDatas({
        ...formDatas,
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
          p={0}
          maxWidth='100vw'
          bg='#EFF0F1'
          w='100%'
          h='100%'>

          {/* Header */}
          <Box p={4} position='relative'>
            <Center>
              <Box
                mt='40px'
                p='4'
                width='800px'
                height='200px'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >

                <Box>
                  <Center>
                    <Text
                      lineHeight='30px'
                      fontSize={{ base: '26px', sm: '26px', md: '40px', lg: '50px', xl: '64px' }}
                      // fontSize="64px"
                      color="black"
                      fontWeight="bold">
                      Statistik Pendidikan
                    </Text>
                  </Center>

                  <Center>
                    <Text
                      fontSize={{ base: '26px', sm: '26px', md: '40px', lg: '50px', xl: '64px' }}
                      color="black" fontWeight="bold">
                      Tinggi Indonesia
                    </Text>
                  </Center>
                </Box>
              </Box>
            </Center>
          </Box>

          <Box p={0} position='relative'>
            <Center>
              <Box
                p='2'
                width='800px'
                height='auto'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <Box>
                  <Center>
                    <Text fontSize="24px" color="black" fontWeight="bold">
                      Statistik Universitas
                    </Text>
                  </Center>
                </Box>
              </Box>
            </Center>
          </Box>

          {/* Univ Search's Box */}
          <Box
            p={2}
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
              gap='0'
              w={{ base: '80%', sm: '80%', md: '50%', lg: '30%', xl: '30%' }}
              borderWidth='3px'
              borderRadius='2xl'
              borderColor='#7B7B7B'
            >

              {/* Univ Search */}
              <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='65%'>
                <Box p='2'>
                  <Select
                    className="w-full"
                    name="univInput"
                    value={formDatas.univInputLabel}
                    onChange={(option) => handleChange(option, 'univ')}
                    options={optionsUni}
                    placeholder={formDatas.univInputLabel ? formDatas.univInputLabel : 'Input Nama Universitas'}
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
              <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='30%'>
                <Box p={2}>
                  <Center>
                    <Button
                      color='white'
                      bg='#004AAD'
                      w='200px'
                      h='50px'
                      borderRadius="lg"
                      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                      onClick={handleSearchClick}
                    >
                      Lihat
                    </Button>
                  </Center>
                </Box>
              </SimpleGrid>

            </Flex>
          </Box>

          {/* Inforation in Text */}
          <Box
            w='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'>
            {/* Normal */}
            <Box
              p={4}
              bg='red'
              w='80%'
              color='white'
              height='200px'
              marginTop='50px'
              borderRadius='2xl'
              display={{ base: 'none', sm: 'none', lg: 'flex' }}
              alignItems='center'
              justifyContent='center'
            >
              {/* Jumlah Institusi */}
              <GridItem
                w='100%'
                height='150px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)' display="grid"
                gridTemplateColumns="1fr"
              >
                <Center>
                  <Text
                    fontSize={{ base: '16px', xl: '20px' }}
                    color='white'>
                    Jumlah Institusi
                  </Text>
                </Center>
                <Center >
                  <Text fontSize='46px' fontWeight='bold' color='white'>
                    {totalUniv.toLocaleString()}
                  </Text>
                </Center>

              </GridItem>

              {/* Jumlah Prodi */}
              <GridItem
                ml='20px'
                w='100%'
                height='150px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
              >
                <Center>
                  <Text fontSize='20px' color='white'>
                    Jumlah Prodi
                  </Text>
                </Center>
                <Center >
                  <Text fontSize='46px' fontWeight='bold' color='white'>
                    {totalProdi.toLocaleString()}
                  </Text>
                </Center>

              </GridItem>

              {/* Rata-rata waktu kelulusan */}
              {/* Normal */}
              <GridItem
                ml='20px'
                w='100%'
                height='150px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display={{ base: "none", md: "none", lg: "none", xl: "none", '2xl': "grid" }}
                gridTemplateColumns="1fr"
              >
                <Center>
                  <Text fontSize="20px" color="white">
                    Rata-rata waktu kelulusan
                  </Text>
                </Center>
                <Center>
                  <Text fontSize="46px" fontWeight="bold" color="white">
                    {avgYearAllUniv[0]?.avg_grad} Tahun
                  </Text>
                </Center>
              </GridItem>

              {/* Small */}
              <GridItem
                ml='20px'
                w='100%'
                height='150px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display={{ base: "none", md: "none", lg: "grid", xl: "grid", '2xl': "none" }}
                gridTemplateColumns="1fr"
              >
                <Box>
                  <Center>
                    <Text mt='15px' lineHeight="20px" fontSize="20px" color="white">
                      Rata-rata
                    </Text>
                  </Center>
                  <Center>
                    <Text fontSize="20px" color="white">
                      waktu kelulusan
                    </Text>
                  </Center>
                </Box>
                <Center>
                  <Text fontSize="46px" fontWeight="bold" color="white">
                    {avgYearAllUniv[0]?.avg_grad} Tahun
                  </Text>
                </Center>
              </GridItem>


              {/* Persentase Kelulusan */}
              <GridItem
                ml='20px'
                w='100%'
                height='150px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <Box>
                  <Center>
                    <Text mt='15px' lineHeight="20px" fontSize="20px" color="white">
                      Persentase Mahasiswa
                    </Text>
                  </Center>
                  <Center>
                    <Text fontSize="20px" color="white">
                      Lulus Tepat Waktu
                    </Text>
                  </Center>
                </Box>

                <Center>
                  <Text mb='10px' fontSize="46px" fontWeight="bold" color="white">
                    {dataPie[0]?.tepat_grad}%
                  </Text>
                </Center>



              </GridItem>

            </Box>

            {/* Small */}
            <Box
              w='80%'
              p={4}
              color='white'
              height='auto'
              marginTop='50px'
              borderRadius='2xl'
              display={{ base: 'grid', sm: 'grid', lg: 'none' }}
              gridTemplateColumns={{ base: '1fr', sm: '1fr', md: '1fr 1fr' }}
              gap={10}
              alignItems='center'
              justifyContent='center'
            >
              {/* Jumlah Institusi */}
              <GridItem
                w='100%'
                height='100px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <Center>
                  <Text
                    fontSize={{ base: '16px', sm: '20px' }}
                    color='white'>
                    Jumlah Institusi
                  </Text>
                </Center>
                <Center>
                  <Text
                    fontSize={{ base: '20px', sm: '20px', md: '32px', lg: '40px', xl: '46px' }}
                    fontWeight='bold' color='white'>
                    {totalUniv.toLocaleString()}
                  </Text>
                </Center>
              </GridItem>

              {/* Jumlah Prodi */}
              <GridItem
                w='100%'
                height='100px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
              >
                <Center>
                  <Text
                    fontSize={{ base: '16px', sm: '20px' }}
                    color='white'>
                    Jumlah Prodi
                  </Text>
                </Center>
                <Center>
                  <Text
                    fontSize={{ base: '20px', sm: '20px', md: '32px', lg: '40px', xl: '46px' }}
                    fontWeight='bold' color='white'>
                    {totalProdi.toLocaleString()}
                  </Text>
                </Center>
              </GridItem>

              {/* Rata-rata waktu kelulusan */}
              <GridItem
                w='100%'
                height='100px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <Center>
                  <Text
                    fontSize={{ base: '16px', sm: '20px' }}
                    color="white">
                    Rata-rata waktu kelulusan
                  </Text>
                </Center>
                <Center>
                  <Text
                    fontSize={{ base: '20px', sm: '20px', md: '32px', lg: '40px', xl: '46px' }}
                    fontWeight="bold" color="white">
                    {avgYearAllUniv[0]?.avg_grad} Tahun
                  </Text>
                </Center>
              </GridItem>

              {/* Persentase Kelulusan */}
              <GridItem
                w='100%'
                height='100px'
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <Box>
                  <Center>
                    <Text
                      mt='15px' lineHeight="20px"
                      fontSize={{ base: '16px', sm: '20px' }}
                      color="white">
                      Persentase Mahasiswa
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      fontSize={{ base: '16px', sm: '20px' }}
                      color="white">
                      Lulus Tepat Waktu
                    </Text>
                  </Center>
                </Box>
                <Center>
                  <Text mb='10px'
                    fontSize={{ base: '20px', sm: '20px', md: '32px', lg: '40px', xl: '46px' }}
                    fontWeight="bold" color="white">
                    {dataPie[0]?.tepat_grad}%
                  </Text>
                </Center>
              </GridItem>
            </Box>
          </Box>

          {/* 3 Chart */}
          <Box
            w='100%'
            p={0}
            // display='flex'
            alignItems='center'
            justifyContent='center'>
            {/* Normal */}
            <Box
              color='white'
              height='500px'
              marginTop='30px'
              borderRadius='md'
              display={{ base: 'none', sm: 'none', md: 'flex' }}
              alignItems='center'
              justifyContent='center'
            >
              {/* Bar Chart */}
              <GridItem
                ml='30px'
                paddingTop={2}
                w='100%'
                bg='white'
                height='450px'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <BarChartExample2 defaultBar={defaultBar} selectYear={selectYear} />
                </GridItem>
              </GridItem>

              {/* Stacked Bar */}
              <GridItem
                paddingTop={2}
                mr='30px'
                ml='30px'
                w='100%'
                height='450px'
                bg='white'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <StackedBarChart dataStacked={dataStacked} />
                </GridItem>

              </GridItem>

              {/* Pie Chart */}
              <GridItem
                mr='30px'
                paddingTop={2}
                w='100%'
                height='450px'
                bg='white'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <PieChartExample dataPie={dataPie} />
                </GridItem>

              </GridItem>

            </Box>

            {/* Small */}
            <Box
              color='white'
              bg='red'
              height='1000px'
              marginTop='30px'
              borderRadius='md'
              display={{ base: 'column', sm: 'column', md: 'flex' }}
              alignItems='center'
              justifyContent='center'
            >
              {/* Bar Chart */}
              <GridItem
                ml='30px'
                paddingTop={2}
                w='80%'
                bg='white'
                height='200px'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='200px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <BarChartExample2 defaultBar={defaultBar} selectYear={selectYear} />
                </GridItem>
              </GridItem>

              {/* Stacked Bar */}
              <GridItem
                paddingTop={2}
                mr='30px'
                ml='30px'
                w='80%'
                bg='white'
                height='200px'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='200px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <StackedBarChart dataStacked={dataStacked} />
                </GridItem>

              </GridItem>

              {/* Pie Chart */}
              <GridItem
                mr='30px'
                paddingTop={2}
                w='80%'
                bg='white'
                height='200px'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='200px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <PieChartExample dataPie={dataPie} />
                </GridItem>

              </GridItem>

            </Box>

          </Box>

          {/* Geo Chart's Box */}
          <Box w='100%'>
            <Box ml='30px' mr='30px' color='white' height='1120px' borderRadius='md'>
              {/* Geo Chart */}
              <GridItem
                p={4}
                w='100%'
                height='1000px'
                bg='white'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
              >
                <GridItem
                  height='900px'
                  width='100%'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px' // Add padding
                >
                  <div>
                    <Box alignItems='center' justifyContent='center' display='flex'>
                      {/* Text */}
                      <Box width='90%'>
                        <Text mb='6px' fontSize="22px" color="#545454" fontWeight="bold">
                          Persentase Ketepatan Waktu Lulus Per Provinsi
                        </Text>
                      </Box>

                      {/* Select */}
                      <Box width='10%' justifyContent='center' alignItems='center' display='flex'>
                        <Box width='150px'>
                          <Center>
                            <Select
                              color='black'
                              width='100%'
                              name="yearSelected"
                              value={formDatas.yearSelected}
                              onChange={(option) => handleChangeYear(option, { name: 'yearSelected' })}
                              options={optionsProdi}
                              placeholder={formDatas.yearSelected ? formDatas.yearSelected : 'All Time'}
                              styles={{
                                option: (provided) => ({
                                  ...provided,
                                  color: 'black',
                                }),
                                placeholder: (provided) => ({
                                  ...provided,
                                  color: 'black',
                                })
                              }}
                            />
                          </Center>
                        </Box>
                      </Box>
                    </Box>

                    {/* Divider */}
                    <Box mt="2" mb="4" height="4px" width="100%" bg="#EFF0F1"></Box>
                  </div>
                  <GeoChartExample defaultGeo={chartData} selectYear={selectYear} />
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