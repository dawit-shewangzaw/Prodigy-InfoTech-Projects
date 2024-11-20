/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import axios from "axios";

const UnsplashImage = ({ apiKey, query }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: {
              query: query,
            },
            headers: {
              Authorization: `Client-ID ${apiKey}`,
            },
          }
        );

        setImageUrl(response.data.urls.regular);
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
      }
    };

    fetchImage();
  }, [apiKey, query]);

  return <div>{imageUrl && <img src={imageUrl} alt="Unsplash" />}</div>;
};

export default UnsplashImage;
