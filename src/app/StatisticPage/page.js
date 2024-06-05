import { fetchData, fetchDatawithYear } from "../../api/fetch"
import PageComponent from "./PageComponent"

export default async function Page() {
    const data = await fetchData('/univ-vis');

    const selectYear = await fetchData('/select-year');

    const totalProdi = await fetchData('/total-prodi');

    const totalUniv = await fetchData('/total-univ');

    const avgYearAllUniv = await fetchData('/average-grad-time')

    const dataPie = await fetchData('/grad-timeliness')

    const dataStacked = await fetchData('/grad-progression')

    const defaultBar = await fetchDatawithYear({
        endpoint: '/grad-distribution',
        selectedYear: 'All',
    })

    const defaultGeo = await fetchDatawithYear({
        endpoint: '/geochart',
        selectedYear: 'All',
    })

    return <PageComponent
        data={data}
        selectYear={selectYear}
        totalProdi={totalProdi}
        totalUniv={totalUniv}
        avgYearAllUniv={avgYearAllUniv}
        dataPie={dataPie}
        dataStacked={dataStacked}
        defaultBar={defaultBar}
        defaultGeo={defaultGeo}
    />
}