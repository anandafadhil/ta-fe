import { fetchData } from "../../api/fetch"
import PageComponent from "./PageComponent"

export default async function Page() {
    const data = await fetchData('/univ-name');

    return <PageComponent data={data}/>
}