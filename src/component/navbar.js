"use client"
// import Image from 'next/image';
import * as React from 'react';
import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    Link, Image
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import '../app/styles.css';

export default function Navbar() {
    return (

        <Box w='100%' h='100%' >
            <Flex direction='row' justify='center' h='100%'>
                {/* First box */}
                <Box bgColor='#EBFFFB' w='50%' h='100px' display='flex' alignItems='center' justifyContent='center'>
                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                        <GridItem w='100%' h='50px'  >
                            <Flex align='center' justify='center' h='100%'>
                                <a href='/'>
                                <Image
                                    src='/assets/logopddikti-1.png'
                                    alt='Logo PDDikti'
                                />
                                </a>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Box>

                {/* Second box */}
                <Box bgColor='#EBFFFB' w='40%' h='100px' display='flex' alignItems='center' justifyContent='center'>
                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                        <GridItem w='100%' h='50px' >
                            <Flex align='center' justify='center' h='100%'>
                                <Link href='/StatisticPage' color='#3161A3'>
                                    Statistik
                                </Link>
                            </Flex>
                        </GridItem>
                        <GridItem w='100%' h='50px' >
                            <Flex align='center' justify='center' h='100%'>
                                <Link href='/PredictSingular' color='#3161A3'>
                                    Single Predict
                                </Link>
                            </Flex>
                        </GridItem>
                        <GridItem w='100%' h='50px' >
                            <Flex align='center' justify='center' h='100%'>
                                <Link href='/PredictSingular' color='#3161A3'>
                                    Grouped Predict
                                </Link>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Box>
                
                {/* Third box */}
                <Box bgColor='#EBFFFB' w='10%' h='100px' display='flex' justifyContent='center' alignItems='center'>
                    <Button color='#3161A3'>
                        About
                    </Button>
                </Box>
            </Flex>
        </Box>

    );

}