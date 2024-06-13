"use client"

import {
    ChakraProvider, Container, Flex, Center, 
    Text, Box, Grid, GridItem, Button, SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useState } from "react";
import '@/src/app/styles.css';
import Footer from "@/src/component/footer";
import { fetchDatawithIDUniv, postData } from "@/src/api/fetch";
import useStore from "@/src/store"

export default function PredictForm() {  
    const formData = useStore((state) => state.formData);
    const setResult = useStore((state) => state.setResult);
    const setSKST = useStore((state) => state.setSKST);
    const setIPK = useStore((state) => state.setIPK);
    const setSKSNeeded = useStore((state) => state.setSKSNeeded);
    const setKetepatan = useStore((state) => state.setKetepatan);  
    const router = useRouter();
    const [formDataSKS, setformDataSKS] = useState({
        IPK_sem_1: "",
        IPK_sem_2: "",
        IPK_sem_3: "",
        IPK_sem_4: "",
        SKS_sem_1: "",
        SKS_sem_2: "",
        SKS_sem_3: "",
        SKS_sem_4: "",
        SKSL_sem_1: "",
        SKSL_sem_2: "",
        SKSL_sem_3: "",
        SKSL_sem_4: ""
    });

    const handleSubmit = async () => {
        const predictRes = await postData({
            endpoint: `/predict`,
            data: formDataSKS,
            id: formData.prodiInputID,
        });
        const skst = await postData({
            endpoint: `/total-sks`,
            data: formDataSKS,
            id: formData.prodiInputID,
        });
        const ipk = await postData({
            endpoint: `/total-ipk`,
            data: formDataSKS,
            id: formData.prodiInputID,
        });
        const sksNeeded = await postData({
            endpoint: `/sks-needed`,
            data: formDataSKS,
            id: formData.prodiInputID,
        });
        const ketepatanGradTime = await fetchDatawithIDUniv({
            endpoint: `/grad-timeliness-prodi`,
            selectedIDUniv: formData.prodiInputID,
        });
        setResult(predictRes);
        setSKST(skst);
        setIPK(ipk);
        setSKSNeeded(sksNeeded);
        setKetepatan(ketepatanGradTime);
        router.push('/predict/singular/result');

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformDataSKS({ ...formDataSKS, [name]: value });
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
                            w='80%'
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
                                        {formData.prodiInput} | {formData.univInput}
                                    </Text>
                                </Box>
                            </SimpleGrid>

                        </Flex>
                    </Box>

                    <Box w='100%'>
                        {/* IP Input */}
                        <form onSubmit={handleSubmit}>

                            <Box w='100%' p={4} color='black' height='auto' marginTop='50px' borderRadius='md' display="flex"
                                alignItems="center"
                                justifyContent="center">
                                <Grid templateColumns='repeat(4, 1fr)' w='80%' gap={6}>

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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="SKS_sem_1"
                                                        value={formDataSKS.SKS_sem_1}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="SKSL_sem_1"
                                                        value={formDataSKS.SKSL_sem_1}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="IPK_sem_1"
                                                        value={formDataSKS.IPK_sem_1}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="SKS_sem_2"
                                                        value={formDataSKS.SKS_sem_2}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="SKSL_sem_2"
                                                        value={formDataSKS.SKSL_sem_2}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="IPK_sem_2"
                                                        value={formDataSKS.IPK_sem_2}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="SKS_sem_3"
                                                        value={formDataSKS.SKS_sem_3}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="SKSL_sem_3"
                                                        value={formDataSKS.SKSL_sem_3}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="IPK_sem_3"
                                                        value={formDataSKS.IPK_sem_3}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="SKS_sem_4"
                                                        value={formDataSKS.SKS_sem_4}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="SKSL_sem_4"
                                                        value={formDataSKS.SKSL_sem_4}
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
                                                <Box p='2' w='40%'>
                                                    <input
                                                        type="text"
                                                        name="IPK_sem_4"
                                                        value={formDataSKS.IPK_sem_4}
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