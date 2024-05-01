import * as React from 'react';
import {
    Box, Flex, Link, Button, Image, Divider
} from "@chakra-ui/react";

export default function Navbar() {
    return (
        <Box w='100%' h='100px' bg='#EBFFFB' boxShadow='0px 4px 8px rgba(0, 0, 0, 0.5)'>
            <Flex h='100%' align='center' justify='start'>

                {/* Logo Section */}
                <Box p='2'>
                    <a href='/'>
                        <Image
                            src='/assets/logopddikti-1.png'
                            alt='Logo PDDikti'
                            htmlWidth='200px' // Adjust the size as needed
                        />
                    </a>
                </Box>

                {/* Spacer */}
                <Box flex='1' />

                {/* Links Section */}
                <Flex align='center' justify='center'>
                    <Link href='/StatisticPage' px='2' color='#3161A3'>
                        Statistik
                    </Link>
                    <Divider orientation='vertical' borderWidth='1px' borderColor='#3161A3' height='30px' mx='2' />
                    <Link href='/PredictSingular' px='2' color='#3161A3'>
                        Single Predict
                    </Link>
                    <Divider orientation='vertical' borderWidth='1px' borderColor='#3161A3' height='30px' mx='2' />
                    <Link href='/PredictBulk' px='2' color='#3161A3'>
                        Grouped Predict
                    </Link>
                </Flex>

                {/* Spacer */}
                <Box flex='1' />

                {/* About Section */}
                <Flex align='center' justify='center' pr='2%'>
                    <Button colorScheme='blue' variant='outline'>
                        About
                    </Button>
                </Flex>

            </Flex>
        </Box>
    );
}