import { fetchData } from "../../api/fetch"
import PageComponent from "./PageComponent"

export default async function Page() {
    const data = await fetchData('/univ-predict');

    return <PageComponent data={data}/>
}