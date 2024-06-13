    "use client"

    import {
        ChakraProvider, Container, Flex, Center, Text,
        Box, GridItem, Grid, SimpleGrid
    } from "@chakra-ui/react";
    import Navbar from '@/src/component/navbar';
    import PieChartPredict from "@/src/component/PieChartPredict";
    import LineChartEx from "@/src/component/LineChartEx";
    import LineChartEx2 from "@/src/component/LineChartEx2";
    import '@/src/app/styles.css';
    import Footer from "@/src/component/footer";
    import useStore from "@/src/store"

    export default function PageComponent() {
        const univProdi = useStore((state) => state.formData);
        const dataSKST = useStore((state) => state.skst);
        const dataIPK = useStore((state) => state.ipk);
        const sksNeeded = useStore((state) => state.sksNeeded);
        const ketepatanGradTime = useStore((state) => state.ketepatanWaktu);
        const predictResult = useStore((state) => state.predictResult)

        const lulusHandler = () => {
            if (predictResult.prediction === true) {
                return " Tepat Waktu";
            } else {
                return " Tidak Tepat Waktu";
            }
        }
        return (
            <ChakraProvider resetCSS={false}>
                <div>
                    <Navbar />
                    <Container
                        margin={0}
                        bg='#EFF0F1'
                        maxWidth='100vw'
                        w='100%'
                        h='100%'>

                        {/* Header */}
                        <Box p={4} position='relative'>
                            <Center>
                                <Box
                                    mt='40px'
                                    p='4'
                                    width='950px'
                                    height='200px'
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
                                            <Text lineHeight='90px' fontSize="60px" color="black" fontWeight="bold">
                                                Hasil Prediksi
                                            </Text>
                                        </Center>
                                    </Box>
                                </Box>
                            </Center>
                        </Box>

                        <Box position="relative">
                            {/* Lulus Card */}
                            <Center>
                                <Box
                                    p={4}
                                    bg='#004AAD'
                                    width="80%"
                                    borderRadius='2xl'
                                    boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                                    marginBottom='20px'
                                >
                                    <Box p="4" display="flex" alignItems="center" justifyContent="center" borderRadius='md'>
                                        <Text fontSize="48px" color='white' fontWeight='bold'>
                                            Anda diprediksi akan lulus
                                            <span style={{ color: predictResult.prediction ? "#82ca9d" : "#FF6961" }}>
                                                {lulusHandler()}
                                            </span> dari
                                        </Text>
                                    </Box>
                                    <Box mb='35px' display="flex" alignItems="center" justifyContent="center">
                                        <Text lineHeight='20px' fontSize="40px" color='white'>
                                            {univProdi.prodiInput} | {univProdi.univInput}
                                        </Text>
                                    </Box>

                                </Box>
                            </Center>

                            {/* First Card Chart */}
                            <Box w='100%'>
                                <Box
                                    p={4}
                                    color='white'
                                    height='500px'
                                    marginTop='30px'
                                    borderRadius='md'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    {/* Line Chart SKS */}
                                    <GridItem
                                        p={2}
                                        w='100%'
                                        bg='white'
                                        height='450px'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                                        display="grid"
                                        gridTemplateColumns="1fr"
                                    >
                                        <GridItem
                                            w='90%'
                                            height='450px'
                                            justifySelf='center'
                                            alignSelf='center'
                                            padding='4px'
                                        >
                                            <LineChartEx dataSKST={dataSKST} />
                                        </GridItem>
                                    </GridItem>

                                    {/* Line Chart IPK */}
                                    <GridItem
                                        p={2}
                                        mr='20px'
                                        ml='20px'
                                        w='100%'
                                        height='450px'
                                        bg='white'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                                        display="grid"
                                        gridTemplateColumns="1fr"
                                    >
                                        <GridItem
                                            w='90%'
                                            height='450px'
                                            justifySelf='center'
                                            alignSelf='center'
                                            padding='4px'
                                        >
                                            <LineChartEx2 dataSKST={dataIPK} />
                                        </GridItem>

                                    </GridItem>

                                    {/* Pie Chart */}
                                    <GridItem
                                        p={2}
                                        w='100%'
                                        height='450px'
                                        bg='white'
                                        borderRadius='2xl'
                                        boxShadow='0px 4px 10px rgba(0, 0, 0, 0.1)'
                                        display="grid"
                                        gridTemplateColumns="1fr"
                                    >
                                        <GridItem
                                            w='90%'
                                            height='450px'
                                            justifySelf='center'
                                            alignSelf='center'
                                            padding='4px'
                                        >
                                            <PieChartPredict dataPie={ketepatanGradTime} />
                                        </GridItem>

                                    </GridItem>

                                </Box>
                            </Box>

                            {/* Rekomendasi SKS */}
                            <Box
                                p={4}
                                color='white'
                                height='200px'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                w='100%'
                            >
                                <Flex
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    gap='2'
                                    w='100%'
                                    p={2}
                                    borderWidth='3px'
                                    borderRadius='2xl'
                                    borderColor='#7B7B7B'
                                    bg='#EFF0F1'
                                >

                                    {/* Text */}
                                    <SimpleGrid
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                        columns='1'
                                        marginTop='10px'
                                        marginBottom='10px'
                                        w='70%'>
                                        <Box p='2'>
                                            <Text color='black' fontSize='20px'>
                                                Anda disarankan untuk mengambil <strong>minimal {sksNeeded[0]?.sks_needed} SKS</strong> di setiap semester selanjutnya untuk lulus tepat waktu.
                                            </Text>
                                        </Box>
                                    </SimpleGrid>

                                </Flex>
                            </Box>
                        </Box>


                    </Container>
                    <Footer />

                </div >
            </ChakraProvider >
        );


    }