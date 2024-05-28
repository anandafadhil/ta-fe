"use client"

import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, useDisclosure, Link,
    ListItem, ListIcon
} from "@chakra-ui/react";
import { MdCheckCircle } from 'react-icons/md';
import Select from "react-select";
import { useRouter } from 'next/navigation'
import Navbar from '@/src/component/navbar';
import React, { useEffect, useState } from "react";
import '../styles.css';
import Footer from "@/src/component/footer";
import { fetchData, postData, postNoIDData } from "@/src/api/fetch";

export default function PredictBulk(props) {
    const { data } = props;
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleUploadClick = () => {
        router.push('/PredictBulk');
    };

    const optionsUni = data.distinct_universities.map(([id, name]) => ({
        value: id,
        label: name
    }));

    const [formData, setFormData] = useState({
        univInput: '',
        univInputID: '',
        prodiInput: '',
        prodiInputID: '',
    });

    const [OrgData, setOrgData] = useState({
        file: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        const retreiveBulk = await postNoIDData({
            endpoint: `/bulk-handle/${formData.prodiInputID}`,
            data: OrgData.file,
        });
        console.log("ret", retreiveBulk)
        localStorage.setItem('PROCESSDATAID', JSON.stringify(formData))
        localStorage.setItem('PROCESSDATA', JSON.stringify(retreiveBulk));
        router.push('/PredictBulk/Result');
    };

    const [optionsProdi, setOptionsProdi] = useState([])
    const handleChangeUniv = async (selectedOption, fieldName) => {
        const selected_id_univ = selectedOption.value;
        const dataProdi = await fetchData(`/prodi/${selected_id_univ}`);
        const optionsProdi = dataProdi.prodi.map(([id, name]) => ({
            value: id,
            label: name
        }));
        setOptionsProdi(optionsProdi);

        if (selectedOption) {
            const { label, value } = selectedOption;
            setFormData({
                ...formData,
                [`${fieldName.name}`]: label,
                [`${fieldName.name}ID`]: value
            });
        } else {
            setFormData({
                ...formData,
                [`${fieldName.name}`]: '',
                [`${fieldName.name}ID`]: ''
            });
        }
    };

    const handleChangeProdi = async (selectedOption, fieldName) => {
        if (selectedOption) {
            const { label, value } = selectedOption;
            setFormData({
                ...formData,
                [`${fieldName.name}`]: label,
                [`${fieldName.name}ID`]: value
            });
        } else {
            setFormData({
                ...formData,
                [`${fieldName.name}`]: '',
                [`${fieldName.name}ID`]: ''
            });
        }

    };

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file.name);
            setSelectedFile(file.name);

            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const json = csvToJson(text);
                console.log("CSV as JSON:", json);

                setOrgData({
                    ...OrgData,
                    file: json,
                });
            };
            reader.readAsText(file);
        }
    };

    // Function to convert CSV text to JSON
    const csvToJson = (csv) => {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',').map(header => header.trim()); // Trim headers to remove unexpected spaces

        for (let i = 1; i < lines.length - 1; i++) {
            let obj = {};
            const currentline = lines[i].trim().replace(/\r$/, '').split(','); // Trim each line and remove trailing carriage returns

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }


    const handleDownload = () => {
        const downloadPath = "/assets/training_contoh.csv";
        const link = document.createElement("a");
        link.href = downloadPath;
        link.download = "training_contoh.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <ChakraProvider resetCSS={false}>
            <div>
                <Navbar />
                <Container
                    margin={0}
                    bg='#EFF0F1'
                    maxWidth='100vw'
                    w='100%'
                    h='100%'
                >
                    {/* Header */}
                    <Box p={4} position='relative'>
                        <Center>
                            <Box
                                p='4'
                                mt='55px'
                                width='800px'
                                height='150px'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                            >
                                <Box>
                                    <Center>
                                        <Text fontSize="22px" color="black">
                                            Prediksi Ketepatan Waktu Lulus Mahasiswa
                                        </Text>
                                    </Center>

                                    <Center>
                                        <Text lineHeight='75px' fontSize="48px" color="black" fontStyle='italic' fontWeight="bold">
                                            Bulk Prediction
                                        </Text>
                                    </Center>
                                </Box>
                            </Box>
                        </Center>
                    </Box>

                    {/* Step by Step */}
                    <Box
                        mt='10px'
                        w='100%'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Box
                            w='40%'
                            p={4}
                            color='white'
                            height='300px'
                            display='flex'

                            borderRadius='2xl'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <GridItem
                                p={2}
                                w='100%'
                                height='300px'
                                borderRadius='2xl'
                            >
                                {/* Header */}
                                <GridItem
                                    h='20%'
                                    borderBottomWidth='2px'
                                    borderColor='#EFF0F1'
                                    bg='white'
                                    borderTopLeftRadius='2xl'
                                    borderTopRightRadius='2xl'
                                    boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                                    justifySelf='center'
                                    alignSelf='center'
                                    width='100%'
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                >
                                    <Text color='black' fontWeight='bold' fontSize='20px'>
                                        Menyiapkan file CSV
                                    </Text>
                                </GridItem>

                                {/* Input */}
                                <GridItem
                                    h='80%'
                                    bg='white'
                                    borderBottomLeftRadius='2xl'
                                    borderBottomRightRadius='2xl'
                                    boxShadow='md'
                                    justifySelf='center'
                                    alignSelf='center'
                                    width='100%'
                                    display="flex"
                                    flexDirection="column"
                                    p={4}
                                    fontSize='20px'
                                >
                                    <Text color='black'>
                                        1. Unduh <Link as="button" onClick={handleDownload} color="blue.500" textDecoration="underline">template</Link> ini.
                                    </Text>
                                    <Text color='black'>
                                        2. Isi dengan data akademik masing-masing mahasiswa.
                                    </Text>
                                    <Text color='black'>
                                        3. Kolom '<em>Identifier</em> Mahasiswa' disarankan untuk diisi<br />dengan nama atau Nomor Induk Mahasiswa.
                                    </Text>
                                    <Text color='red'>
                                        4. Jangan menghapus atau menambahkan kolom baru.
                                    </Text>
                                    <Text color='black'>
                                        5. Save file sebagai <strong>CSV</strong> dan unggah pada <em>field</em> di bawah.
                                    </Text>
                                </GridItem>
                            </GridItem>
                        </Box>
                    </Box>

                    {/* Univ Search's Box */}
                    <Box
                        p={4}
                        color='white'
                        height='200px'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Flex
                            bg='white'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            w='40%'
                            h='100%'
                            p={2}
                            borderWidth='3px'
                            borderRadius='2xl'
                            borderColor='#7B7B7B'
                        >
                            <Grid
                                h='100%'
                                w='100%'
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                flexDirection='column'
                            >
                                {/* Univ Prodi Input */}
                                <GridItem w='100%' display='flex'>
                                    {/* Univ Search */}
                                    <SimpleGrid columns='1' w='50%'>
                                        <Box p='2'>
                                            <Select
                                                className="w-full"
                                                name="univInput"
                                                value={formData.univInputLabel}
                                                onChange={handleChangeUniv}
                                                options={optionsUni}
                                                placeholder={formData.univInputLabel ? formData.univInputLabel : 'Nama Universitas'}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        borderRadius: "0.5rem",
                                                        borderWidth: "0.2rem",
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
                                                    option: (provided) => ({
                                                        ...provided,
                                                        color: "black",
                                                    }),
                                                }}
                                            />
                                        </Box>
                                    </SimpleGrid>

                                    {/* Prodi Search */}
                                    <SimpleGrid columns='1' w='50%'>
                                        <Box p='2'>
                                            <Select
                                                className="w-full"
                                                name="prodiInput"
                                                value={formData.prodiInput}
                                                onChange={handleChangeProdi}
                                                options={optionsProdi}
                                                isDisabled={!formData.univInput ? true : false}
                                                placeholder={!formData.univInput ? '' : (formData.prodiInput ? formData.prodiInput : 'Input Jurusan Pilihan')}
                                                styles={{
                                                    control: (base, state) => ({
                                                        ...base,
                                                        borderRadius: "0.5rem",
                                                        borderWidth: "0.2rem",
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
                                                    option: (provided) => ({
                                                        ...provided,
                                                        color: "black",
                                                    }),
                                                }}
                                            />
                                        </Box>
                                    </SimpleGrid>
                                </GridItem>

                                {/* File Input */}
                                <GridItem w='100%' display='flex'>
                                    {/* Button */}
                                    <SimpleGrid
                                        columns='1' 
                                        w='30%' 
                                        p={2}>
                                        <label htmlFor="fileUpload" className="h-full">

                                            <input
                                                id="fileUpload"
                                                type="file"
                                                accept=".csv"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                            <Box
                                                h='100%'
                                                w='100%'
                                                display='flex'
                                                alignItems='center'
                                                justifyContent='center'>
                                                <Button
                                                    h='100%'
                                                    w='100%'
                                                    color='white'
                                                    bg='#004AAD'
                                                    variant="outline"
                                                    as="span"
                                                >
                                                    <Text fontSize='21px'>
                                                        Choose File
                                                    </Text>
                                                </Button>
                                            </Box>
                                        </label>
                                    </SimpleGrid>

                                    {/* Input Box */}
                                    <SimpleGrid columns='1' w='70%' p={2}>
                                        <Box height="50px" width={['100%', 'auto']} display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                            <label htmlFor="fileUpload" style={{ width: '100%' }}>
                                                <p
                                                    className="w-full p-2 border rounded-lg cursor-pointer"
                                                    style={{
                                                        minHeight: '40px',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                        borderWidth: "0.2rem",
                                                        borderColor: "#EFF0F1"

                                                    }}
                                                >
                                                    <a className="text-gray-500">
                                                        {selectedFile || 'Select a file'}
                                                    </a>
                                                </p>
                                            </label>
                                        </Box>
                                    </SimpleGrid>
                                </GridItem>
                            </Grid>


                        </Flex>

                    </Box>

                    {/* Bulk Predict's Button */}
                    <SimpleGrid columns='1' h='200px' justifyContent="center" w='100%'>
                        <Box p={4}>
                            <Center>
                                <Button
                                    color='white'
                                    bg='#004AAD'
                                    w='200px'
                                    h='50px'
                                    boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                    onClick={handleSubmit}
                                >
                                    Lakukan Prediksi
                                </Button>
                            </Center>
                        </Box>
                    </SimpleGrid>
                </Container>
                <Footer />

            </div >
        </ChakraProvider >
    );


}