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
    const [dataAvgGrad, setAvgGrad] = useState([]);
    const [dataAvgIPK, setAvgIPK] = useState([]);
    const [newDataBar, setDataBar] = useState([]);
    const [newDataSKS, setDataSKS] = useState([]);
    const [newDataStacked, setDataStack] = useState([]);
    const [newDataPie, setDataPie] = useState([]);

    const idProdiStat = typeof window !== 'undefined' ? localStorage.getItem("IDPRODISTAT") : undefined;
    const parsId = JSON.parse(idProdiStat)

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
                                    Statistik {dataProdiInfo.nm_prodi}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    {/* Info Univ */}
                    <Box p={4} color='white' height='200px' marginTop='30px' borderRadius='md'>
                        <Grid templateColumns='repeat(4, 1fr)' gap={6}>

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
                                            {dataProdiInfo.rank_prodi}
                                        </Box>

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
                                    <GridItem row='1' fontSize='18px' fontWeight='bold' justifySelf='center' alignSelf='center'>
                                        Tahun berdiri
                                    </GridItem>
                                    <SimpleGrid row='2' w='100%' alignItems='center'>
                                        <Box ml='2' justifySelf='center' alignSelf='center' >
                                            {dataProdiInfo.tahun_berdiri_prodi}
                                        </Box>

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
                                    <GridItem row='1' fontSize='18px' fontWeight='bold' justifySelf='center' alignSelf='center'>
                                        Average Time to Graduate
                                    </GridItem>
                                    {/* Adjusted SimpleGrid to have multiple columns */}
                                    <SimpleGrid row='2' w='100%' alignItems='center'>
                                        <Box ml='2' justifySelf='center' alignSelf='center' >
                                            {dataAvgGrad.avg_grad_time.toFixed(2)} Tahun
                                        </Box>
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
                                    <GridItem row='1' fontSize='18px' fontWeight='bold' justifySelf='center' alignSelf='center'>
                                        Average Indeks Prestasi Kumulatif
                                    </GridItem>
                                    {/* Adjusted SimpleGrid to have multiple columns */}
                                    <SimpleGrid row='2' w='100%' alignItems='center' >
                                        <Box ml='2' justifySelf='center' alignSelf='center' >
                                            IPK Overall : {dataAvgIPK[6]?.avg_ipk_overall.toFixed(2)}
                                        </Box>
                                        <Box ml='2' justifySelf='center' alignSelf='center' >
                                            IPK Tepat Waktu : {dataAvgIPK[6]?.avg_ipk_tepat_waktu.toFixed(2)}
                                        </Box>
                                        <Box ml='2' justifySelf='center' alignSelf='center' >
                                            IPK Tidak Tepat Waktu : {dataAvgIPK[6]?.avg_ipk_telat.toFixed(2)}
                                        </Box>
                                    </SimpleGrid>

                                </Grid>
                            </GridItem>

                        </Grid>
                    </Box>

                    {/* Chart Card 1 */}
                    <Box w='100%'>
                        <Box p={4} color='white' height='500px' marginTop='30px' borderRadius='md'>
                            <GridItem
                                w='100%'
                                height='450px'
                                bg='#3161A3'
                                borderRadius='md'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                display="grid"
                                gridTemplateColumns="1fr 1fr" // Two columns
                            >
                                {/* Bar Chart */}
                                <GridItem
                                    w='90%'
                                    height='450px'
                                    justifySelf='center'
                                    alignSelf='center'
                                    padding='4px' // Add padding
                                >
                                    <BarChartExample2 defaultBar={newDataBar} />
                                </GridItem>

                                {/* Stacked Bar Chart */}
                                <GridItem
                                    w='90%'
                                    height='450px'
                                    justifySelf='center'
                                    alignSelf='center'
                                >
                                    <BarChartSKS sksBar={newDataSKS} />
                                </GridItem>
                            </GridItem>

                        </Box>
                    </Box>

                    {/* Chart Card 2 */}
                    <Box w='100%'>
                        <Box p={4} color='white' height='500px' marginTop='30px' borderRadius='md'>
                            <GridItem
                                w='100%'
                                height='450px'
                                bg='#3161A3'
                                borderRadius='md'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                display="grid"
                                gridTemplateColumns="1fr 1fr" // Two columns
                            >

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

                </Container>
                <Footer />
            </div >
        </ChakraProvider >
    );
}