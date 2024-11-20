import { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./component/WeatherInfo";

const App = () => {
  const unsplashApiKey = "IDnu3i8yDUSiH70Fj7qtIxAkp7yEOL4XeO7IjWfRBuI";
  const openWeatherApiKey = "a8d503e79f791912910dc535060e0137"; 

  const [searchQuery, setSearchQuery] = useState("");
  const [country, setCountry] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); 
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
 const fetchImage = async () => {
  try {
    const modifiedSearchQuery = searchQuery + " buildings";

    const response = await axios.get(
      "https://api.unsplash.com/photos/random",
      {
        params: {
          query: modifiedSearchQuery,
        },
        headers: {
          Authorization: `Client-ID ${unsplashApiKey}`,
        },
      }
    );

    setImageUrl(response.data.urls.regular);
    setFadeIn(true);
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
  }
};


    if (isSearchClicked) {
      fetchImage();
    }
  }, [unsplashApiKey, searchQuery,isSearchClicked]);

  return (
    <div
      className="App h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div
        className={`flex flex-col items-center justify-center h-full bg-opacity-70 bg-white p-8 ${
          fadeIn ? "animate-fade-in" : ""
        }`}
      >
        <h1 className="text-4xl font-bold mb-4">Weather Info</h1>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter a country or city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-lg"
          />
          <button
            onClick={() => {
              setCountry(searchQuery);
              setIsSearchClicked(true);
            }}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {country && (
          <div className={`mt-4 ${fadeIn ? "animate-fade-in" : ""}`}>
            <WeatherInfo apiKey={openWeatherApiKey} query={country} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
