import { fetchData, fetchDatawithYear, fetchDatawithIDYear, fetchDatawithIDUniv } from "@/src/api/fetch";
import PageComponent from "./PageComponent"

const UniversityPage = async ({ params }) => {
  const { id } = params;
  const handleGetYear = await fetchData('/select-year');
  const handleGetInfo = await fetchData(`/prodi-information/${id}`);
  const handleGetAvgIPK = await fetchData(`/avg-ipk/${id}`);
  const handleGetSKS = await fetchData(`/avg-sks/${id}`);
  const handleGetAvgGrad = await fetchData(`/average-grad-time-prodi/${id}`);
  const handleGetBar = await fetchDatawithIDYear({
    endpoint: '/grad-time-distribution-prodi',
    selectedIDUniv: id,
    selectedYear: 'All',
  });
  const handleGetStacked = await fetchDatawithIDUniv({
    endpoint: '/grad-progression-prodi',
    selectedIDUniv: id,
  });
  const handleGetPie = await fetchDatawithYear({
    endpoint: '/grad-timeliness-prodi',
    selectedYear: id,
  });

//   const avgGradTime = dataAvgGrad.avg_grad_time ?? 0;
//   const avgIpkOverall = dataAvgIPK[0]?.avg_ipk_overall ?? 0;
//   const avgIpkTepatWaktu = dataAvgIPK[0]?.avg_ipk_tepat_waktu ?? 0;
//   const avgIpkTelat = dataAvgIPK[0]?.avg_ipk_telat ?? 0;
//   const tepatGradPercentage = (newDataPie?.tepat_grad * 100) ?? 0;
  return (
    <PageComponent
      newYear={handleGetYear}
      dataProdiInfo={handleGetInfo}
      dataAvgGrad={handleGetAvgGrad}
      dataPie={handleGetPie}
      dataStacked={handleGetStacked}
      newDataBar={handleGetBar}
      dataAvgIPK={handleGetAvgIPK}
      newDataSKS={handleGetSKS}

    />
  );
}

export default UniversityPage;
