"use client"
import Image from 'next/image';
import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,
    SimpleGrid, Select, InputSelect,
    FormControl, Modal, ModalOverlay,
    ModalContent, ModalCloseButton,
    ModalFooter, ModalBody, ModalHeader,
    useDisclosure, FormLabel, Textarea,

} from "@chakra-ui/react";
import Navbar from '@/src/component/navbar';
import { useRouter } from 'next/navigation'
import TableComponent from "../../../component/table"
import Footer from '@/src/component/footer';
import '../../styles.css';
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from "react";

export default function PageComponent() {
    const router = useRouter();

    // Lulus Text
    const lulus = true;
    // const prodiName = localStorage.getItem('PROCESSDATAID').prodiInput;
    // const univName = localStorage.getItem('PROCESSDATAID').univInput;
    const univName = JSON.parse(localStorage.getItem('PROCESSDATAID')).univInput;
    const prodiName = JSON.parse(localStorage.getItem('PROCESSDATAID')).prodiInput;
    // console.log(univOld)
    // console.log(univName)
    // const univName = "Institut Teknologi Bandung - Teknik Elektro Teknik";
    const univNameHandler = () => {
        "hello"
    }
    const [TableData, setTableData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('PROCESSDATA');
        const processData = JSON.parse(storedData);
        if (Array.isArray(processData.data)) {
            setTableData(processData.data);
        } else {
            console.error('Data retrieved from local storage is not an array:', processData.data);
            // Handle this case as needed, such as setting a default value for TableData
        }
    }, []);

    // Now you can safely use TableData.map without encountering the TypeError
    if (TableData.length > 0) {
        console.log("next", TableData);
    } else {
        console.log("TableData is empty or not an array", TableData);
    }

    useEffect(() => {
        // This useEffect will run when `TableData` changes and is not null
        if (TableData) {
            console.log("next", TableData);
            // Add your processing logic here
        } else {
            console.log("TableData is not yet set or is empty");
        }
    }, [TableData]);
    // console.log("b", processData)
    // useEffect(() => {
    const title = ['No', 'NPM', 'IPK Sem 1', 'IPK sem 2', 'IPK sem 3', 'IPK sem 4'];
    const param = ['NPM', 'IPK_sem_1', 'IPK_sem_2', 'IPK_sem_3', 'IPK_sem_4'];

    // })
    return (
        <ChakraProvider resetCSS={false}>
            <Navbar />
            <Container
                margin={0}
                maxWidth='100vw'
                w='100%'
                h='89vh'>

                {/* Header */}
                <Box p={4}>
                    <Flex color='black' >
                        <Box
                            p='4'
                            width='300px'
                            height='100px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Text fontSize='30px' color='black'>
                                Result Predict
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                {/* Univ Name Card */}
                <Box position="relative" >
                    <Center>
                        <Box
                            p={4}
                            mb='10px'
                            bg="#13ABC4"
                            width="60%"
                            borderRadius='md'
                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                        >
                            <Box>
                                <Center>
                                    <Text fontSize="30px" color="black">
                                        Hasil Prediksi Mahasiswa
                                    </Text>
                                </Center>

                                <Center>
                                    <Text fontSize="26px" color="black">
                                        {univName} - {prodiName}
                                    </Text>
                                </Center>


                            </Box>
                        </Box>
                    </Center>
                </Box>

                {/* Table */}
                <hr className='border w-full -translate-y-[2px] mt-7 z-0 relative' />
                <div className='content w-4/5 flex flex-col mt-2 mx-auto'>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left my-4 rounded-lg overflow-hidden shadow-lg'>
                            <thead className='bg-[#13ABC4] rounded-tl-lg rounded-tr-lg'>
                                <tr className='first:rounded-tl-lg last:rounded-tr-lg border-2'>
                                    {/* <th
                                        scope='col'
                                        className='px-6 py-3'
                                        style={{
                                            width: "5px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <p>No</p>
                                        </div>
                                    </th>
                                    <th scope='col' className='px-6 py-3 text-center'>
                                        HA
                                    </th> */}
                                    {title.map((item, index) => (
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                            key={index}
                                            style={{
                                                width: index === 0 ? "5px" : "",
                                                textAlign: index === 0 ? "center" : "",
                                            }}
                                        >
                                            <div className="flex items-center gap-2" key={index}>
                                                <p>{item}</p>
                                                <div className="w-6 relative">
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TableData !== null ? (
                                    TableData?.map((dataTable, index) => (
                                        <tr className="" key={index}>
                                            <td className="px-6 py-4 text-center">
                                                {1 + index}
                                            </td>
                                            {param.map((item, index) => (
                                                <td className="px-6 py-4" key={index}>
                                                    {item === "path_file" ? (
                                                        <a
                                                            target="_blank"
                                                            className="cursor-pointer hover:text-blue-500 hover:underline"
                                                            href={`${process.env.NEXT_PUBLIC_BASEURL_IMG}${dataTable?.path_file}`}
                                                        >
                                                            {dataTable?.path_file}
                                                        </a>
                                                    ) : item === "created_date" || item === "expired_date" ? (
                                                        formatDate(dataTable?.[item])
                                                    ) : (
                                                        dataTable[item]
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={param.length + 2}>not found</td>
                                    </tr>
                                )}
                                {/* {TableData !== null ? (
                                    TableData.map((dataTable, index) => (
                                        <tr className='border-2'>
                                            <td className='px-6 py-4 text-center'>
                                                1
                                            </td>
                                            {param.map((item, index) => (
                                                <td className='px-6 py-4 text-center'>
                                                    {dataTable[item]}
                                                </td>
                                            )}
                                    ))}
                                                                            </tr>

                                            <tr className='border-2'>
                                                <td className='px-6 py-4 text-center'>
                                                    1
                                                </td>
                                                <td className='px-6 py-4 text-center'>
                                                    ini halo
                                                </td>
                                                <td className='px-6 py-4 text-center'>
                                                    ini halo
                                                </td>
                                                <td className='px-6 py-4 text-center'>
                                                    ini halo
                                                </td>
                                            </tr>
                                            <tr className='border-2'>
                                                <td className='px-6 py-4 text-center'>
                                                    2
                                                </td>
                                                <td className='px-6 py-4 text-center'>
                                                    ini halo
                                                </td>
                                                <td className='px-6 py-4 text-center'>
                                                    ini halo
                                                </td>
                                                <td className='px-6 py-4 text-center'>
                                                    ini halo
                                                </td>
                                            </tr> */}
                            </tbody>
                        </table>

                        {/* <span>
                            abcd
                        </span> */}
                        <div className="pagination flex justify-between gap-2 mt-4">
                            <div className="perpage flex items-center gap-2 text-xs">
                                <span> Baris untuk ditampilkan</span>
                                <select
                                    className="select select-bordered select-xs w-full max-w-[80px]"
                                // onChange={handlePerPageChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                </select>
                            </div>
                            <div className="pagination">
                                <ReactPaginate
                                    breakLabel={"..."}
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    pageCount={2}
                                    // onPageChange={handlePageClick}
                                    pageClassName={"join-item btn btn-sm"}
                                    pageLinkClassName={""}
                                    activeClassName={"active-pagination"}
                                    className={"flex gap-1 items-center"}
                                    disabledClassName={"disabled"}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Button */}
                <Box p={4} marginTop='20px'>
                    <Center>
                        <Button
                            color='white'
                            bg='#3161A3'
                            w='200px'
                            h='50px'
                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                        // onClick={handleSubmit}
                        >
                            Unduh
                        </Button>
                    </Center>
                </Box>
            </Container>

            <Footer />
        </ChakraProvider>
    );
};