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
import BarChartSKS from "../../../component/BarChartSKS"
import PieChartUniv from "../../../component/PieChartUniv"
import Footer from "../../../component/footer"
import "../../styles.css";
import StackedBarChart from '../../../component/StackedBarChart';
import { fetchData, fetchDatawithIDUniv, fetchDatawithIDYear, fetchDatawithYear } from '@/src/api/fetch';
import Swal from 'sweetalert2';
import BarChartExample2 from '@/src/component/BarChartExample2';

export default function UniversityStatistic() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        prodiInput: '',
        prodiInputLabel: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [optionsProdi, setOptionsProdi] = useState([]);
    const [dataProdiInfo, setProdiInfo] = useState([]);
    const [newYear, setNewYear] = useState([]);
    const [dataAvgGrad, setAvgGrad] = useState([]);
    const [dataAvgIPK, setAvgIPK] = useState([]);
    const [newDataBar, setDataBar] = useState([]);
    const [newDataSKS, setDataSKS] = useState([]);
    const [newDataStacked, setDataStack] = useState([]);
    const [newDataPie, setDataPie] = useState([]);

    const idProdiStat = typeof window !== 'undefined' ? localStorage.getItem("IDPRODISTAT") : undefined;
    const parsId = JSON.parse(idProdiStat)

    const handleGetYear = async () => {
        const selectYear = await fetchData('/select-year');
        setNewYear(selectYear);
    }

    const handleGetInfo = async () => {
        const selected_id_prodi = parsId
        const univInfo = await fetchData(`/get-prodi-info/${selected_id_prodi}`)
        setProdiInfo(univInfo)
    }

    const handleGetAvgGrad = async () => {
        const selected_id_prodi = parsId
        const getAvgGrad = await fetchData(`/get-avg-grad-time-prodi-filter/${selected_id_prodi}`)

        setAvgGrad(getAvgGrad)
    }

    const handleGetAvgIPK = async () => {
        const selected_id_prodi = parsId
        const getAvgIPK = await fetchData(`/get-avg-ipk/${selected_id_prodi}`)

        setAvgIPK(getAvgIPK)
    }

    const handleGetBar = async () => {
        const dataBar = await fetchDatawithIDYear({
            endpoint: '/get-dist-grad-prodi-filter',
            selectedIDUniv: parsId,
            selectedYear: 'All',
        })
        console.log(dataBar)

        setDataBar(dataBar);
    }

    const handleGetSKS = async () => {
        const selected_id_prodi = parsId
        const dataSKS = await fetchData(`/get-avg-sks/${selected_id_prodi}`)
        console.log(dataSKS)

        setDataSKS(dataSKS);
    }


    const handleGetStacked = async () => {
        const dataStacked = await fetchDatawithIDUniv({
            endpoint: '/get-prog-grad-time-prodi-filter',
            selectedIDUniv: parsId,
        })
        console.log(dataStacked)
        const transformedData = dataStacked.map(item => ({
            selected_year: item.tahun_angkatan,
            tepat_grad: item.avg_grad_time,
            tidak_tepat_grad: 1 - item.avg_grad_time,
        }));
        setDataStack(transformedData);
    }

    const handleGetPie = async () => {
        const dataPie = await fetchDatawithYear({
            endpoint: '/get-ketepatan-grad-time-filter-prodi',
            selectedYear: parsId,
        })
        const transformedAllTimeEntry = dataPie ? {
            tepat_grad: dataPie.avg_grad_time,
            tidak_tepat_grad: 1 - dataPie.avg_grad_time,
        } : null;
        setDataPie(transformedAllTimeEntry);
    }


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
            await handleGetInfo();
            await handleGetAvgGrad();
            await handleGetAvgIPK();
            await handleGetBar();
            await handleGetSKS();
            await handleGetStacked();
            await handleGetPie();

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
                    bg='#EFF0F1'
                    maxWidth='100vw'
                    w='100%'
                    h='100%'>

                    {/* Header */}
                    <Box p={4} position='relative'>
                        <Center>
                            <Box
                                mt='40px'
                                p='4'
                                width='100%'
                                height='250px'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                            >

                                <Box>
                                    <Center>
                                        <Text lineHeight='20px' fontSize="30px" color="black" >
                                            Statistik Prodi
                                        </Text>
                                    </Center>

                                    <Center>
                                        <Text fontSize="80px" color="black" fontWeight="bold">
                                            {dataProdiInfo.nm_prodi}
                                        </Text>
                                    </Center>
                                    <Center>
                                        <Text lineHeight='10px' fontSize="26px" color="black" fontWeight="bold">
                                            <Text as="span" textDecoration="underline">
                                                {dataProdiInfo.nm_univ}
                                            </Text>{" "} | Tahun Berdiri {dataProdiInfo.tahun_berdiri_prodi}
                                        </Text>
                                    </Center>
                                </Box>
                            </Box>
                        </Center>
                    </Box>

                    {/* Inforation in Text */}
                    <Box w='100%'>
                        <Box
                            p={4}
                            color='white'
                            height='200px'
                            marginTop='20px'
                            borderRadius='2xl'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >

                            {/* Peringkat Ketepatan */}
                            <GridItem
                                w='20%'
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
                                            Peringkat Ketepatan
                                        </Text>
                                    </Center>
                                    <Center>
                                        <Text fontSize='20px' color='white'>
                                            Lulus di Indonesia
                                        </Text>
                                    </Center>
                                </Box>
                                <Center >
                                    <Text fontSize='46px' fontWeight='bold' color='white'>
                                        Ke-{dataProdiInfo.rank_prodi}
                                    </Text>
                                </Center>

                            </GridItem>

                            {/* Rata-rata waktu kelulusan */}
                            <GridItem
                                ml='20px'
                                w='20%'
                                height='150px'
                                bg='#004AAD'
                                borderRadius='2xl'
                                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.5)'
                                display="grid"
                            >
                                <Center>
                                    <Text fontSize="20px" color="white">
                                        Rata-rata waktu kelulusan
                                    </Text>
                                </Center>
                                <Center>
                                    <Text fontSize="46px" fontWeight="bold" color="white">
                                        {dataAvgGrad.avg_grad_time.toFixed(1)} Tahun
                                    </Text>
                                </Center>
                            </GridItem>

                            {/* Persentase Kelulusan */}
                            <GridItem
                                ml='20px'
                                w='20%'
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
                                    <Text fontSize="46px" fontWeight="bold" color="white">
                                        {(newDataPie?.tepat_grad * 100).toFixed(0)}%
                                    </Text>
                                </Center>



                            </GridItem>

                        </Box>
                    </Box>

                    {/* First Card Chart */}
                    <Box w='100%' p={0}>
                        <Box
                            p={4}
                            color='white'
                            height='500px'
                            marginTop='50px'
                            borderRadius='md'
                            display='flex'
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
                                    <BarChartExample2 defaultBar={newDataBar} selectYear={newYear} />
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
                                    <PieChartUniv dataPie={newDataPie} />
                                </GridItem>

                            </GridItem>

                        </Box>
                    </Box>

                    {/* Second Chart Card */}
                    <Box
                        h='665px'
                        w='100%'
                        display='flex'
                        flexDirection='row'
                    >
                        <Box
                            p={2}
                            paddingTop={2}
                            w='100%'
                            height='550px'
                            borderRadius='2xl'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            gap="30px"
                        >
                            {/* Bar Chart */}
                            <GridItem
                                w='75%'
                                height='550px'
                                justifySelf='center'
                                alignSelf='center'
                                display='flex'
                                padding='4px'
                                bg='white'
                                borderRadius='2xl'
                                boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                            >
                                <BarChartSKS sksBar={newDataSKS} />
                            </GridItem>

                            {/* Information IPK Side */}
                            <Box
                                h='550px'
                                p={0}
                                w='20%'
                            >
                                <Box
                                    p={0}
                                    w='100%'
                                    h='100%'
                                    color="black"
                                    borderRadius='md'
                                    display='flex'
                                    flexDirection='column'

                                    gap='50px'
                                >

                                    {/* IPK Overall */}
                                    <GridItem
                                        w='100%'
                                        height='150px'
                                        bg='white'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                                        display="grid"
                                        gridTemplateColumns="1fr"
                                    >
                                        <Box>
                                            <Center>
                                                <Text mt='15px' lineHeight="20px" fontSize="20px" color="black">
                                                    Rerata IPK
                                                </Text>
                                            </Center>
                                            <Center>
                                                <Text fontSize="20px" fontWeight="bold" color="black">
                                                    Overall
                                                </Text>
                                            </Center>
                                        </Box>
                                        <Center >
                                            <Text fontSize='46px' fontWeight='bold'>
                                                {dataAvgIPK[6]?.avg_ipk_overall.toFixed(2)}
                                            </Text>
                                        </Center>

                                    </GridItem>

                                    {/* Rata-rata waktu kelulusan */}
                                    <GridItem
                                        bg='white'
                                        w='100%'
                                        height='150px'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                                        display="grid"
                                        gridTemplateColumns="1fr"
                                    >
                                        <Box>
                                            <Center>
                                                <Text mt='15px' lineHeight="20px" fontSize="20px" color="black">
                                                    Rerata IPK
                                                </Text>
                                            </Center>
                                            <Center>
                                                <Text fontSize="20px" fontWeight="bold" color="black">
                                                    Lulus Tepat Waktu
                                                </Text>
                                            </Center>
                                        </Box>
                                        <Center>
                                            <Text fontSize="46px" fontWeight="bold">
                                                {dataAvgIPK[6]?.avg_ipk_tepat_waktu.toFixed(2)}
                                            </Text>
                                        </Center>
                                    </GridItem>

                                    {/* Persentase Kelulusan */}
                                    <GridItem
                                        bg='white'
                                        w='100%'
                                        height='150px'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                                        display="grid"
                                        gridTemplateColumns="1fr"
                                    >
                                        <Box>
                                            <Center>
                                                <Text mt='15px' lineHeight="20px" fontSize="20px" color="black">
                                                    Rerata IPK
                                                </Text>
                                            </Center>
                                            <Center>
                                                <Text fontSize="20px" fontWeight="bold" color="black">
                                                    Lulus Terlambat
                                                </Text>
                                            </Center>
                                        </Box>
                                        <Center>
                                            <Text fontSize="46px" fontWeight="bold" >
                                                {dataAvgIPK[6]?.avg_ipk_telat.toFixed(2)}
                                            </Text>
                                        </Center>



                                    </GridItem>

                                </Box>
                            </Box>

                        </Box>


                    </Box>


                </Container>
                <Footer />
            </div >
        </ChakraProvider >
    );
}