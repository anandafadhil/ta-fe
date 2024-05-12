"use client"

import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, useDisclosure, List,
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
        localStorage.setItem('PROCESSDATAID', JSON.stringify(formData))
        localStorage.setItem('PROCESSDATA', JSON.stringify(retreiveBulk));
        console.log("PROCESS", retreiveBulk)

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
        const selected_id_univ = selectedOption.value;
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

    // const handleChange = (selectedOption, fieldName) => {
    //     const selected_id_univ = selectedOption.value;
    //     console.log(fieldName);
    //     setSelectedID(selected_id_univ);
    //     // const { name, value } = e.target;
    //     if (selectedOption) {
    //         const { label, value } = selectedOption;
    //         setFormData({
    //             ...formData,
    //             [`${fieldName.name}`]: label,
    //             [`${fieldName.name}ID`]: value
    //         });
    //     } else {
    //         setFormData({
    //             ...formData,
    //             [`${fieldName.name}`]: '',
    //             [`${fieldName.name}ID`]: ''
    //         });
    //     }
    // };

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            console.log("Selected file:", file.name);
            setSelectedFile(file.name);

            // FileReader to read the file content
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const json = csvToJson(text); // Convert CSV text to JSON
                console.log("CSV as JSON:", json);

                setOrgData({
                    ...OrgData,
                    file: json,  // Storing the JSON instead of the file object
                });
            };
            reader.readAsText(file); // Read the file as text
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

    const stepsData = [
        {
            stepTitle: "Prepare File",
            listItems: [
                "Merupakan mahasiswa semester 4 atau lebih yang sudah memiliki IP dan IPK",
                "Nilai IP dan IPK tiap semester tidak boleh kosong/null",
                "Isi dari tabel berupa Nomor Induk Mahasiswa, IPK, SKS diperoleh, dan SKS total dari semester 1 hingga 4"
            ]
        },
        {
            stepTitle: "Format File",
            listItems: [
                "Setelah tabel berhasil terisi simpan tabel tersebut dalam format .csv"
            ]
        },
        {
            stepTitle: "Input File",
            listItems: [
                "Pilih file, kemudian unggah pada tempat yang telah disediakan"
            ]
        },
        {
            stepTitle: "Predict",
            listItems: [
                "Setelah file berhasil terunggah seluruhnya, tekan tombol \"Predict\" untuk memulai prediksi"
            ]
        }
    ];


    return (
        <ChakraProvider resetCSS={false}>
            <div>
                <Navbar />
                <Container
                    margin={0}
                    maxWidth='100vw'
                    w='100%'
                    h='100%'
                >


                    {/* Header */}
                    <Box p={4}>
                        <Flex color='black' >
                            <Box p='4' width='300px' height='100px' display='flex' alignItems='center' justifyContent='center'>
                                <Text fontSize='30px' color='black'>
                                    Grouped Predict
                                </Text>
                            </Box>
                        </Flex>
                    </Box>

                    <Box w='100%' p={4}>
                        <Grid
                            templateRows='repeat(2, 1fr)'
                            templateColumns={['1fr', 'repeat(2, 1fr)']} // Responsive columns
                            gap={4}
                            height={['auto', '550px']}  // Allow the grid to expand in height on smaller screens
                        >
                            {stepsData.map((step, index) => (
                                <GridItem
                                    colStart={[1, (index % 2) + 1]}
                                    rowStart={[index + 1, Math.floor(index / 2) + 1]}
                                    p={4}
                                    bg="#13ABC4"
                                    borderRadius="md"
                                    boxShadow="lg"
                                    color="white"
                                    display="flex"
                                    flexDirection="column"
                                    overflowY="auto"
                                    position="relative"
                                >
                                    <GridItem
                                        rowStart={1}
                                        rowEnd={2}
                                        bg='#3161A3'  // Using Chakra UI color scheme
                                        borderRadius='md'
                                        boxShadow='md'
                                        height='50px'
                                        justifySelf='center'
                                        alignSelf='center'
                                        width='100%'
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexDirection="column"
                                    >
                                        <Text fontSize={["md", "lg"]} fontWeight="bold">Step {index + 1}: {step.stepTitle}</Text>
                                    </GridItem>
                                    <GridItem
                                        rowStart={2}
                                        rowEnd={5}
                                        bg='white'  // Using Chakra UI color scheme
                                        borderRadius='md'
                                        boxShadow='md'
                                        justifySelf='center'
                                        alignSelf='center'
                                        width='100%'
                                        display="flex"
                                        flexDirection="column"
                                        p={4}
                                    >

                                        <List spacing={[2, 3]} textAlign='left'>
                                            {step.listItems.map(item => (
                                                <ListItem key={item}>
                                                    <Flex alignItems="center">
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        <Text color="black">{item}</Text>
                                                    </Flex>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </GridItem>

                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                    <Box>
                        <Center>
                            <Box
                                p={4}
                                width={['100%', '70%']} // Responsive width
                                borderRadius='md'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                display='flex'
                                flexDirection={['column', 'row']}
                                alignItems="center"
                                justifyContent="center"
                                mt='20px'
                                bg='#13ABC4'
                                >
                                    
                                {/* Univ Search */}
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
                                            onChange={handleChangeUniv}
                                            options={optionsUni}
                                            placeholder={formData.univInput ? formData.univInput : 'Input Universitas Pilihan'}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    minHeight: '40px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
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
                                            onChange={handleChangeProdi}
                                            options={optionsProdi}
                                            isDisabled={!formData.univInput ? true : false}
                                            placeholder={!formData.univInput ? '' : (formData.prodiInput ? formData.prodiInput : 'Input Jurusan Pilihan')}
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    minHeight: '40px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
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
                                                // New style to change label font color to black
                                                option: (provided) => ({
                                                    ...provided,
                                                    color: "black", // Change label font color to black
                                                }),
                                            }}
                                        />
                                    </Box>
                                </SimpleGrid>
                            </Box>


                        </Center>
                    </Box>


                    {/* File Input */}
                    <Center>
                        <Box
                            p={4}
                            width={['100%', '50%', '30%']} // Responsive width
                            borderRadius='md'
                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                            display='flex'
                            flexDirection={['column', 'row']}
                            alignItems="center"
                            justifyContent="center"
                            mt='20px'
                        >

                            {/* Button and hidden input box */}
                            <Box height="50px" width={['100%', 'auto']} display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                <label htmlFor="fileUpload">

                                    {/* Hidden input box */}
                                    <input
                                        bg='yellow'
                                        id="fileUpload"
                                        type="file"
                                        accept=".csv"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />

                                    {/* Button */}
                                    <Button
                                        color='white'
                                        bg='#3161A3'
                                        variant="outline"
                                        as="span"
                                        width={['100%', 'auto']} // Full width on smaller screens
                                    >
                                        Choose File
                                    </Button>
                                </label>
                            </Box>

                            {/* New input Box */}
                            <Box height="50px" width={['100%', '200px']} display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                <label htmlFor="fileUpload" style={{ width: '100%' }}>
                                    <p
                                        className="w-full p-2 border rounded-lg cursor-pointer"
                                        style={{
                                            minHeight: '40px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        <a className="text-gray-500">
                                            {selectedFile || 'Select a file'}
                                        </a>
                                    </p>
                                </label>
                            </Box>
                        </Box>
                    </Center>

                    {/* Button */}
                    <Box p={4} marginTop='20px'>
                        <Center>
                            <Button
                                color='white'
                                bg='#3161A3'
                                w='200px'
                                h='50px'
                                boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                                onClick={handleSubmit}
                            >
                                Predict
                            </Button>
                        </Center>
                    </Box>
                </Container>
                <Footer />

            </div >
        </ChakraProvider >
    );


}