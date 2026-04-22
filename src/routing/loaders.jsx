export const getGamesHomepage = async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const response = await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page=${page}`);
    const json = await response.json();
    return json;
};


export const searchGames = async ({params})=>{
    const response = await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&search=${params.slug}`);
    const json = await response.json();
    return json.results;
}

export const allGenres = async ()=>{
    const response = await fetch(`https://api.rawg.io/api/genres?key=${import.meta.env.VITE_API_KEY}`);
    const json = await response.json();
    return json.results;
}

// export const searchByGenres = async ({params})=>{
//     const response = await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&genres=${params.slug}`);
//     const json = await response.json();
//     return json.results;
// }

export const searchByGenres = async ({ params, request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const response = await fetch(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&genres=${params.slug}&page=${page}`
    );
    
    const json = await response.json();
    return json; 
}

export const gameDetail = async({params})=>{
    const response = await fetch(`https://api.rawg.io/api/games/${params.id}?key=${import.meta.env.VITE_API_KEY}`);
    const game = await response.json();
    const screenshotsRes = await fetch(`https://api.rawg.io/api/games/${params.id}/screenshots?key=${import.meta.env.VITE_API_KEY}`);
    const screenshotsData = await screenshotsRes.json();
    return {game, screenshots: screenshotsData.results};
}