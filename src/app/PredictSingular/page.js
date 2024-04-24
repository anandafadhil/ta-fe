"use client"

import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, InputSelect,
    FormControl, Modal, ModalOverlay,
    ModalContent, ModalCloseButton,
    ModalFooter, ModalBody, ModalHeader,
    useDisclosure, FormLabel, Textarea
} from "@chakra-ui/react";
import Select from "react-select";
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
    const handleClick = () => {
        router.push('/PredictSingular/PredictForm');
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
        // Close the modal
        setIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // const handleChangeOptionsDOC = (selectedOptionDOC) => {
    //     setScnData((prevScnData) => ({
    //       ...prevScnData,
    //       document_level: selectedOptionDOC.value,
    //     }));
    //     setSelectedOptionDOC(selectedOptionDOC);
    //   };

    const optionsUni = [
        { value: "S-BN", label: 'Bina Nusantara' },
        { value: "N-ITB", label: 'Institut Teknologi Bandung' },
        { value: "N-UGM", label: 'Universitas Gajah Mada' },
        { value: "N-UI", label: 'Universitas Indonesia' }
    ];

    const optionsProdi = [
        { value: "IK", label: 'Ilmu Komputer' },
        { value: "K", label: 'Kedokteran' },
        { value: "FTM", label: 'Teknik Mesin' },
        { value: "FTE", label: 'Teknik Elektro' }
    ];

    return (
        <ChakraProvider resetCSS={false}>
            <div>
                <Navbar />
                <Container
                    margin={0}
                    maxWidth='100vw'
                    w='100%'
                    bg='#EBFFFB'
                    h='89vh'>
                    {/* Header */}
                    <Box p={4} bg='#EBFFFB'>
                        <Flex >
                            <Box p='4' width='300px' height='100px' display='flex' alignItems='center' justifyContent='center'>
                                <Text fontSize='30px' color='#3161A3'>
                                    Predict Singular
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Box w='100%'>
                        {/* Univ Input */}
                        <Box
                            p={4}
                            color='white'
                            height='100px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Flex
                                bg='#13ABC4'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                gap='40'
                                w='80%'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                borderRadius='md'>
                                {/* Univ */}
                                <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                                    <Box p='1' ml='1'>
                                        Nama Universitas
                                    </Box>
                                    <Box p='2'>
                                        {/* <AutoComplete openOnFocus>
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
                                        </AutoComplete> */}
                                        <Select
                                            className="w-full"
                                            name="id_organization"
                                            id={`single-select-id_organization`}
                                            instanceId={`single-select-id_organization`}
                                            // value={selectedOptionOrganization}
                                            // onChange={handleChangeOrganization}
                                            options={optionsUni}
                                            placeholder="Input Universitas Pilihan"
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    paddingLeft: "0.2rem",
                                                    height: "55px",
                                                }),
                                                indicatorSeparator: (base) => ({
                                                    ...base,
                                                    visibility: "hidden",
                                                }),
                                                dropdownIndicator: (base) => ({
                                                    ...base,
                                                    paddingRight: "0.5rem",
                                                    svg: {
                                                        height: 24,
                                                        width: 24,
                                                        fill: "black",
                                                    },
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    maxHeight: "120px", // Adjust the max height as needed
                                                    overflowY: "auto", // Add scrollbar if needed
                                                }),
                                                // New style to change label font color to black
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: "black", // Change label font color to black
                                                }),
                                            }}
                                        />
                                    </Box>
                                </SimpleGrid>

                                {/* Prodi */}
                                <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%' >
                                    <Box p='1' ml='1'>
                                        Nama Prodi/Jurusan
                                    </Box>
                                    <Box p='2'>
                                        {/* <AutoComplete openOnFocus>
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
                                        </AutoComplete> */}

                                        <Select
                                            className="w-full"
                                            name="id_organization"
                                            id={`single-select-id_organization`}
                                            instanceId={`single-select-id_organization`}
                                            // value={selectedOptionOrganization}
                                            // onChange={handleChangeOrganization}
                                            options={optionsProdi}
                                            placeholder="Input Universitas Pilihan"
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    paddingLeft: "0.2rem",
                                                    height: "55px",
                                                }),
                                                indicatorSeparator: (base) => ({
                                                    ...base,
                                                    visibility: "hidden",
                                                }),
                                                dropdownIndicator: (base) => ({
                                                    ...base,
                                                    paddingRight: "0.5rem",
                                                    svg: {
                                                        height: 24,
                                                        width: 24,
                                                        fill: "black",
                                                    },
                                                }),
                                                menu: (provided) => ({
                                                    ...provided,
                                                    maxHeight: "120px", // Adjust the max height as needed
                                                    overflowY: "auto", // Add scrollbar if needed
                                                }),
                                                // New style to change label font color to black
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: "black", // Change label font color to black
                                                }),
                                            }}
                                        />

                                    </Box>
                                </SimpleGrid>
                            </Flex>
                        </Box>

                        {/* Submit Button */}
                        <Box p={4} marginTop='20px'>
                            <Center>
                                <Button
                                    color='white'
                                    bg='#13ABC4'
                                    w='200px'
                                    h='50px'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                    onClick={handleClick}
                                >
                                    Confirm
                                </Button>
                            </Center>
                        </Box>


                        {/* Modal */}

                        {/* <Modal isOpen={isOpen} onClose={onClose} size='full'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalCloseButton />
                                <form onSubmit={handleSubmit}>
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
                                                        SKS diambil
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem1sksSemester"
                                                            value={formData.sem1sksSemester}
                                                            onChange={handleChange}
                                                            placeholder="Input SKS Semester 1"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%'>
                                                    <Box p='2' >
                                                        SKS diambil
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem2sksSemester"
                                                            value={formData.sem2sksSemester}
                                                            onChange={handleChange}
                                                            placeholder="Input SKS Semester 2"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        SKS diambil
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem3sksSemester"
                                                            value={formData.sem3sksSemester}
                                                            onChange={handleChange}
                                                            placeholder="Input SKS Semester 3"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%'>
                                                    <Box p='2' >
                                                        SKS diambil
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem4sksSemester"
                                                            value={formData.sem4sksSemester}
                                                            onChange={handleChange}
                                                            placeholder="Input SKS Semester 4"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        SKS Lulus
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem1sksDPO"
                                                            value={formData.sem1sksDPO}
                                                            onChange={handleChange}
                                                            placeholder="Total SKS Lulus di Semester 1"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        SKS Lulus
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem2sksDPO"
                                                            value={formData.sem2sksDPO}
                                                            onChange={handleChange}
                                                            placeholder="Jumlah SKS Lulus di Semester 2"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        SKS Lulus
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem3sksDPO"
                                                            value={formData.sem3sksDPO}
                                                            onChange={handleChange}
                                                            placeholder="Jumlah SKS Lulus di Semester 3"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        SKS Lulus
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem4sksDPO"
                                                            value={formData.sem4sksDPO}
                                                            onChange={handleChange}
                                                            placeholder="Jumlah SKS Lulus di Semester 4"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        IPK
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem1ipsKumulatif"
                                                            value={formData.sem1ipsKumulatif}
                                                            onChange={handleChange}
                                                            placeholder="IPK pada Semester 1"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        IPK
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem2ipsKumulatif"
                                                            value={formData.sem2ipsKumulatif}
                                                            onChange={handleChange}
                                                            placeholder="IPK pada Semester 2"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        IPK
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem3ipsKumulatif"
                                                            value={formData.sem3ipsKumulatif}
                                                            onChange={handleChange}
                                                            placeholder="IPK pada Semester 3"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                            <Box height='100px'>
                                                <SimpleGrid columns='1' w='100%' >
                                                    <Box p='2' >
                                                        IPK
                                                    </Box>
                                                    <Box p='2'>
                                                        <Input
                                                            type="text"
                                                            name="sem4ipsKumulatif"
                                                            value={formData.sem4ipsKumulatif}
                                                            onChange={handleChange}
                                                            placeholder="IPK pada Semester 4"
                                                        />
                                                    </Box>
                                                </SimpleGrid>
                                            </Box>
                                        </SimpleGrid>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                        <Button onClick={handleSubmit} variant='ghost'>Submit</Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </Modal> */}
                    </Box>
                </Container>


            </div>
        </ChakraProvider>
    );


}