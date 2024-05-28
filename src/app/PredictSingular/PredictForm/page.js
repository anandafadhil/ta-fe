"use client"

import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, useDisclosure,
} from "@chakra-ui/react";
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";

import '../../styles.css';
import Footer from "@/src/component/footer";
import { fetchDatawithIDUniv, postData } from "@/src/api/fetch";

export default function PredictForm() {
    const univOld = JSON.parse(localStorage.getItem('formData'));
    const router = useRouter();
    const [formDataSKS, setFormDataSKS] = useState({
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
    console.log(formDataSKS)

    const handleSubmit = async () => {
        const univOld = JSON.parse(localStorage.getItem('formData'));
        const sks = await postData({
            endpoint: `/sks-handle`,
            data: formDataSKS,
            id: univOld.prodiInputID,
        });
        const skst = await postData({
            endpoint: `/get-sks-total`,
            data: formDataSKS,
            id: univOld.prodiInputID,
        });
        const ipk = await postData({
            endpoint: `/get-ipk-total`,
            data: formDataSKS,
            id: univOld.prodiInputID,
        });
        const sksNeeded = await postData({
            endpoint: `/get-sks-needed`,
            data: formDataSKS,
            id: univOld.prodiInputID,
        });
        const ketepatanGradTime = await fetchDatawithIDUniv({
            endpoint: `/get-ketepatan-grad-time`,
            selectedIDUniv: univOld.prodiInputID,
        });
        localStorage.setItem('PREDICTRES', JSON.stringify(sks));
        localStorage.setItem('SKST', JSON.stringify(skst));
        localStorage.setItem('IPKT', JSON.stringify(ipk));
        localStorage.setItem('SKSNEEDED', JSON.stringify(sksNeeded));
        localStorage.setItem('GRADTIME', JSON.stringify(ketepatanGradTime));

        router.push('/PredictSingular/Result');

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataSKS({ ...formDataSKS, [name]: value });
    };

    return (
        <ChakraProvider resetCSS={false}>
            <div>
                <Navbar />
                <Container
                    margin={0}
                    bg='#EFF0F1'
                    maxWidth='100vw'
                    w='100%'
                    h='89vh'>

                    {/* Header */}
                    <Box p={4} position='relative'>
                        <Center>
                            <Box
                                mt='30px'
                                p='4'
                                width='950px'
                                height='200px'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                            >
                                <Box>
                                    <Center>
                                        <Text fontSize="22px" color="black">
                                            Prediksi Ketepatan Waktu Lulus Mahasiswa
                                        </Text>
                                    </Center>

                                    <Center>
                                        <Text lineHeight="80px" fontSize="48px" color="black" fontWeight="bold">
                                            Silakan masukkan data akademis Anda
                                        </Text>
                                    </Center>
                                </Box>
                            </Box>
                        </Center>
                    </Box>

                    {/* Univ Prodi Name */}
                    <Box
                        p={4}
                        color='white'
                        height='60px'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        w='100%'
                    >
                        <Flex
                            mt='20px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            gap='2'
                            w='100%'
                            p={2}
                            borderWidth='3px'
                            borderRadius='2xl'
                            borderColor='#7B7B7B'
                            bg='#EFF0F1'
                        >

                            {/* Text */}
                            <SimpleGrid
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                columns='1'
                                marginTop='10px'
                                marginBottom='10px'
                                w='70%'>
                                <Box p='2'>
                                    <Text color='black' fontSize='20px' fontWeight='bold'>
                                        {univOld.prodiInput} | {univOld.univInput}
                                    </Text>
                                </Box>
                            </SimpleGrid>

                        </Flex>
                    </Box>

                    <Box w='100%'>
                        {/* IP Input */}
                        <form onSubmit={handleSubmit}>
                            <Box p={4} color='black' height='auto' marginTop='50px' borderRadius='md'>
                                <Grid templateColumns='repeat(4, 1fr)' gap={6}>

                                    {/* Semester 1 */}
                                    <GridItem
                                        w='100%'
                                        h='auto'
                                        bg='white'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.1)'
                                    >
                                        <GridItem
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            fontWeight='bold'
                                            h='20%'
                                            borderBottomWidth='4px'
                                            borderColor='#EFF0F1'
                                        >
                                            <Text color='#545454' fontSize='20px'>
                                                Semester 1
                                            </Text>
                                        </GridItem>
                                        <Grid
                                            templateRows='repeat(3, 1fr)'
                                            gap={2}
                                            h='80%'
                                            alignItems='center'
                                            p={4}
                                        >
                                            <SimpleGrid
                                                row='1'
                                                w='100%'
                                                alignItems='center'
                                                display='flex'
                                            >
                                                <Box ml='2' w='80%'>
                                                    SKS Diambil
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem1sksSemester"
                                                        value={formDataSKS.sem1sksSemester}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='2' w='100%' alignItems='center' display='flex'>
                                                <Box ml='2' w='80%'>
                                                    SKS Lulus
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem1sksDPO"
                                                        value={formDataSKS.sem1sksDPO}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='3' w='100%' alignItems='center' display='flex'>
                                                <Box ml='2' w='80%'>
                                                    IPK
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem1ipsKumulatif"
                                                        value={formDataSKS.sem1ipsKumulatif}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                        </Grid>
                                    </GridItem>

                                    {/* Semester 2 */}
                                    <GridItem
                                        w='100%'
                                        h='auto'
                                        bg='white'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.1)' // Add this line for shadow
                                    >
                                        <GridItem
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            fontWeight='bold'
                                            h='20%'
                                            borderBottomWidth='4px'
                                            borderColor='#EFF0F1'
                                        >
                                            <Text color='#545454' fontSize='20px'>
                                                Semester 2
                                            </Text>
                                        </GridItem>
                                        <Grid
                                            templateRows='repeat(3, 1fr)'
                                            gap={2}
                                            h='80%'
                                            alignItems='center'
                                            p={4}
                                        >
                                            <SimpleGrid
                                                row='1'
                                                w='100%'
                                                alignItems='center'
                                                display='flex'
                                            >
                                                <Box ml='2' w='80%'>
                                                    SKS Diambil
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem2sksSemester"
                                                        value={formDataSKS.sem2sksSemester}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='2' w='100%' alignItems='center' display='flex'>
                                                <Box ml='2' w='80%'>
                                                    SKS Lulus
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem2sksDPO"
                                                        value={formDataSKS.sem2sksDPO}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='3' w='100%' alignItems='center' display='flex'>
                                                <Box ml='2' w='80%'>
                                                    IPK
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem2ipsKumulatif"
                                                        value={formDataSKS.sem2ipsKumulatif}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                        </Grid>
                                    </GridItem>

                                    {/* Semester 3 */}
                                    <GridItem
                                        w='100%'
                                        h='auto'
                                        bg='white'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.1)' // Add this line for shadow
                                    >
                                        <GridItem
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            fontWeight='bold'
                                            h='20%'
                                            borderBottomWidth='4px'
                                            borderColor='#EFF0F1'
                                        >
                                            <Text color='#545454' fontSize='20px'>
                                                Semester 3
                                            </Text>
                                        </GridItem>
                                        <Grid
                                            templateRows='repeat(3, 1fr)'
                                            gap={2}
                                            h='80%'
                                            alignItems='center'
                                            p={4}
                                        >
                                            <SimpleGrid
                                                row='1'
                                                w='100%'
                                                alignItems='center'
                                                display='flex'
                                            >
                                                <Box ml='2' w='80%'>
                                                    SKS Diambil
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem3sksSemester"
                                                        value={formDataSKS.sem3sksSemester}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='2' w='100%' alignItems='center' display='flex'>
                                                <Box ml='2' w='80%'>
                                                    SKS Lulus
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem3sksDPO"
                                                        value={formDataSKS.sem3sksDPO}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='3' w='100%' alignItems='center' display='flex'>
                                                <Box ml='2' w='80%'>
                                                    IPK
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem3ipsKumulatif"
                                                        value={formDataSKS.sem3ipsKumulatif}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                        </Grid>
                                    </GridItem>

                                    {/* Semester 4 */}
                                    <GridItem
                                        w='100%'
                                        h='auto'
                                        bg='white'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.1)' // Add this line for shadow
                                    >
                                        <GridItem
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            fontWeight='bold'
                                            h='20%'
                                            borderBottomWidth='4px'
                                            borderColor='#EFF0F1'
                                        >
                                            <Text color='#545454' fontSize='20px'>
                                                Semester 4
                                            </Text>
                                        </GridItem>
                                        <Grid
                                            templateRows='repeat(3, 1fr)'
                                            gap={2}
                                            h='80%'
                                            alignItems='center'
                                            p={4}
                                        >
                                            <SimpleGrid
                                                row='1'
                                                w='100%'
                                                alignItems='center'
                                                display='flex'
                                            >
                                                <Box ml='2' w='80%'>
                                                    SKS Diambil
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem4sksSemester"
                                                        value={formDataSKS.sem4sksSemester}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='2' w='100%' alignItems='center' display='flex'>
                                                <Box ml='2' w='80%'>
                                                    SKS Lulus
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem4sksDPO"
                                                        value={formDataSKS.sem4sksDPO}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='3' w='100%' alignItems='center' display='flex'>
                                                <Box ml='2' w='80%'>
                                                    IPK
                                                </Box>
                                                <Box p='2' w='20%'>
                                                    <input
                                                        type="text"
                                                        name="sem4ipsKumulatif"
                                                        value={formDataSKS.sem4ipsKumulatif}
                                                        onChange={handleChange}
                                                        style={{
                                                            width: '100%',
                                                            height: '30px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid black',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                        </Grid>
                                    </GridItem>

                                </Grid>
                            </Box>
                        </form>

                        {/* Button */}
                        <Box p={4} marginTop='20px'>
                            <Center>
                                <Button
                                    color='white'
                                    bg='#004AAD'
                                    w='200px'
                                    h='50px'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                    onClick={handleSubmit}
                                >
                                    Lakukan Prediksi
                                </Button>
                            </Center>
                        </Box>
                    </Box>

                </Container>
                <Footer />

            </div >
        </ChakraProvider >
    );


}