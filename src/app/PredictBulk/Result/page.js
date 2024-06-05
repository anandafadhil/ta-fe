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

    const univName =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("PROCESSDATAID")).univInput
            : "";
    const prodiName =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("PROCESSDATAID")).prodiInput
            : "";
    const processData =
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("PROCESSDATA"))
            : "";

    // const [processData, setProcessedData] = useState([])
    // const univName = JSON.parse(localStorage.getItem('PROCESSDATAID')).univInput;
    // const prodiName = JSON.parse(localStorage.getItem('PROCESSDATAID')).prodiInput;
    // const length = localStorage.getItem('PROCESSDATA');
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const storedFormData = JSON.parse(localStorage.getItem('PROCESSDATA'));
    //         setProcessedData(storedFormData);
    //     }
    // }, []);
    // const processedLength = JSON.parse(length);
    const [totalData, setTotalData] = useState(processData?.data?.length || 0)
    const [TableData, setTableData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(Math.ceil(totalData / perPage));
    const title = ['Nomor', 'Identifier Mahasiswa', 'Hasil Prediksi'];
    const param = ['number', 'NPM', 'RES'];
    const newParam = ['NPM', 'RES'];

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
    }

    const renewData = async () => {
        const storedData = localStorage.getItem('PROCESSDATA');
        const processData = JSON.parse(storedData);
        const data = await fetchTable({
            endpoint: '/handle-table-bulk',
            data: processData,
            pageSize: perPage,
            pageNumber: currentPage,
        });
        setTableData(data)
        setTotalPage(Math.ceil(totalData / perPage))
    }

    useEffect(() => {
        renewData();
    }, [perPage, currentPage]);

    useEffect(() => {
        const fetchData = async () => {
            await handleTable();

        }
        fetchData();

    }, []);

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
    // console.log(TableData)
    return (
        <ChakraProvider resetCSS={false}>
            <Navbar />
            <Container
                margin={0}
                bg='#EFF0F1'
                maxWidth='100vw'
                h={`${perPage === 5 ? '100%' : '100%'}`}>

                <Box p={4} position='relative'>
                    <Center>
                        <Box
                            p='4'
                            mt='30px'
                            width='800px'
                            height='250px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Box>
                                <Center>
                                    <Text lineHeight='20px' fontSize="30px" color="black" fontStyle='italic'>
                                        Bulk Prediction
                                    </Text>
                                </Center>

                                <Center>
                                    <Text fontSize="68px" color="black" fontWeight="bold">
                                        Hasil Prediksi
                                    </Text>
                                </Center>
                                <Center>
                                    <Text lineHeight='10px' fontSize="26px" color="black" sx={{ filter: 'blur(15px)' }} >
                                        {prodiName} | {univName}
                                    </Text>
                                </Center>
                            </Box>
                        </Box>
                    </Center>
                </Box>

                {/* Table */}
                <div className='content w-2/5 rounded-2xl overflow-hidden flex flex-col mx-auto'>
                    <div className='relative overflow-x-auto'>
                        <table className='bg-white border-2 w-full text-sm text-left my-4 rounded-2xl overflow-hidden shadow-md'>
                            <thead className='text-black font-bold text-[26px] px-6 py-3 text-center'>
                                <tr className='border-2 '>
                                    <td scope="col" className="px-6 py-3 text-center">Nomor</td>
                                    <td scope="col" className="px-6 py-3 text-left">Identifier Mahasiswa</td>
                                    <td scope="col" className="px-6 py-3 text-left">Hasil Prediksi</td>
                                </tr>
                            </thead>
                            <tbody>
                                {TableData !== null ? (
                                    TableData?.map((dataTable, index) => (
                                        <tr className="text-[20px]" key={index}>
                                            <td className="px-6 py-4 text-center">{dataTable.number}</td>
                                            <td className="px-6 py-4 text-left blur-lg">{dataTable.NPM}</td>
                                            <td className={`px-6 py-4 text-left font-bold ${dataTable.RES === "Tepat Waktu" ? 'text-green-400' : 'text-red-400'}`}>
                                                {dataTable.RES}
                                            </td>
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
                            <div className="perpage h-full flex items-center gap-2 text-s">
                                <span> Baris untuk ditampilkan</span>
                                <select
                                    className="select select-bordered h-[20px]border-2 select-xs w-full max-w-[80px]"
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
                                    pageClassName={"inline-block px-2 py-1 text-black-600 border border-gray-300 text-s"}
                                    activeClassName={"bg-gray-300"}
                                    previousClassName={"inline-block px-2 py-1 text-black-600 border border-gray-300 text-s"}
                                    nextClassName={"inline-block px-2 py-1 text-black-600 border border-gray-300 text-s"}
                                    breakClassName={"inline-block px-2 py-1 text-black-600 border border-gray-300 text-s"}
                                    disabledClassName={"text-gray-400"}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Button */}
                <Box p={4} h='200px' marginTop='20px'>
                    <Center>
                        <Button
                            color='white'
                            bg="#004AAD"
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