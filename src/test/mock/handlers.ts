import { HttpResponse, http } from "msw";

// Mock Data
export const images = [
    {
        id: "3p2",
        url: "https://cdn2.thecatapi.com/images/3p2.gif",
        width: 380,
        height: 240,
    },
    {
        id: "4h8",
        url: "https://cdn2.thecatapi.com/images/4h8.gif",
        width: 400,
        height: 225,
    },
    {
        id: "8r0",
        url: "https://cdn2.thecatapi.com/images/8r0.jpg",
        width: 640,
        height: 480,
    },
    {
        id: "a8o",
        url: "https://cdn2.thecatapi.com/images/a8o.jpg",
        width: 960,
        height: 720,
    },
    {
        id: "b1a",
        url: "https://cdn2.thecatapi.com/images/b1a.jpg",
        width: 550,
        height: 439,
    },
    {
        id: "bqd",
        url: "https://cdn2.thecatapi.com/images/bqd.jpg",
        width: 680,
        height: 1024,
    },
    {
        id: "cml",
        url: "https://cdn2.thecatapi.com/images/cml.jpg",
        width: 4320,
        height: 3240,
    },
    {
        id: "d9m",
        url: "https://cdn2.thecatapi.com/images/d9m.jpg",
        width: 500,
        height: 333,
    },
    {
        id: "de6",
        url: "https://cdn2.thecatapi.com/images/de6.jpg",
        width: 3648,
        height: 2462,
    },
    {
        id: "MjAzNzYxOQ",
        url: "https://cdn2.thecatapi.com/images/MjAzNzYxOQ.jpg",
        width: 498,
        height: 565,
    },
];

function getRandomElements<T>(array: T[], n: number): T[] {
    const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, n);
}

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
    http.get("https://api.thecatapi.com/v1/images/search", ({ request }) => {
        const url = new URL(request.url);

        const limit = url.searchParams.get("limit") ?? "1";

        const _limit = parseInt(limit);
        return HttpResponse.json(getRandomElements(images, _limit), {
            status: 200,
        });
    }),
];
