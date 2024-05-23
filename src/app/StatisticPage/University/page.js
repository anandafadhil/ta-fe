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
import BarChartUniv from "../../../component/BarChartUniv"
import PieChartUniv from "../../../component/PieChartUniv"
import Footer from "../../../component/footer"
import "../../styles.css";
import StackedBarChart from '../../../component/StackedBarChart';
import { fetchData, fetchDatawithIDUniv, fetchDatawithIDYear, fetchDatawithYear } from '@/src/api/fetch';
import Swal from 'sweetalert2';

export default function UniversityStatistic() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prodiInput: '',
    prodiInputLabel: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [optionsProdi, setOptionsProdi] = useState([]);
  const [dataUnivInfo, setUnivInfo] = useState([]);
  const [dataAvgGrad, setAvgGrad] = useState([]);
  const [newDataBar, setDataBar] = useState([]);
  const [newDataStacked, setDataStack] = useState([]);
  const [newDataPie, setDataPie] = useState([]);

  const idUnivStat = typeof window !== 'undefined' ? localStorage.getItem("IDUNIVSTAT") : undefined;
  const parsId = JSON.parse(idUnivStat)

  const handleGetInfo = async () => {
    const selected_id_univ = parsId
    const univInfo = await fetchData(`/get-univ-info/${selected_id_univ}`)
    setUnivInfo(univInfo)
  }

  const handleGetAvgGrad = async () => {
    const selected_id_univ = parsId
    const getAvgGrad = await fetchData(`/get-avg-grad-time-univ-filter/${selected_id_univ}`)
    setAvgGrad(getAvgGrad)
  }
  const handleSearchClick = () => {
    const prodiID = formData.prodiInput;
    localStorage.setItem('IDPRODISTAT', JSON.stringify(prodiID));
    router.push(`/StatisticPage/Prodi`);
  };

  const handleProdi = async () => {
    const selected_id_univ = parsId
    const dataProdi = await fetchData(`/prodi/${selected_id_univ}`);

    const optionsProdi = dataProdi.prodi.map(([id, name]) => ({
      value: id,
      label: name
    }));
    setOptionsProdi(optionsProdi);
  };

  const handleChangeProdi = async (selectedOption, fieldName) => {
    if (selectedOption) {
      const { value, label } = selectedOption;
      setFormData({
        ...formData,
        [`${fieldName}Input`]: value,
        [`${fieldName}InputLabel`]: label
      });
    } else {
      setFormData({
        ...formData,
        [`${fieldName}Input`]: '',
        [`${fieldName}InputLabel`]: ''
      });
    }
  };

  const handleGetBar = async () => {
    const dataBar = await fetchDatawithIDYear({
      endpoint: '/get-dist-grad-univ-filter',
      selectedIDUniv: parsId,
      selectedYear: 'All',
    })

    setDataBar(dataBar);
  }

  const handleGetStacked = async () => {
    const dataStacked = await fetchDatawithIDUniv({
      endpoint: '/get-prog-grad-time-univ-filter',
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
      endpoint: '/get-ketepatan-grad-time-univ-filter',
      selectedYear: parsId,
    })
    const transformedAllTimeEntry = dataPie ? {
      selected_year: dataPie[0].tahun_angkatan,
      tepat_grad: dataPie[0].persentase,
      tidak_tepat_grad: 1 - dataPie[0].persentase,
    } : null;
    setDataPie(transformedAllTimeEntry);
  }

  const [TableData, setTableData] = useState([]);
  const handleGetRanking = async () => {
    const dataRank = await fetchDatawithIDUniv({
      endpoint: '/get-prodi-ranking',
      selectedIDUniv: parsId,
    })
    setTableData(dataRank);
  }

  const splitIndex = Math.ceil(TableData.length / 2);
  const leftData = TableData.slice(0, splitIndex);
  const rightData = TableData.slice(splitIndex);

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
    return <div></div>; // Show loading indicator while data is being fetched
  }



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
                width='600px'
                height='50px'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <Text fontSize='30px' color='black'>
                  Statistik {dataUnivInfo.nm_univ}
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Prodi Search's Box */}
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

              {/* Prodi Search */}
              <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                <Box p='1' ml='1' color='black' fontWeight='bold'>
                  Nama Program Studi
                </Box>
                <Box p='2'>
                  <Select
                    className="w-full"
                    name="univInput"
                    value={formData.prodiInputLabel}
                    onChange={(option) => handleChangeProdi(option, 'prodi')}
                    options={optionsProdi}
                    placeholder={formData.prodiInputLabel ? formData.prodiInputLabel : 'Input Prodi Pilihan'}
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

              {/* Button */}
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

          {/* Info Univ */}
          <Box p={4} color='white' height='200px' marginTop='30px' borderRadius='md'>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>

              {/* Peringkat Ketepatan */}
              <GridItem
                w='100%'
                h='170px'
                bg='#3161A3'
                borderRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
              >
                <Grid
                  templateRows='repeat(2, 1fr)'
                  gap={4}
                  h='100%'
                  alignItems='center'
                >
                  <GridItem row='1' fontSize='18px' fontWeight='bold' justifySelf='center' alignSelf='center'>
                    Peringkat ketepatan waktu lulus
                  </GridItem>
                  <SimpleGrid row='2' w='100%' alignItems='center' >
                    <Box ml='2' justifySelf='center' alignSelf='center' >
                      {dataUnivInfo.rank_univ}
                    </Box>
                    {/* <Box p='2'>
                    </Box> */}
                  </SimpleGrid>

                </Grid>
              </GridItem>


              {/* Tahun Berdiri */}
              <GridItem
                w='100%'
                h='170px'
                bg='#3161A3'
                borderRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
              >
                <Grid
                  templateRows='repeat(2, 1fr)'
                  gap={4}
                  h='100%'
                  alignItems='center'
                >
                  <GridItem row='1' justifySelf='center' alignSelf='center'>
                    Tahun berdiri
                  </GridItem>
                  <SimpleGrid row='2' w='100%' alignItems='center'>
                    <Box ml='2' justifySelf='center' alignSelf='center' >
                      {dataUnivInfo.tahun_berdiri_univ}
                    </Box>
                    {/* <Box p='2' textColor={'black'}>

                    </Box> */}
                  </SimpleGrid>

                </Grid>
              </GridItem>

              {/* Avg Time to Grad */}
              <GridItem
                w='100%'
                h='170px'
                bg='#3161A3'
                borderRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
              >
                <Grid
                  templateRows='repeat(2, 1fr)' gap={4}
                  h='100%'
                  alignItems='center'
                >
                  <GridItem row='1' justifySelf='center' alignSelf='center'>
                    Average Time to Graduate
                  </GridItem>
                  {/* Adjusted SimpleGrid to have multiple columns */}
                  <SimpleGrid row='2' w='100%' alignItems='center'>
                    <Box ml='2' justifySelf='center' alignSelf='center' >
                      {dataAvgGrad[0]?.persentase.toFixed(1)} Tahun
                    </Box>
                    {/* <Box p='2'>

                    </Box> */}
                  </SimpleGrid>

                </Grid>
              </GridItem>

            </Grid>
          </Box>


          {/* Chart Card */}
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
                  <BarChartUniv defaultBar={newDataBar} />
                </GridItem>

                {/* Stacked Bar Chart */}
                <GridItem
                  w='90%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
                >
                  <StackedBarChart dataStacked={newDataStacked} />
                </GridItem>

                {/* Pie Chart */}
                <GridItem
                  w='90%'
                  height='450px'
                  justifySelf='center'
                  alignSelf='center'
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
                bg='#3161A3'
                borderRadius='md'
                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                display="grid"
                gridTemplateColumns="1fr" // Two columns
              >
                <Box bg='#3161A3' w='100%'>
                  <Center>

                    <Text fontSize='30px' fontWeight='bold' color='white'>
                      Ranking Ketepatan Waktu Lulus Seluruh Mahasiswa Indonesia
                    </Text>
                  </Center>

                </Box>

                {/* Table */}
                <Center>
                  <table className="w-3/5 text-sm text-left my-4 rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-[#13ABC4] rounded-tl-lg rounded-tr-lg">
                      <tr className="first:rounded-tl-lg last:rounded-tr-lg border-2">
                        <th scope="col" className="px-6 py-3 text-center">Peringkat</th>
                        <th scope="col" className="px-6 py-3 text-center">Prodi</th>
                        <th scope="col" className="px-6 py-3 text-center">Persentase Tepat Waktu</th>
                        <th scope="col" className="px-6 py-3 text-center"></th> {/* Divider Column */}
                        <th scope="col" className="px-6 py-3 text-center">Peringkat</th>
                        <th scope="col" className="px-6 py-3 text-center">Prodi</th>
                        <th scope="col" className="px-6 py-3 text-center">Persentase Tepat Waktu</th>
                      </tr>
                    </thead>
                    <tbody className='bg-white text-black'>
                      {leftData.map((dataTable, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-center">{dataTable.position}</td>
                          <td className="px-6 py-4 text-center">{dataTable.nm_prodi}</td>
                          <td className="px-6 py-4 text-center">{(dataTable.persentase * 100).toFixed(2)}%</td>
                          <td className="border-r border-gray-400"></td> {/* Divider Cell */}
                          {rightData[index] ? (
                            <>
                              <td className="px-6 py-4 text-center">{rightData[index].position}</td>
                              <td className="px-6 py-4 text-center">{rightData[index].nm_prodi}</td>
                              <td className="px-6 py-4 text-center">{(rightData[index].persentase * 100).toFixed(2)}%</td>
                            </>
                          ) : (
                            <>
                              <td className="px-6 py-4 text-center"></td>
                              <td className="px-6 py-4 text-center"></td>
                              <td className="px-6 py-4 text-center"></td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Center>

              </GridItem>

            </Box>
          </Box>

        </Container>
        <Footer />
      </div >
    </ChakraProvider >
  );
}