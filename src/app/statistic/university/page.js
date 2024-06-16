"use client"
import Image from 'next/image';
import {
  ChakraProvider, VStack, Container,
  Flex, Spacer, Center, Square, Text,
  Box, Grid, GridItem, Button, Input,
  SimpleGrid, InputSelect,
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import Select from "react-select";
import BarChartUniv from "@/src/component/BarChartUniv"
import PieChartUniv from "@/src/component/PieChartUniv"
import Footer from "@/src/component/footer"
import "../../styles.css"
import StackedBarChart from '@/src/component/StackedBarChart';
import { fetchData, fetchDatawithIDUniv, fetchDatawithIDYear, fetchDatawithYear } from '@/src/api/fetch';
import Swal from 'sweetalert2';
import useStore from '@/src/store';

export default function University() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [optionsProdi, setOptionsProdi] = useState([]);
  const [newYear, setNewYear] = useState([]);
  const [dataUnivInfo, setUnivInfo] = useState([]);
  const [dataAvgGrad, setAvgGrad] = useState([]);
  const [newDataBar, setDataBar] = useState([]);
  const [newDataStacked, setDataStack] = useState([]);
  const [newDataPie, setDataPie] = useState([]);
  const [TableData, setTableData] = useState([]);
  const setFormDatass = useStore((state) => state.setFormDatass);
  const formDatass = useStore((state) => state.formDatass);
  const formDatas = useStore((state) => state.formDatas);
  const parsId = formDatas.univInput

  const handleGetYear = async () => {
    const selectYear = await fetchData('/select-year');
    setNewYear(selectYear);
  }
  const handleGetInfo = async () => {
    const selected_id_univ = parsId
    const univInfo = await fetchData(`/univ-information/${selected_id_univ}`)
    setUnivInfo(univInfo[0])
  }

  const handleGetAvgGrad = async () => {
    const selected_id_univ = parsId
    const getAvgGrad = await fetchData(`/average-grad-time-univ/${selected_id_univ}`)
    setAvgGrad(getAvgGrad)
  }

  const handleProdi = async () => {
    const selected_id_univ = parsId
    const dataProdi = await fetchData(`/prodi-vis/${selected_id_univ}`);

    const optionsProdi = dataProdi.prodi.map(([id, name]) => ({
      value: id,
      label: name
    }));
    setOptionsProdi(optionsProdi);
  };

  const handleChangeProdi = async (selectedOption, fieldName) => {
    if (selectedOption) {
      const { value, label } = selectedOption;
      setFormDatass({
        ...formDatass,
        [`${fieldName}Input`]: value,
        [`${fieldName}InputLabel`]: label
      });
    } else {
      setFormDatass({
        ...formDatass,
        [`${fieldName}Input`]: '',
        [`${fieldName}InputLabel`]: ''
      });
    }
  };

  const handleGetBar = async () => {
    const dataBar = await fetchDatawithIDYear({
      endpoint: '/grad-time-distribution-univ',
      selectedIDUniv: parsId,
      selectedYear: 'All',
    })

    setDataBar(dataBar);
  }

  const handleGetStacked = async () => {
    const dataStacked = await fetchDatawithIDUniv({
      endpoint: '/grad-progression-univ',
      selectedIDUniv: parsId,
    })
    const transformedData = dataStacked.map(item => ({
      selected_year: item.tahun_angkatan,
      tepat_grad: item.persentase,
      tidak_tepat_grad: 1 - item.persentase,
    }));
    setDataStack(transformedData);
  }


  const handleGetPie = async () => {
    const dataPie = await fetchDatawithYear({
      endpoint: '/grad-timeliness-univ',
      selectedYear: parsId,
    })
    const transformedAllTimeEntry = dataPie ? {
      selected_year: dataPie[0].tahun_angkatan,
      tepat_grad: dataPie[0].persentase,
      tidak_tepat_grad: 1 - dataPie[0].persentase,
    } : null;
    setDataPie(transformedAllTimeEntry);
  }

  const handleGetRanking = async () => {
    const dataRank = await fetchDatawithIDUniv({
      endpoint: '/prodi-ranking',
      selectedIDUniv: parsId,
    })
    setTableData(dataRank);
  }

  const handleSearchClick = () => {
    localStorage.setItem('IDPRODISTAT', JSON.stringify(prodiID));
    router.push(`/statistic/major`);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Show loading alert
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch the data.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      await handleGetYear();
      await handleGetAvgGrad();
      await handleGetInfo();
      await handleProdi();
      await handleGetBar();
      await handleGetStacked();
      await handleGetPie();
      await handleGetRanking();
      setIsLoading(false);
      Swal.close();
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }



  return (
    <ChakraProvider resetCSS={false}>
      <div>
        <Navbar />
        <Container
          margin={0}
          p={0}
          bg='#EFF0F1'
          maxWidth='100vw'
          w='100%'
          h='100%'>

          {/* Header */}
          <Box p={4} position='relative'>
            <Center>
              <Box
                mt={{ base: '0px', sm: '0px', md: '40px' }}
                p='4'
                width='100%'
                height={{ base: '150px', sm: '150px', md: '200px' }}
                display='flex'
                alignItems='center'
                justifyContent='center'
              >

                <Box>
                  <Center>
                    <Text lineHeight='20px'
                      fontSize={{ base: '18px', sm: '18px', md: '24px', lg: '30px', xl: '30px' }}
                      color="black" >
                      Statistik Satuan Pendidikan
                    </Text>
                  </Center>

                  <Center>
                    <Text
                      fontSize={{ base: '24px', sm: '24px', md: '50px', lg: '60px', xl: '80px' }}
                      mb={{ base: '20px', sm: '20px', md: '0px' }}
                      mt={{ base: '20px', sm: '20px', md: '0px' }}
                      color="black"
                      fontWeight="bold"
                    >
                      {dataUnivInfo.nm_univ}
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      lineHeight='10px'
                      fontSize={{ base: '18px', sm: '18px', md: '24px', lg: '26px', xl: '26px' }}
                      color="black"
                      fontWeight="bold"
                    >
                      {dataUnivInfo.provinsi_label} | Tahun berdiri {dataUnivInfo.thn}
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
                    <Text
                      fontSize={{ base: '18px', sm: '18px', md: '24px', lg: '24px', xl: '24px' }}
                      color="black" fontWeight="bold">
                      Statistik Prodi
                    </Text>
                  </Center>
                </Box>
              </Box>
            </Center>
          </Box>

          {/* Prodi Search's Box */}
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
              borderColor='#7B7B7B'>

              {/* Prodi Search */}
              <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='65%'>
                {/* Large  */}
                <Box p='2' display={{ base: "none", lg: "block" }}>
                  <Select
                    className="w-full"
                    name="univInput"
                    value={formDatass.prodiInputLabel}
                    onChange={(option) => handleChangeProdi(option, 'prodi')}
                    options={optionsProdi}
                    placeholder={formDatass.prodiInputLabel ? formDatass.prodiInputLabel : 'Input Nama Prodi'}
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

                {/* Small  */}
                <Box p='2' display={{ base: "block", lg: "none" }}>
                  <Select
                    className="w-full"
                    name="univInput"
                    value={formDatass.prodiInputLabel}
                    onChange={(option) => handleChangeProdi(option, 'prodi')}
                    options={optionsProdi}
                    placeholder={formDatass.prodiInputLabel ? formDatass.prodiInputLabel : 'Input Nama Prodi'}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "0.5rem",
                        paddingLeft: "0.2rem",
                        height: "55px",
                        fontSize: "14px"
                      }),
                      indicatorSeparator: (base) => ({
                        ...base,
                        visibility: "hidden",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        paddingRight: "0.5rem",
                        svg: {
                          height: 20,
                          width: 20,
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

              {/* Button */}
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
          <Box w='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'>
            {/* Normal */}
            <Box
              w='80%'
              p={4}
              ml='20px'
              color='white'
              height='200px'
              marginTop='50px'
              borderRadius='2xl'
              display={{ base: 'none', sm: 'none', lg: 'flex' }}
              alignItems='center'
              justifyContent='center'
            >

              {/* Peringkat Ketepatan */}
              <GridItem
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
                    <Text mt='15px' lineHeight="20px"
                      fontSize={{ base: '14px', lg: '14px', xl: '20px' }}
                      color="white">
                      Peringkat Ketepatan
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      fontSize={{ base: '14px', lg: '14px', xl: '20px' }}
                      color='white'>
                      Lulus di Indonesia
                    </Text>
                  </Center>
                </Box>
                <Center >
                  <Text
                    mb='10px'
                    fontSize={{ base: '16px', lg: '36px', xl: '46px' }}
                    fontWeight='bold' color='white'>
                    Ke-{dataUnivInfo.rank_univ.toLocaleString()}
                  </Text>
                </Center>

              </GridItem>

              {/* Rata-rata waktu kelulusan */}
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
                  <Text
                    fontSize={{ base: '14px', lg: '14px', xl: '20px' }}
                    color="white">
                    Rata-rata waktu kelulusan
                  </Text>
                </Center>
                <Center>
                  <Text
                    fontSize={{ base: '16px', lg: '36px', xl: '46px' }}
                    fontWeight="bold" color="white">
                    {dataAvgGrad[0]?.persentase.toFixed(1)} Tahun
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
                    <Text mt='15px' lineHeight="20px"
                      fontSize={{ base: '14px', lg: '14px', xl: '20px' }}
                      color="white">
                      Persentase Mahasiswa
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      fontSize={{ base: '14px', lg: '14px', xl: '20px' }}
                      color="white">
                      Lulus Tepat Waktu
                    </Text>
                  </Center>
                </Box>

                <Center>
                  <Text
                    mb='10px'
                    fontSize={{ base: '16px', lg: '36px', xl: '46px' }}
                    fontWeight="bold" color="white">
                    {(newDataPie?.tepat_grad * 100).toFixed(0)}%
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
              gridTemplateColumns={{ base: '1fr', sm: '1fr', md: '1fr' }}
              gap={10}
              alignItems='center'
              justifyContent='center'
            >

              {/* Peringkat Ketepatan */}
              <GridItem
                w='100%'
                height={{ base: '100px', md: '100px', lg: '150px' }}
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <Box>
                  <Center>
                    <Text mt='15px' lineHeight="20px"
                      fontSize={{ base: '16px', sm: '16px', lg: '20px' }}
                      color="white">
                      Peringkat Ketepatan
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      fontSize={{ base: '16px', sm: '16px', lg: '20px' }}
                      color='white'>
                      Lulus di Indonesia
                    </Text>
                  </Center>
                </Box>
                <Center >
                  <Text
                    fontSize={{ base: '24px', sm: '24px', md: '24px', lg: '32px', xl: '46px' }}
                    fontWeight='bold' color='white'>
                    Ke-{dataUnivInfo.rank_univ.toLocaleString()}
                  </Text>
                </Center>

              </GridItem>

              {/* Rata-rata waktu kelulusan */}
              <GridItem
                w='100%'
                height={{ base: '100px', md: '100px', lg: '150px' }}
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
              >
                <Center>
                  <Text
                    fontSize={{ base: '16px', sm: '16px', lg: '20px' }}
                    color="white">
                    Rata-rata waktu kelulusan
                  </Text>
                </Center>
                <Center>
                  <Text
                    fontSize={{ base: '24px', sm: '24px', md: '24px', lg: '32px', xl: '46px' }}
                    fontWeight="bold" color="white">
                    {dataAvgGrad[0]?.persentase.toFixed(1)} Tahun
                  </Text>
                </Center>
              </GridItem>

              {/* Persentase Kelulusan */}
              <GridItem
                w='100%'
                height={{ base: '100px', md: '100px', lg: '150px' }}
                bg='#004AAD'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <Box>
                  <Center>
                    <Text mt='15px' lineHeight="20px"
                      fontSize={{ base: '16px', sm: '16px', lg: '20px' }}
                      color="white">
                      Persentase Mahasiswa
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      fontSize={{ base: '16px', sm: '16px', lg: '20px' }}
                      color="white">
                      Lulus Tepat Waktu
                    </Text>
                  </Center>
                </Box>

                <Center>
                  <Text
                    fontSize={{ base: '24px', sm: '24px', md: '24px', lg: '32px', xl: '46px' }}
                    fontWeight="bold" color="white">
                    {(newDataPie?.tepat_grad * 100).toFixed(0)}%
                  </Text>
                </Center>



              </GridItem>

            </Box>
          </Box>

          {/* 3 Chart */}
          <Box
            w='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'>

            {/* Normal */}
            <Box
              p={4}
              color='white'
              height='500px'
              marginTop='30px'
              borderRadius='md'
              display={{ base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }}
              alignItems='center'
              justifyContent='center'
              w={{ lg: '80%', xl: '100%' }}
            >
              {/* Bar Chart */}
              <GridItem
                paddingTop={2}
                w='100%'
                bg='white'
                height='450px'
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
                  <BarChartUniv defaultBar={newDataBar} selectYear={newYear} />
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
                  <StackedBarChart dataStacked={newDataStacked} />
                </GridItem>

              </GridItem>

              {/* Pie Chart */}
              <GridItem
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
                  <PieChartUniv dataPie={newDataPie} />
                </GridItem>

              </GridItem>

            </Box>

            {/* Small */}
            <Box
              p={4}
              color="white"
              height="1300px"
              marginTop="30px"
              borderRadius="md"
              display={{ base: 'grid', sm: 'grid', md: 'grid', lg: 'grid', xl: 'none' }}
              gridTemplateColumns={{ base: '1fr', sm: '1fr' }}
              alignItems="center"
              justifyContent="center"
              w='80%'
            >
              {/* Bar Chart */}
              <GridItem
                paddingTop={2}
                w='100%'
                bg="white"
                height="400px"
                borderRadius="2xl"
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                display="grid"
                alignItems="center"
                justifyContent="center"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='370px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <BarChartUniv defaultBar={newDataBar} selectYear={newYear} />
                </GridItem>
              </GridItem>

              {/* Stacked Bar */}
              <GridItem
                paddingTop={2}
                w='100%'
                bg='white'
                height='400px'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='370px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <StackedBarChart dataStacked={newDataStacked} />
                </GridItem>

              </GridItem>

              {/* Pie Chart */}
              <GridItem
                paddingTop={2}
                w='100%'
                bg='white'
                height='400px'
                borderRadius='2xl'
                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                display="grid"
                gridTemplateColumns="1fr"
              >
                <GridItem
                  w='100%'
                  height='370px'
                  justifySelf='center'
                  alignSelf='center'
                  padding='4px'
                >
                  <PieChartUniv dataPie={newDataPie} />
                </GridItem>

              </GridItem>

            </Box>
          </Box>


          {/* Ranking Prodi */}
          <Box w='60%%'>
            <Box p={4} color='white' marginTop='30px' borderRadius='md'>
              <GridItem
                w='80%%'
              >

                {/* Table */}
                <Center>
                  <table className="w-3/5 text-sm text-left rounded-2xl overflow-hidden shadow-lg mb-[100px]">
                    <thead className="bg-white h-[60px]">
                      <tr className="text-[#545454]">
                        <th scope="col" className="px-6 py-3 text-center sm:text-[20px] md:text-[20px] lg:text-[24px] xl:text-[26px]" colSpan="3">
                          Peringkat Ketepatan Waktu Lulus Prodi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-black sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[20px]">
                      <tr className='bg-white text-black border-[#EFF0F1] font-bold border-t-2 border-b-2 h-[60px]'>
                        <td scope="col" className="px-6 py-3 text-center">Peringkat</td>
                        <td scope="col" className="px-6 py-3 text-left">Nama Prodi</td>
                        <td scope="col" className="px-6 py-3 text-left">Persentase</td>
                      </tr>
                      {TableData.map((dataTable, index) => (
                        <tr key={index} className='mb-2  pb-[60px]'>
                          <td className="px-6 py-4 text-center">{dataTable.position}</td>
                          <td className="px-6 py-4 text-left">{dataTable.nm_prodi}</td>
                          <td className="px-6 py-4 text-left">{(dataTable.persentase * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Center>

                {/* <Center>
                  <table className="w-4/5 text-sm text-left rounded-2xl overflow-hidden shadow-lg mb-[100px]">
                    <thead className="bg-white h-[60px]">
                      <tr className="text-[#545454]">
                        <th scope="col" className="px-6 py-3 text-center sm:text-[20px] md:text-[20px] lg:text-[24px] xl:text-[26px]" colSpan="3">
                          Peringkat Ketepatan Waktu Lulus Prodi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-black sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[20px]">
                      <tr className='bg-white text-black border-[#EFF0F1] font-bold border-t-2 border-b-2 h-[60px]'>
                        <td scope="col" className="px-6 py-3 text-center">Peringkat</td>
                        <td scope="col" className="px-6 py-3 text-left">Nama Prodi</td>
                        <td scope="col" className="px-6 py-3 text-left">Persentase</td>
                      </tr>
                      <tr className='mb-2  pb-[60px]'>
                        <td className="px-6 py-4 text-center">1</td>
                        <td className="px-6 py-4 text-left">Fakultas Kedokteran</td>
                        <td className="px-6 py-4 text-left">94,4%</td>
                      </tr>
                      <tr className='mb-2  pb-[60px]'>
                        <td className="px-6 py-4 text-center">1</td>
                        <td className="px-6 py-4 text-left">Fakultas Kedokteran</td>
                        <td className="px-6 py-4 text-left">94,4%</td>
                      </tr>
                      <tr className='mb-2  pb-[60px]'>
                        <td className="px-6 py-4 text-center">1</td>
                        <td className="px-6 py-4 text-left">Fakultas Kedokteran</td>
                        <td className="px-6 py-4 text-left">94,4%</td>
                      </tr>
                    </tbody>
                  </table>
                </Center> */}

              </GridItem>

            </Box>
          </Box>

        </Container>
        <Footer />
      </div >
    </ChakraProvider >
  );
}