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
// import AsyncSelect from 'react-select/async';
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

    const [isProdiInputDisabled, setIsProdiInputDisabled] = useState(true);

    const [formData, setFormData] = useState({
        univInput: '',
        prodiInput: '',
    });
    console.log(formData);

    const handleSubmit = (e) => {
        // Handle form submission here, for example:
        console.log('Form submitted:', formData);
        // Reset form data if needed
        setFormData({
            univInput: '',
            prodiInput: '',
        });
    };

    // const handleChange = (e) => {
    //     console.log(e);
    //     const { label, value } = e;
    //     setFormData({ ...formData, label });
    // };
    const handleChange = (selectedOption, fieldName) => {
        console.log(selectedOption);
        console.log(fieldName);
        if (selectedOption) {
          const { label } = selectedOption;
          setFormData({ ...formData, [fieldName.name]: label });
        } else {
          setFormData({ ...formData, [fieldName.name]: '' });
        }
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
                                        <Select
                                            className="w-full"
                                            name="univInput"
                                            value={formData.univInput}
                                            onChange={handleChange}
                                            options={optionsUni}
                                            placeholder={formData.univInput ? formData.univInput : 'Input Universitas Pilihan'}
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
                                <SimpleGrid columns='1' marginTop='10px' marginBottom='10px' w='25%'>
                                    <Box p='1' ml='1'>
                                        Nama Prodi/Jurusan
                                    </Box>
                                    <Box p='2'>
                                        <Select
                                            className="w-full"
                                            name="prodiInput"
                                            value={formData.prodiInput}
                                            onChange={handleChange}
                                            options={optionsProdi}
                                            isDisabled={!formData.univInput ? true : false}
                                            placeholder={!formData.univInput ? '' : (formData.prodiInput ? formData.prodiInput : 'Input Jurusan Pilihan')}
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    borderRadius: "0.5rem",
                                                    paddingLeft: "0.2rem",
                                                    height: "55px",
                                                    backgroundColor: state.isDisabled ? 'lightgray' : 'white'
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
                    
                    </Box>
                </Container>


            </div>
        </ChakraProvider>
    );


}