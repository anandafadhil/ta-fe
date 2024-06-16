import * as React from 'react';
import {
    Box, Flex, Link, Divider, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton,
    DrawerHeader, DrawerBody, useDisclosure, IconButton
} from "@chakra-ui/react";
import { RiGraduationCapFill } from "react-icons/ri";
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box w='100%' h='100px' boxShadow='0px 4px 10px rgba(0, 0, 0, 0.2)'>
            <Flex h='100%' align='center' justify='start'>

                {/* Logo Section */}
                <Box as="span" ml={8}>
                    <a href='/'>
                        <RiGraduationCapFill size="70px" />
                    </a>
                </Box>

                {/* Links Section (for Large Screens) */}
                <Flex
                    display={{ base: 'none', sm: 'none', md: 'flex' }}
                    align='center'
                    justify={{ base: 'start', sm: 'center', md: 'center', lg: 'center' }}
                    flex={{ base: 'none', md: '1' }}>
                    <Link href='/statistic'
                        fontSize={{ base: '14px', md: '20px' }}
                        px='2' fontWeight='bold' color='black'>
                        Statistik
                    </Link>
                    <Divider orientation='vertical' borderWidth='1px' borderColor='black' height='30px' mx='2' />
                    <Link href='/predict'
                        fontSize={{ base: '14px', md: '20px' }}
                        px='2' fontWeight='bold' color='black'>
                        Prediksi Ketepatan Waktu Lulus
                    </Link>
                </Flex>

                {/* Hamburger Icon for Small Screens */}
                <Box
                    display={{ base: 'flex', sm: 'flex', md: 'none' }}
                    justifyContent="flex-end"
                    width="100%"
                    mr='20px'
                >
                    <IconButton
                        icon={<HamburgerIcon />}
                        aria-label='Open Sidebar'
                        variant='ghost'
                        onClick={onOpen}
                    />
                </Box>

                {/* Sidebar Drawer (for Small Screens) */}
                <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay>
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <Flex direction='column' align='start'>
                                    <Link href='/statistic' fontSize='14px'  fontWeight='bold' px='2' color='black'>
                                        Statistik
                                    </Link>
                                    <Link mt='20px' href='/predict' fontSize='14px'  fontWeight='bold' px='2' color='black'>
                                        Prediksi Ketepatan Waktu Lulus
                                    </Link>
                                </Flex>
                            </DrawerBody>
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>

            </Flex>
        </Box>
    );
}
