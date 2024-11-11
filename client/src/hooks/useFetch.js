import { useEffect, useState } from "react";

const API_KEY = import.meta.VITE_GIPHY_API_KEY;

const useFetch = ({ keyword }) => {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const result = await response.json();
      setData(result.data[0]?.images?.downsized_medium.url);
    } catch (e) {
      setData(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  };
  useEffect(() => {
    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return data;
};

export default useFetch;
