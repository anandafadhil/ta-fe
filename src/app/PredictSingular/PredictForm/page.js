"use client"

import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, Select, InputSelect,
    FormControl, Modal, ModalOverlay,
    ModalContent, ModalCloseButton,
    ModalFooter, ModalBody, ModalHeader,
    useDisclosure, FormLabel, Textarea
} from "@chakra-ui/react";
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";

import '../../styles.css';
import Footer from "@/src/component/footer";
import { fetchData, postData } from "@/src/api/fetch";

export default function PredictForm() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    const handleSubmit = async () => {
        // e.preventDefault();
        console.log('Form submitted:', formDataSKS);
        console.log(localStorage.getItem('formData'))
        const univOld = JSON.parse(localStorage.getItem('formData')).prodiInputID;
        console.log(univOld)

        // const predict = await fetchData(`/statistik-prodi/${univOld}`);
        // localStorage.setItem('formDataSKS', JSON.stringify(formDataSKS));
        const sks = await postData({
            endpoint: `/sks-handle`,
            data: formDataSKS,
            id: univOld,
        });
        localStorage.setItem('PREDICTRES', JSON.stringify(sks));

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
                    maxWidth='100vw'
                    w='100%'
                    h='89vh'>
                    {/* Header */}
                    <Box p={4}>
                        <Flex color='black' >
                            <Box p='4' width='300px' height='100px' display='flex' alignItems='center' justifyContent='center'>
                                <Text fontSize='30px' color='black'>
                                    Predict Singular
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Box w='100%'>
                        {/* IP Input */}
                        <form onSubmit={handleSubmit}>
                            <Box p={4} color='white' height='450px' marginTop='20px' borderRadius='md'>
                                <Grid templateColumns='repeat(4, 1fr)' gap={6}>

                                    {/* Semester 1 */}
                                    <GridItem
                                        w='100%'
                                        h='420px'
                                        bg='#13ABC4'
                                        borderRadius='md'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                    >
                                        <Grid
                                            templateRows='repeat(4, 1fr)'
                                            gap={4}
                                            h='100%'
                                            alignItems='center'
                                        >
                                            <GridItem row='1' justifySelf='center' alignSelf='center' >
                                                Semester 1
                                            </GridItem>
                                            {/* Adjusted SimpleGrid to have multiple columns */}
                                            <SimpleGrid row='2' w='100%' alignItems='center' >
                                                <Box ml='2'>
                                                    SKS diambil
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem1sksSemester"
                                                        value={formDataSKS.sem1sksSemester}
                                                        onChange={handleChange}
                                                        placeholder="Input SKS Semester 1"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
                                                            color: 'black'
                                                        }}
                                                    />

                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='3' w='100%' rows={2} alignItems='center' >
                                                <Box ml='2'>
                                                    SKS Lulus
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem1sksDPO"
                                                        value={formDataSKS.sem1sksDPO}
                                                        onChange={handleChange}
                                                        placeholder="Total SKS Lulus di Semester 1"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='4' w='100%' rows={2} alignItems='center' >
                                                <Box ml='2'>
                                                    IPK
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem1ipsKumulatif"
                                                        value={formDataSKS.sem1ipsKumulatif}
                                                        onChange={handleChange}
                                                        placeholder="IPK pada Semester 1"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
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
                                        h='100%'
                                        bg='#13ABC4'
                                        borderRadius='md'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                    >
                                        <Grid
                                            templateRows='repeat(4, 1fr)'
                                            gap={4}
                                            h='100%'
                                            alignItems='center'
                                        >
                                            <GridItem row='1' justifySelf='center' alignSelf='center'>
                                                Semester 2
                                            </GridItem>
                                            {/* Adjusted SimpleGrid to have multiple columns */}
                                            <SimpleGrid row='2' w='100%' alignItems='center'>
                                                <Box ml='2'>
                                                    SKS diambil
                                                </Box>
                                                <Box p='2' textColor={'black'}>
                                                    <input
                                                        type="text"
                                                        name="sem2sksSemester"
                                                        value={formDataSKS.sem2sksSemester}
                                                        onChange={handleChange}
                                                        placeholder="Input SKS Semester 2"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='3' w='100%' rows={2} alignItems='center'>
                                                <Box ml='2'>
                                                    SKS Lulus
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem2sksDPO"
                                                        value={formDataSKS.sem2sksDPO}
                                                        onChange={handleChange}
                                                        placeholder="Total SKS Lulus di Semester 2"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='4' w='100%' rows={2} alignItems='center'>
                                                <Box ml='2'>
                                                    IPK
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem2ipsKumulatif"
                                                        value={formDataSKS.sem2ipsKumulatif}
                                                        onChange={handleChange}
                                                        placeholder="IPK pada Semester 2"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
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
                                        h='100%'
                                        bg='#13ABC4'
                                        borderRadius='md'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                    >
                                        <Grid
                                            templateRows='repeat(4, 1fr)' gap={4}
                                            h='100%'
                                            alignItems='center'
                                        >
                                            <GridItem row='1' justifySelf='center' alignSelf='center'>
                                                Semester 3
                                            </GridItem>
                                            {/* Adjusted SimpleGrid to have multiple columns */}
                                            <SimpleGrid row='2' w='100%' alignItems='center'>
                                                <Box ml='2'>
                                                    SKS diambil
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem3sksSemester"
                                                        value={formDataSKS.sem3sksSemester}
                                                        onChange={handleChange}
                                                        placeholder="Input SKS Semester 3"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='3' w='100%' rows={2} alignItems='center'>
                                                <Box ml='2'>
                                                    SKS Lulus
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem3sksDPO"
                                                        value={formDataSKS.sem3sksDPO}
                                                        onChange={handleChange}
                                                        placeholder="Total SKS Lulus di Semester 3"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='4' w='100%' rows={2} alignItems='center'>
                                                <Box ml='2'>
                                                    IPK
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem3ipsKumulatif"
                                                        value={formDataSKS.sem3ipsKumulatif}
                                                        onChange={handleChange}
                                                        placeholder="IPK pada Semester 3"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
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
                                        h='100%'
                                        bg='#13ABC4'
                                        borderRadius='md'
                                        boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)' // Add this line for shadow
                                    >
                                        <Grid
                                            templateRows='repeat(4, 1fr)' gap={4}
                                            h='100%'
                                            alignItems='center'
                                        >
                                            <GridItem row='1' justifySelf='center' alignSelf='center'>
                                                Semester 4
                                            </GridItem>
                                            {/* Adjusted SimpleGrid to have multiple columns */}
                                            <SimpleGrid row='2' w='100%' alignItems='center'>
                                                <Box ml='2'>
                                                    SKS diambil
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem4sksSemester"
                                                        value={formDataSKS.sem4sksSemester}
                                                        onChange={handleChange}
                                                        placeholder="Input SKS Semester 4"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='3' w='100%' rows={2} alignItems='center'>
                                                <Box ml='2'>
                                                    SKS Lulus
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem4sksDPO"
                                                        value={formDataSKS.sem4sksDPO}
                                                        onChange={handleChange}
                                                        placeholder="Total SKS Lulus di Semester 4"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
                                                            color: 'black'
                                                        }}
                                                    />
                                                </Box>
                                            </SimpleGrid>
                                            <SimpleGrid row='4' w='100%' rows={2} alignItems='center'>
                                                <Box ml='2'>
                                                    IPK
                                                </Box>
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem4ipsKumulatif"
                                                        value={formDataSKS.sem4ipsKumulatif}
                                                        onChange={handleChange}
                                                        placeholder="IPK pada Semester 4"
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '0 10px',
                                                            borderRadius: '0.5rem',
                                                            border: '1px solid #ced4da',
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
                        <Box p={4} marginTop='20px'>
                            <Center>
                                <Button
                                    color='white'
                                    bg='#3161A3'
                                    w='200px'
                                    h='50px'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                    onClick={handleSubmit}
                                >
                                    Confirm
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