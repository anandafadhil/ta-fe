'use client';
import Image from "next/image";
import * as React from 'react';
import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text, Box,
    Button
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
export default function Home() {

    const router = useRouter();
    const handleDoneClick = () => {
        router.push('/');
    };
    return (
        <div>
            <Navbar />
            <Container bg='purple'>
                <Box bg='yellow' h='125px' marginTop='20px'>
                    abc
                </Box>
                <Box bg='green' h='125px' marginTop='20px'>
                    cde
                </Box>
                <Box bg='red' h='450px' marginTop='20px'>

                    <Box bg='blue' h='350px'>

                    </Box>
                    <Box bg='yellow' h='100px'>
                        <Center>
                            <Button w='200px' h='50px' onClick={handleDoneClick}>Back</Button>
                        </Center>
                    </Box>
                </Box>
            </Container>

        </div>
    );
}
