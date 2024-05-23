import { fetchData, fetchDatawithYear } from "../../api/fetch"
import PageComponent from "./PageComponent"

export default async function Page() {
    const data = await fetchData('/univ-name');

    const avgYearAllUniv = await fetchData('/get-avg-grad-time-univ-all')

    const dataPie = await fetchData('/get-ketepatan-grad-time-univ-all')

    const dataStacked = await fetchData('/get-prog-grad-time-univ-all')

    const defaultBar = await fetchDatawithYear({
        endpoint: '/get-dist-grad-univ-all',
        selectedYear: 'All',
    })

    const defaultGeo = await fetchDatawithYear({
        endpoint: '/get-geochart',
        selectedYear: 'All',
    })

    return <PageComponent
        data={data}
        avgYearAllUniv={avgYearAllUniv}
        dataPie={dataPie}
        dataStacked={dataStacked}
        defaultBar={defaultBar}
        defaultGeo={defaultGeo}
    />
}