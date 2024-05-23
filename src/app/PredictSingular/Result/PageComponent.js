"use client"

import {
    ChakraProvider, Container, Flex, Center, Text,
    Box, GridItem, Grid, SimpleGrid
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import PieChartPredict from "../../../component/PieChartPredict";
import LineChartEx from "../../../component/LineChartEx";
import LineChartEx2 from "../../../component/LineChartEx2";
import '../../styles.css';
import Footer from "@/src/component/footer";

export default function PageComponent(props) {
    const { data } = props;

    const univProdi = JSON.parse(localStorage.getItem('formData'));
    const dataSKST = JSON.parse(localStorage.getItem('SKST'));
    const dataIPK = JSON.parse(localStorage.getItem('IPKT'));
    const predictResult = JSON.parse(localStorage.getItem('PREDICTRES')).prediction;
    const sksNeeded = JSON.parse(localStorage.getItem('SKSNEEDED'));
    const ketepatanGradTime = JSON.parse(localStorage.getItem('GRADTIME'));
    const lulusHandler = () => {
        if (predictResult === true) {
            return " Tepat Waktu";
        } else {
            return " Tidak Tepat Waktu";
        }
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
                    <Box p={4} >
                        <Flex color='black' >
                            <Box
                                p='4'
                                width='300px'
                                height='100px'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                            >
                                <Text fontSize='30px' color='black'>
                                    Result Predict
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Box position="relative" >
                        {/* Lulus Card */}
                        <Center>
                            <Box
                                p={4}
                                bg='#3161A3'
                                width="60%"
                                borderRadius='md'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                marginBottom='20px'
                            >
                                <Box p="4" height="100px" display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                    <Text fontSize="30px" color='white' fontWeight='bold'>
                                        Anda Diprediksi Untuk Lulus
                                        <span style={{ color: predictResult ? "#82ca9d" : "#FF6961" }}>
                                            {lulusHandler()}
                                        </span>
                                    </Text>
                                </Box>
                            </Box>
                        </Center>

                        {/* Lulus Card */}
                        <Center>
                            <Box
                                p={4}
                                bg='#3161A3'
                                width="60%"
                                borderRadius='md'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                            >
                                <Box p="4" height="150px" alignItems="center" justifyContent="center" borderRadius='md'>
                                    <Center>
                                        <Text fontSize="30px" color='white' fontWeight='bold'>
                                            Dari prodi {univProdi.prodiInput}, {univProdi.univInput}.
                                        </Text>

                                    </Center>
                                    <Center>
                                        <Text fontSize="24px" color='white' fontWeight='bold'>
                                            Anda disarankan untuk mengambil minimal {Math.ceil(sksNeeded[0]?.sks_needed)} SKS
                                        </Text>
                                    </Center>
                                    <Center>
                                        <Text fontSize="24px" color='white' fontWeight='bold'>
                                            pada semester 5, 6, 7, dan 8 agar ekspektasi lulus tepat waktu tercapai.
                                        </Text>
                                    </Center>
                                </Box>
                            </Box>
                        </Center>

                        {/* Chart Card 1 */}
                        <Box w='100%'>
                            <Box p={4} color='white' height='450px' marginTop='20px' borderRadius='md'>
                                <GridItem
                                    w='100%'
                                    h='420px'
                                    bg='#3161A3'
                                    borderRadius='md'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                    display="grid"
                                    gridTemplateColumns="1fr 1fr" // Two columns
                                >
                                    {/* SKS */}
                                    <GridItem
                                        w='90%'
                                        h='90%'
                                        justifySelf='center'
                                        alignSelf='center'
                                        padding='4px' // Add padding
                                    >
                                        <LineChartEx dataSKST={dataSKST} />
                                    </GridItem>

                                    {/* IPK */}
                                    <GridItem
                                        w='90%'
                                        h='90%'
                                        justifySelf='center'
                                        alignSelf='center'
                                    >
                                        <LineChartEx2 dataSKST={dataIPK} />
                                    </GridItem>
                                </GridItem>

                            </Box>

                        </Box>

                        {/* Chart Card 2 */}
                        <Box p={4} color='white' height='450px' marginBottom='20px' borderRadius='md'>
                            <Grid
                                templateColumns="1fr"
                                templateRows="1fr"
                                height="100%"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Center>
                                    {/* Peringkat Ketepatan */}
                                    <GridItem
                                        w='40%'
                                        h='400px'
                                        bg='#3161A3'
                                        borderRadius='md'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                    >
                                        <GridItem
                                            w='100%'
                                            h='100%'
                                            justifySelf='center'
                                            alignSelf='center'
                                            padding='4px'
                                        >
                                            <PieChartPredict dataPie={ketepatanGradTime} />

                                        </GridItem>
                                    </GridItem>
                                </Center>


                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <Footer />

            </div >
        </ChakraProvider >
    );


}