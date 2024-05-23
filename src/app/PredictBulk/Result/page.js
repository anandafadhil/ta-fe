"use client"
import Image from 'next/image';
import {
    ChakraProvider, VStack, Container,
    Flex, Spacer, Center, Square, Text,
    Box, Grid, GridItem, Button, Input,

} from "@chakra-ui/react";
import Navbar from '@/src/component/navbar';
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import generateExcel from '../../../component/GenerateExcel';
import Footer from '@/src/component/footer';
import '../../styles.css';
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState } from "react";
import { fetchTable } from '@/src/api/fetch';


export default function PageComponent() {
    const router = useRouter();

    // Lulus Text
    const lulus = true;
    const univName = JSON.parse(localStorage.getItem('PROCESSDATAID')).univInput;
    const prodiName = JSON.parse(localStorage.getItem('PROCESSDATAID')).prodiInput;

    const length = localStorage.getItem('PROCESSDATA');
    const processedLength = JSON.parse(length);
    const [totalData, setTotalData] = useState(processedLength?.data?.length || 0)
    const [TableData, setTableData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(Math.ceil(totalData / perPage));
    const title = ['No', 'NPM', 'Result'];
    const param = ['number', 'NPM', 'RES'];
    const newParam = ['NPM', 'RES'];
    console.log("total data", totalData);
    console.log("total page", totalPage);

    const handleSubmit = async () => {
        try {
            const storedData = localStorage.getItem('PROCESSDATA');
            const processData = JSON.parse(storedData);
            const data = await fetchTable({
                endpoint: '/handle-table-bulk',
                data: processData,
                pageSize: 0,
                pageNumber: currentPage,
            });
            console.log("download", data)
            const tableTitle = "Result Predict Bulk"
            const fileName = "predict_bulk.xlsx"
            generateExcel(
                data,
                title,
                newParam,
                tableTitle,
                fileName
            );
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleTable = async () => {
        const storedData = localStorage.getItem('PROCESSDATA');
        const processData = JSON.parse(storedData);
        const data = await fetchTable({
            endpoint: '/handle-table-bulk',
            data: processData,
            pageSize: perPage,
            pageNumber: currentPage,
        });
        setTableData(data)
        console.log("newQuery", data)
    }

    const renewData = async () => {
        console.log("b");
        const storedData = localStorage.getItem('PROCESSDATA');
        const processData = JSON.parse(storedData);
        const data = await fetchTable({
            endpoint: '/handle-table-bulk',
            data: processData,
            pageSize: perPage,
            pageNumber: currentPage,
            // data: processData,
            // pageSize: 5,
            // pageNumber: 2,
        });
        console.log("renew", data)
        setTableData(data)
    }

    useEffect(() => {
        renewData();
    }, [perPage, currentPage]);

    useEffect(() => {
        const fetchData = async () => {
            await handleTable();

        }
        // if (Array.isArray(processData.data)) {
        //     setTableData(processData.data);
        // } else {
        //     console.error('Data retrieved from local storage is not an array:', processData.data);
        // }
        fetchData();

    }, []);

    // if (TableData.length > 0) {
    //     console.log("next", TableData);
    // } else {
    //     console.log("TableData is empty or not an array", TableData);
    // }
    const handlePerPageChange = (e) => {
        setPerPage(e.target.value);
    };

    const handlePageClick = async (e) => {
        const newPage = e.selected + 1;
        setCurrentPage(newPage);
    };

    useEffect(() => {
        if (TableData) {
            console.log("next", TableData);
        } else {
            console.log("TableData is not yet set or is empty");
        }
    }, [TableData]);

    // })
    return (
        <ChakraProvider resetCSS={false}>
            <Navbar />
            <Container
                margin={0}
                maxWidth='100vw'
                w='100%'
                h={`${perPage === 5 ? '100vh' : '100%'}`}>

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
                            bg='#3161A3'
                            width="60%"
                            borderRadius='md'
                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                        >
                            <Box>
                                <Center>
                                    <Text fontSize="30px" color="white" fontWeight="bold">
                                        Hasil Prediksi Mahasiswa
                                    </Text>
                                </Center>

                                <Center>
                                    <Text fontSize="26px" color="white">
                                        {univName} - {prodiName}
                                    </Text>
                                </Center>
                            </Box>
                        </Box>
                    </Center>
                </Box>

                {/* Table */}
                <div className='content w-3/5 flex flex-col mt-2 mx-auto'>
                    <div className='relative overflow-x-auto'>
                        <table className='border-2 w-full text-sm text-left my-4 rounded-lg overflow-hidden shadow-md'>
                            <thead className='bg-[#3161A3] text-white rounded-tl-lg rounded-tr-lg '>
                                <tr className='first:rounded-tl-lg last:rounded-tr-lg border-2 '>
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
                            </tbody>
                        </table>

                        <div className="pagination flex justify-between gap-2 mt-4">
                            <div className="perpage flex items-center gap-2 text-xs">
                                <span> Baris untuk ditampilkan</span>
                                <select
                                    className="select select-bordered border-2 select-xs w-full max-w-[80px]"
                                    onChange={handlePerPageChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                </select>
                            </div>
                            <div className="pagination">
                                <ReactPaginate
                                    breakLabel={"..."}
                                    previousLabel={"«"}
                                    nextLabel={"»"}
                                    pageCount={totalPage}
                                    onPageChange={handlePageClick}
                                    containerClassName={"flex gap-1 items-center"}
                                    pageClassName={"inline-block px-2 py-1 text-black-600 border border-gray-300 text-xs"}
                                    activeClassName={"bg-gray-300"}
                                    previousClassName={"inline-block px-2 py-1 text-black-600 border border-gray-300 text-xs"}
                                    nextClassName={"inline-block px-2 py-1 text-black-600 border border-gray-300 text-xs"}
                                    breakClassName={"inline-block px-2 py-1 text-black-600 border border-gray-300 text-xs"}
                                    disabledClassName={"text-gray-400"}
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
                            bg="#13ABC4"
                            w='200px'
                            h='50px'
                            boxShadow='0px 4px 6px rgba(0, 0, 0, 0.7)'
                            onClick={handleSubmit}
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