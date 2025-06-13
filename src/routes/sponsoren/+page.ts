import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const data = await fetch(PUBLIC_POCKETBASE_URL + "/api/collections/sponsors/records?fields=id,name,logo,link,main_sponsor");
    const sponsors = await data.json();

    console.log(sponsors);

    return { sponsors: sponsors.items };

}