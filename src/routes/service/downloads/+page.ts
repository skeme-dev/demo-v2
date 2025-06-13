import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(PUBLIC_POCKETBASE_URL + "/api/collections/_files/records?fields=id,name,file");
    const files = await data.json();

    return { files: files.items };

}