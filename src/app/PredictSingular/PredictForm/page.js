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
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import '../../styles.css';
import Footer from "@/src/component/footer";

export default function PredictForm() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleUploadClick = () => {
        router.push('/PredictBulk');
    };

    const handlePredictClick = () => {
        router.push('/PredictSingular/Result');
    };

    const optionsUniversity = [
        "Institut Teknologi Bandung",
        "Universitas Gadjah Mada",
        "Universitas Indonesia",
    ];

    const optionsProgram = [
        "Ilmu Komputer",
        "Kedokteran",
        "Teknik Elektro",
        "Teknik Mesin",
        "Sastra",
    ];

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
        // console.log(e);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                                                        value={formData.sem1sksSemester}
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
                                                        value={formData.sem1sksDPO}
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
                                                        value={formData.sem1ipsKumulatif}
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
                                                <Box p='2'>
                                                    <input
                                                        type="text"
                                                        name="sem2sksSemester"
                                                        value={formData.sem2sksSemester}
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
                                                        value={formData.sem2sksDPO}
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
                                                        value={formData.sem2ipsKumulatif}
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
                                                        value={formData.sem3sksSemester}
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
                                                        value={formData.sem3sksDPO}
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
                                                        value={formData.sem3ipsKumulatif}
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
                                                        value={formData.sem4sksSemester}
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
                                                        value={formData.sem4sksDPO}
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
                                                        value={formData.sem4ipsKumulatif}
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