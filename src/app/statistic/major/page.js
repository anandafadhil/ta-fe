"use client"
import Image from 'next/image';
import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem,
} from "@chakra-ui/react";
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import BarChartSKS from "@/src/component/BarChartSKS"
import PieChartUniv from "@/src/component/PieChartUniv"
import Footer from "@/src/component/footer"
import "../../styles.css";
import StackedBarChart from '@/src/component/StackedBarChart';
import BarChartProdi from '@/src/component/BarChartProdi';
import useStore from '@/src/store';
import { fetchData, fetchDatawithIDUniv, fetchDatawithIDYear, fetchDatawithYear } from '@/src/api/fetch';
import Swal from 'sweetalert2';

export default function Major() {
    const formDatass = useStore((state) => state.formDatass);
    const parsId = formDatass?.prodiInput;

    const [isLoading, setIsLoading] = useState(true);
    const [idProdi, setID] = useState([]);
    const [dataProdiInfo, setProdiInfo] = useState([]);
    const [newYear, setNewYear] = useState([]);
    const [dataAvgGrad, setAvgGrad] = useState([]);
    const [dataAvgIPK, setAvgIPK] = useState([]);
    const [newDataBar, setDataBar] = useState([]);
    const [newDataSKS, setDataSKS] = useState([]);
    const [newDataStacked, setDataStack] = useState([]);
    const [newDataPie, setDataPie] = useState([]);

    const handleGetYear = async () => {
        const selectYear = await fetchData('/select-year');
        setNewYear(selectYear);
    }

    const handleGetInfo = async () => {
        const selected_id_prodi = parsId
        const univInfo = await fetchData(`/prodi-information/${selected_id_prodi}`)
        setProdiInfo(univInfo)
    }

    const handleGetAvgGrad = async () => {
        const selected_id_prodi = parsId
        const getAvgGrad = await fetchData(`/average-grad-time-prodi/${selected_id_prodi}`)

        setAvgGrad(getAvgGrad)
    }

    const handleGetAvgIPK = async () => {
        const selected_id_prodi = parsId
        const getAvgIPK = await fetchData(`/avg-ipk/${selected_id_prodi}`)

        setAvgIPK(getAvgIPK)
    }

    const handleGetBar = async () => {
        const dataBar = await fetchDatawithIDYear({
            endpoint: '/grad-time-distribution-prodi',
            selectedIDUniv: parsId,
            selectedYear: 'All',
        })
        setDataBar(dataBar);
        setID(parsId);
    }

    const handleGetSKS = async () => {
        const selected_id_prodi = parsId
        const dataSKS = await fetchData(`/avg-sks/${selected_id_prodi}`)
        console.log(dataSKS)

        setDataSKS(dataSKS);
    }


    const handleGetStacked = async () => {
        const dataStacked = await fetchDatawithIDUniv({
            endpoint: '/grad-progression-prodi',
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
            endpoint: '/grad-timeliness-prodi',
            selectedYear: parsId,
        })
        const transformedAllTimeEntry = dataPie ? {
            tepat_grad: dataPie.avg_grad_time,
            tidak_tepat_grad: 1 - dataPie.avg_grad_time,
        } : null;
        setDataPie(transformedAllTimeEntry);
    }

    const avgGradTime = dataAvgGrad.avg_grad_time ?? 0;
    const avgIpkOverall = dataAvgIPK[0]?.avg_ipk_overall ?? 0;
    const avgIpkTepatWaktu = dataAvgIPK[0]?.avg_ipk_tepat_waktu ?? 0;
    const avgIpkTelat = dataAvgIPK[0]?.avg_ipk_telat ?? 0;
    const tepatGradPercentage = (newDataPie?.tepat_grad * 100) ?? 0;

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
                                            Statistik Prodi
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
                                            {dataProdiInfo.nm_prodi}
                                        </Text>
                                    </Center>
                                    <Center>
                                        <Text lineHeight='10px'
                                            fontSize={{ base: '18px', sm: '18px', md: '24px', lg: '26px', xl: '26px' }}
                                            color="black" fontWeight="bold">
                                            <Text as="span" >
                                                {dataProdiInfo.nm_univ}
                                            </Text>{" "} | Tahun Berdiri {dataProdiInfo.tahun_berdiri_prodi}
                                        </Text>
                                    </Center>
                                </Box>
                            </Box>
                        </Center>
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
                                            Lulus di Universitas
                                        </Text>
                                    </Center>
                                </Box>
                                <Center >
                                    <Text
                                        fontSize={{ base: '16px', lg: '36px', xl: '46px' }}
                                        fontWeight='bold' color='white'>
                                        Ke-{dataProdiInfo.rank_prodi}
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
                                        {avgGradTime.toFixed(1)} Tahun
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
                                        fontWeight="bold" color="white">                                        {tepatGradPercentage.toFixed(0)}%
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
                                            Lulus di Universitas
                                        </Text>
                                    </Center>
                                </Box>
                                <Center >
                                    <Text
                                        fontSize={{ base: '24px', sm: '24px', md: '24px', lg: '32px', xl: '46px' }}
                                        fontWeight='bold' color='white'>                                        Ke-{dataProdiInfo.rank_prodi}
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
                                        {avgGradTime.toFixed(1)} Tahun
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
                                        {tepatGradPercentage.toFixed(0)}%
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
                                    <BarChartProdi defaultBar={newDataBar} selectYear={newYear} idProdi={idProdi} />
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
                                                {avgIpkOverall.toFixed(2)}
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
                                                {avgIpkTepatWaktu.toFixed(2)}
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
                                                {avgIpkTelat.toFixed(2)}
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