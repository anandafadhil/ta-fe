import { fetchData, fetchDatawithYear, fetchDatawithIDYear, fetchDatawithIDUniv } from "@/src/api/fetch";
import PageComponent from "./PageComponent"

const UniversityPage = async ({ params }) => {
  const { id } = params;
  const handleGetYear = await fetchData('/select-year');
  const handleGetInfo = await fetchData(`/univ-information/${id}`);
  const handleProdi = await fetchData(`/prodi-vis/${id}`);
  const handleGetBar = await fetchDatawithIDYear({
    endpoint: '/grad-time-distribution-univ',
    selectedIDUniv: id,
    selectedYear: 'All',
  });
  const handleGetStacked = await fetchDatawithIDUniv({
    endpoint: '/grad-progression-univ',
    selectedIDUniv: id,
  });
  const handleGetPie = await fetchDatawithYear({
    endpoint: '/grad-timeliness-univ',
    selectedYear: id,
  });
  const handleGetRanking = await fetchDatawithIDUniv({
    endpoint: '/prodi-ranking',
    selectedIDUniv: id,
  });
  const handleGetAvgGrad = await fetchData(`/average-grad-time-univ/${id}`);

  return (
    <PageComponent
      newYear={handleGetYear}
      dataProdi={handleProdi}
      dataUnivInfo={handleGetInfo[0]}
      dataAvgGrad={handleGetAvgGrad}
      dataPie={handleGetPie}
      dataStacked={handleGetStacked}
      newDataBar={handleGetBar}
      TableData={handleGetRanking}
    />
  );
}

export default UniversityPage;
