import { fetchData } from "@/src/api/fetch";
import PageComponent from "./PageComponent"

export default async function Page() {
    // const data = await fetchData('/get-prediction');
    const data = await fetchData('/get-prediction');

    return <PageComponent data={data}/>
}