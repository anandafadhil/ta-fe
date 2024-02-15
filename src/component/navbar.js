"use client"
import Image from 'next/image';
import * as React from 'react';
import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    Link
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'

export default function Navbar() {
    return (

        <Box bg='orange' w='100vh' h='100%'>
            <Flex direction='row' justify='center' h='100%'>
                {/* First box */}
                <Box bgColor='green' w='100%' h='50px' mb='2' >
                    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                        <GridItem w='100%' h='50px' bg='blue' >
                            <Flex align='center' justify='center' h='100%'>
                                <Link href='/' color='white'>
                                    PDDIKTI
                                </Link>
                            </Flex>
                        </GridItem>
                        <GridItem w='100%' h='50px' bg='blue' >
                            <Flex align='center' justify='center' h='100%'>
                                <Link href='/StatisticPage' color='white'>
                                    Statistics
                                </Link>
                            </Flex>
                        </GridItem>
                        <GridItem w='100%' h='50px' bg='blue' >
                            <Flex align='center' justify='center' h='100%'>
                                <Link href='/PredictSingular' color='white'>
                                    Predict
                                </Link>
                            </Flex>
                        </GridItem>
                    </Grid>
                </Box>
                {/* Second box */}
                <Box bgColor='red' w='100%' h='50px' mb='2' />
                {/* Third box */}
                {/* <Box bgColor='tomato' w='100%' h='50px' mb='2' /> */}
            </Flex>
        </Box>

    );

}