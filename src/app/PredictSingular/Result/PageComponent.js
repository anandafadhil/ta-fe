"use client"

import {
    ChakraProvider, Container, Flex, Center, Text,
    Box, GridItem
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import BarChartExample from "../../../component/BarChartExample"
import LineChartExample from "../../../component/LineChartExample"
import '../../styles.css';
import Footer from "@/src/component/footer";

export default function PageComponent(props) {
    const { data } = props;
    const router = useRouter();
    const handleUploadClick = () => {
        router.push('/PredictBulk');
    };
    const predictResult = JSON.parse(localStorage.getItem('PREDICTRES')).prediction;

    const [formData, setFormData] = useState({
        sem1sksSemester: '',
        sem1sksDPO: '',
        sem1ipsKumulatif: '',
        sem2sksSemester: '',
        sem2sksDPO: '',
        sem2ipsKumulatif: '',
        sem3sksSemester: '',
        sem3sksDPO: '',
        sem3ipsKumulatif: '',
        sem4sksSemester: '',
        sem4sksDPO: '',
        sem4ipsKumulatif: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here, for example:
        console.log('Form submitted:', formData);
        // Reset form data if needed
        setFormData({
            sem1sksSemester: '',
            sem1sksDPO: '',
            sem1ipsKumulatif: '',
            sem2sksSemester: '',
            sem2sksDPO: '',
            sem2ipsKumulatif: '',
            sem3sksSemester: '',
            sem3sksDPO: '',
            sem3ipsKumulatif: '',
            sem4sksSemester: '',
            sem4sksDPO: '',
            sem4ipsKumulatif: '',
        });
        router.push('/PredictSingular/Result');

    };

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                    h='89vh'>
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
                                bg="#13ABC4"
                                width="60%"
                                borderRadius='md'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                            >
                                <Box p="4" height="100px" display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                    <Text fontSize="30px" color="black">
                                        Anda Diprediksi Untuk Lulus
                                        <span style={{ color: predictResult ? "green" : "red" }}>
                                            {lulusHandler()}
                                        </span>
                                    </Text>
                                </Box>
                            </Box>
                        </Center>


                        <Box w='100%'>
                            {/* IP Input */}
                            <form onSubmit={handleSubmit}>
                                <Box p={4} color='white' height='450px' marginTop='20px' borderRadius='md'>
                                    {/* Semester 1 */}
                                    <GridItem
                                        w='100%'
                                        h='420px'
                                        bg='#13ABC4'
                                        borderRadius='md'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                        display="grid"
                                        gridTemplateColumns="1fr 1fr" // Two columns
                                    >
                                        <GridItem
                                            w='90%'
                                            h='90%'
                                            justifySelf='center'
                                            alignSelf='center'
                                            padding='4px' // Add padding
                                        >
                                            <BarChartExample />
                                        </GridItem>
                                        <GridItem
                                            w='90%'
                                            h='90%'
                                            justifySelf='center'
                                            alignSelf='center'
                                        >
                                            <LineChartExample />
                                        </GridItem>
                                    </GridItem>

                                </Box>

                            </form>
                        </Box>

                    </Box>
                </Container>
                <Footer />

            </div >
        </ChakraProvider >
    );


}