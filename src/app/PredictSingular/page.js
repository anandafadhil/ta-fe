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


export default function PredictSingular() {
    const router = useRouter();

    const handleUploadClick = () => {
        router.push('/PredictBulk');
    };

    const handlePredictClick = () => {
        router.push('/PredictSingular/Result');
    };
    return (
        <div>
            <Navbar />

            <Container bg='yellow'>

                {/* Header */}
                <Box bg='blue' p={4}>
                    <Flex color='black'>
                        <Box p='4' bg='red' width='200px' height='50px'>
                            Predict Singular
                        </Box>
                        <Spacer />
                        <Box p='4' bg='green' width='200px' height='50px'>
                            <Button onClick={handleUploadClick} width='200px' height='50px'>Upload</Button>
                        </Box>
                    </Flex>
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

                {/* IP Input */}
                <Box bg='red' p={4} color='white' height='400px' marginTop='50px'>
                    <Grid templateColumns='repeat(4, 1fr)' gap={6}>

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
                                    Semester 1
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
                        </GridItem>

                        {/* Semester 4 */}
                        <GridItem w='100%' h='100%' bg='blue'>
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
                </Box>

                {/* Submit Button */}
                <Box bg='green' p={4} color='white' marginTop='70px'>
                    <Center>
                        <Button w='200px' h='50px' onClick={handlePredictClick}>Predict</Button>
                    </Center>
                </Box>
            </Container>
        </div>


    );


}