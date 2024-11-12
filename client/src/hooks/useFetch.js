import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_GIPHY_API_KEY;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    const key = keyword.split(" ").join("");
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${key}&limit=1`
      );
      const { data } = await response.json();
      if (data.length) {
        setGifUrl(data[0]?.images?.downsized_medium.url);
      } else {
        setGifUrl(
          "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
        );
      }
    } catch (error) {
      setGifUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  };

  useEffect(() => {
    if (keyword) {
      console.log("In use fetch keyword: " + keyword);
      fetchGifs();
    }
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
