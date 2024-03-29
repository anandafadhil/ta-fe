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
import '../styles.css';

export default function PredictSingular() {
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

    return (
        <ChakraProvider resetCSS={false}>
            <div>
                <Navbar />
                {/* Header */}
                <Box p={4} bg='#3161A3'>
                    <Flex color='black' >
                        <Box p='4' width='300px' height='100px' display='flex' alignItems='center' justifyContent='center'>
                            <Text fontSize='30px' color='white'>
                                Predict Singular
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Container margin={0} bg='#3161A3' h='100vh' maxWidth='100vw' w='100%' display='flex' alignItems='center' justifyContent='center'>
                    <Box w='100%'>
                        {/* Univ Input */}
                        <Box p={4} color='white' height='100px' display='flex' alignItems='center' justifyContent='center'>
                            <Flex bg='#13ABC4' display='flex' alignItems='center' justifyContent='center' gap='40' w='80%'>
                                {/* Univ */}
                                <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                                    <Box p='4' >
                                        Nama Universitas
                                    </Box>
                                    <Box p='4'>
                                        <AutoComplete openOnFocus>
                                            <AutoCompleteInput variant="filled" color='black' w='100%' />
                                            <AutoCompleteList>
                                                {optionsUniversity.map((uni, cid) => (
                                                    <AutoCompleteItem
                                                        key={`option-${cid}`}
                                                        value={uni}
                                                        textTransform="capitalize"
                                                    >
                                                        {uni}
                                                    </AutoCompleteItem>
                                                ))}
                                            </AutoCompleteList>
                                        </AutoComplete>
                                    </Box>
                                </SimpleGrid>

                                {/* Prodi */}
                                <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%' >
                                    <Box p='4'>
                                        Nama Prodi/Jurusan
                                    </Box>
                                    <Box p='4'>
                                        <AutoComplete openOnFocus>
                                            <AutoCompleteInput variant="filled" color='black' w='100%' />
                                            <AutoCompleteList>
                                                {optionsProgram.map((prod, cid) => (
                                                    <AutoCompleteItem
                                                        key={`option-${cid}`}
                                                        value={prod}
                                                        textTransform="capitalize"
                                                    >
                                                        {prod}
                                                    </AutoCompleteItem>
                                                ))}
                                            </AutoCompleteList>
                                        </AutoComplete>
                                    </Box>
                                </SimpleGrid>
                            </Flex>
                        </Box>

                        {/* Submit Button */}
                        <Box p={4} color='white' marginTop='20px'>
                            <Center>
                                <Button bg='#13ABC4' w='200px' h='50px' onClick={onOpen}>Confirm</Button>
                            </Center>
                        </Box>


                        {/* Modal */}

                        <Modal isOpen={isOpen} onClose={onClose} size='full'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <SimpleGrid columns={[2, null, 4]} spacing='40px'>
                                        <Box height='100px' display='flex' alignItems='center' justifyContent='center'>
                                            Semester 1
                                        </Box>
                                        <Box height='100px' display='flex' alignItems='center' justifyContent='center'>
                                            Semester 2
                                        </Box>
                                        <Box height='100px' display='flex' alignItems='center' justifyContent='center'>
                                            Semester 3
                                        </Box>
                                        <Box height='100px' display='flex' alignItems='center' justifyContent='center'>
                                            Semester 4
                                        </Box>

                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    Indeks Prestasi
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    Indeks Prestasi
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%'>
                                                <Box p='2' >
                                                    Indeks Prestasi
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%'>
                                                <Box p='2' >
                                                    Indeks Prestasi
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    Satuan Kredit Semester
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%'>
                                                <Box p='2' >
                                                    Satuan Kredit Semester
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    Satuan Kredit Semester
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%'>
                                                <Box p='2' >
                                                    Satuan Kredit Semester
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    SKS DPO
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    SKS DPO
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    SKS DPO
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    SKS DPO
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    Indeks Prestasi Kumulatif
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    Indeks Prestasi Kumulatif
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    Indeks Prestasi Kumulatif
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        <Box height='100px'>
                                            <SimpleGrid columns='1' w='100%' >
                                                <Box p='2' >
                                                    Indeks Prestasi Kumulatif
                                                </Box>
                                                <Box p='2'>
                                                    <Input>

                                                    </Input>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                    </SimpleGrid>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button onClick={handlePredictClick} variant='ghost'>Submit</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        {/* IP Input */}
                        {/* <Box bg='red' p={4} color='white' height='400px' marginTop='20px'>
                    <Grid templateColumns='repeat(4, 1fr)' gap={6}> */}

                        {/* Semester 1 */}
                        {/* <GridItem w='100%' h='400px' bg='purple'>
                            <Grid
                                templateColumns='repeat(5, 1fr)'
                                templateRows='auto'
                                gap={4}
                                h='100%'
                                alignItems='center'
                            >
                                <GridItem colSpan={5} justifySelf='center'>
                                    Semester 1
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 1' color='black' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 2' color='black'/>
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 3' color='black'/>
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 4' color='black'/>
                                </GridItem>
                            </Grid>
                        </GridItem> */}

                        {/* Semester 2 */}
                        {/* <GridItem w='100%' h='100%' bg='green'>
                            <Grid
                                templateColumns='repeat(5, 1fr)'
                                templateRows='auto'
                                gap={4}
                                h='100%'
                                alignItems='center'
                            >
                                <GridItem colSpan={5} justifySelf='center'>
                                    Semester 2
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 1' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 2' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 3' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 4' />
                                </GridItem>
                            </Grid>
                        </GridItem> */}
                        {/* Semester 3 */}
                        {/* <GridItem w='100%' h='100%' bg='yellow'>
                            <Grid
                                templateColumns='repeat(5, 1fr)'
                                templateRows='auto'
                                gap={4}
                                h='100%'
                                alignItems='center'
                            >
                                <GridItem colSpan={5} justifySelf='center'>
                                    Semester 3
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 1' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 2' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 3' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 4' />
                                </GridItem>
                            </Grid>
                        </GridItem> */}

                        {/* Semester 4 */}
                        {/* <GridItem w='100%' h='100%' bg='blue'>
                            <Grid
                                templateColumns='repeat(5, 1fr)'
                                templateRows='auto'
                                gap={4}
                                h='100%'
                                alignItems='center'
                            >
                                <GridItem colSpan={5} justifySelf='center'>
                                    Semester 4
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 1' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 2' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 3' />
                                </GridItem>
                                <GridItem colSpan={5} justifySelf='center'>
                                    <Input placeholder='Input 4' />
                                </GridItem>
                            </Grid>
                        </GridItem>
                    </Grid>
                </Box> */}
                    </Box>
                </Container>

            </div>
        </ChakraProvider>
    );


}