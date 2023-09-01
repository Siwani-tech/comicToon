import md5 from "md5";
import { COMIC_PRIVATE_KEY, COMIC_PUBLIC_KEY } from "./apis";

const timestamp = Date.now();
const hash = md5(`${timestamp}${COMIC_PRIVATE_KEY}${COMIC_PUBLIC_KEY}`);

const apiUrl = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${COMIC_PUBLIC_KEY}&hash=${hash}`;

async function fetchComics() {
  try {
    const response = await fetch(apiUrl, { mode: "cors" });
    const data = await response.json();
    console.log(data);
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be caught in the calling code
  }
}

export default fetchComics;
