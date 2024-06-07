import * as React from 'react';
import {
    Box, Flex, Link, Button, Image, Divider
} from "@chakra-ui/react";
import { RiGraduationCapFill } from "react-icons/ri";

export default function Navbar() {
    return (
        <Box w='100%' h='100px' boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'>
            <Flex h='100%' align='center' justify='start'>

                {/* Logo Section */}
                <Box as="span" ml={8}>
                    <a href='/'>
                        <RiGraduationCapFill size="70px" />
                    </a>
                </Box>

                {/* Spacer */}
                <Box flex='1' />

                {/* Links Section */}
                <Flex align='center' justify='center'>
                    <Link href='/statistic' fontSize='20px' px='2' fontWeight='bold' color='black'>
                        Statistik
                    </Link>
                    <Divider orientation='vertical' borderWidth='1px' borderColor='black' height='30px' mx='2' />
                    <Link href='/predict' fontSize='20px' px='2' fontWeight='bold' color='black'>
                        Prediksi Ketepatan Waktu Lulus
                    </Link>
                </Flex>

                {/* Spacer */}
                <Box flex='1.25' />


            </Flex>
        </Box>
    );
}