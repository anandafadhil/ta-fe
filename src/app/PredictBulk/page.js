"use client"
import Image from 'next/image';
import * as React from 'react';
import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';


export default function PredictBulk() {
    const router = useRouter();

    const handleUploadClick = () => {
        // Redirect to the desired URL
        router.push('/PredictBulk/Result');
    };
    return (
        <div>
            <Navbar />
            <Container bg='yellow'>

                {/* Header */}
                <Box bg='blue' p={4}>
                    <Flex color='black'>
                        <Box p='4' bg='red' width='200px' height='50px'>
                            Predict Bulk Upload
                        </Box>
                    </Flex>
                </Box>

                {/* IP Input */}
                <Box bg='red' p={4} color='white' height='400px'>
                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>

                        {/* Semester 1 */}
                        <GridItem w='100%' h='400px' bg='purple'>
                            <Grid
                                templateColumns='repeat(5, 1fr)'
                                templateRows='auto'
                                gap={4}
                                h='100%'
                                alignItems='center'
                            >
                                <GridItem colSpan={5} justifySelf='center'>
                                    Tutor 1
                                </GridItem>

                            </Grid>
                        </GridItem>

                        {/* Semester 2 */}
                        <GridItem w='100%' h='100%' bg='green'>
                            <Grid
                                templateColumns='repeat(5, 1fr)'
                                templateRows='auto'
                                gap={4}
                                h='100%'
                                alignItems='center'
                            >
                                <GridItem colSpan={5} justifySelf='center'>
                                    Tutor 2
                                </GridItem>

                            </Grid>
                        </GridItem>
                        {/* Semester 3 */}
                        <GridItem w='100%' h='100%' bg='yellow'>
                            <Grid
                                templateColumns='repeat(5, 1fr)'
                                templateRows='auto'
                                gap={4}
                                h='100%'
                                alignItems='center'
                            >
                                <GridItem colSpan={5} color='black' justifySelf='center'>
                                    Tutor 3
                                </GridItem>
                            </Grid>
                        </GridItem>

                    </Grid>
                </Box>

                {/* Univ Input */}
                <Box bg='green' p={4} top={10} color='white' height='100px' alignItems='center'>

                    {/* Univ Name */}
                    <Flex bg='yellow' marginTop='20px'>
                        <Box marginLeft='450px' p='4' bg='red' w='171px' >
                            Universitas
                        </Box>
                        <Spacer />

                        {/* Jurusan Name */}
                        <Box marginRight='450px ' p='4' bg='blue' w='171px'>
                            Jurusan
                        </Box>

                    </Flex>

                    <Flex bg='yellow'>
                        <Box marginLeft='450px' p='4' bg='red'>
                            <Input placeholder='Universitas' size='sm' />
                        </Box>
                        <Spacer />
                        <Box marginRight='450px' p='4' bg='blue'>
                            <Input placeholder='Jurusan' size='sm' />
                        </Box>
                    </Flex>
                </Box>

                {/* Submit Button */}
                <Box bg='green' p={4} color='white'>
                    <Center>
                        <Button width='200px' height='50px' onClick={handleUploadClick}>Upload</Button>
                    </Center>
                </Box>
            </Container>
        </div>


    );


}