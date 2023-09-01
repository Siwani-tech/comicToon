import "../dist/style.css";
import fetchComics from "./modules/comicApi";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("root");

  try {
    const data = await fetchComics();
    const comics = data.data.results; // Extract the list of comics
    comics.forEach((comic) => {
      const comicElement = document.createElement("div");
      comicElement.classList.add("comic");

      const titleElement = document.createElement("h2");
      titleElement.textContent = comic.title;
      comicElement.appendChild(titleElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent =
        comic.description || "No description available";
      comicElement.appendChild(descriptionElement);

      const thumbnailElement = document.createElement("img");
      thumbnailElement.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
      comicElement.appendChild(thumbnailElement);

      // Create a link to the detailed comic page
      const readLink = document.createElement("a");
      readLink.href = comic.urls.find((url) => url.type === "detail").url;
      readLink.textContent = "Read..";
      comicElement.appendChild(readLink);

      container.appendChild(comicElement);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
