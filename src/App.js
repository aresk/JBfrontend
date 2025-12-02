import React, { useState, useEffect } from "react";
import "./AppV2.css"; //CSS

//Error messages
const statusMessages = {
  400: "Bad request. Please check your input.",
  401: "Unauthorized access.",
  403: "Forbidden.",
  404: "City or country not found.",
  429: "Rate limit exceeded. Please try again later.",
  500: "Server error.",
  503: "Service is temporarily unavailable.",
  408: "Request timed out.",
  405: "Method not allowed.",
};

const USAGE_LIMIT = 5; // backend driven quota

const getErrorMessage = (statusCode, body) => {
  return statusMessages[statusCode] || `Unexpected error: ${statusCode} - ${body.error || "Unknown error"}`;
};

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  //5 second disappearing error message
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  
  
 const [apiKeyUsage, setApiKeyUsage] = useState({
    JBHIFI_A: 0,
    JBHIFI_B: 0,
    JBHIFI_C: 0,
    JBHIFI_D: 0,
    JBHIFI_E: 0,
	UNAUTH: 0
  });

  /*const [apiKeyUsage, setApiKeyUsage] = useState({
    JBHIFI_A: 0//,
	//UNAUTH: 0
  });*/
  const apiKeys = ["JBHIFI_A", "JBHIFI_B", "JBHIFI_C", "JBHIFI_D", "JBHIFI_E", "UNAUTH"];
	//const apiKeys = ["JBHIFI_A","UNAUTH"];
	//const apiKeys = ["JBHIFI_A"];
	  const getRandomApiKey = () => {
		const randomIndex = Math.floor(Math.random() * apiKeys.length);
		return apiKeys[randomIndex];
	  };
  
	const updateApiKeyUsage = (key) => {
	  setApiKeyUsage(prevState => {
		const updated = { ...prevState };
		updated[key] = (updated[key] || 0) + 1;
		return updated;
	  });
	};

  const getWeather = async () => {
    setError(null);
    setResult(null);
	
  if (!city.trim() && !country.trim()) {
    setError("Please enter a city or country before checking weather.");
    return;
  }
  setLoading(true); 

	const apiKey = getRandomApiKey();
    updateApiKeyUsage(apiKey);


    try {
      const response = await fetch(
        `/Weather?city=${city}&country=${country}`,
        { headers: { "X-Api-Key": apiKey } }
      );
      
	  
      let body = {};
      try {
        body = await response.json(); 
      } catch {
        body = {};
      }

		//console.log("Res Status:", response.status);
		//console.log("Res Body:", body);  

      if (!response.ok) {
        const errorMessage = getErrorMessage(response.status, body);
        setResult(null);
        setError(errorMessage);
		setLoading(false);

        return;
      }

      setResult(body); 

    } catch (err) {
      setResult(null);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false); 
    }

  };


  useEffect(() => {
    for (const [key, count] of Object.entries(apiKeyUsage)) {
      if (count >= USAGE_LIMIT) {
        console.log(`${key} has reached the usage limit.`);
        
      }
    }
  }, [apiKeyUsage]);

 return (
    <div className="app-container">
      {/*Error message moved to the top */}
      {error && ( <div className="error-message">{error}</div>)}
	  
      {/*Loading donut*/}
		{loading && (
		  <div className="loading-spinner">
			<div className="donut"></div>
			<span>Loading weather...</span>
		  </div>
		)}


      <h2>Weather Forecast</h2>
		<div className="input-group">
		  <label htmlFor="city">City</label>
		  <input
			id="city"
			className="input-field"
			value={city}
			onChange={(e) => setCity(e.target.value)}
			placeholder="e.g. Melbourne"
		  />

		  <label htmlFor="country">Country</label>
		  <input
			id="country"
			className="input-field"
			value={country}
			onChange={(e) => setCountry(e.target.value)}
			placeholder="e.g. Australia"
		  />
		</div>
      <button className="button" onClick={getWeather}>
        Check Weather
      </button>
	
	{/* include city and country to display result */}
	{result && (
	  <div className="weather-result">
	
		<p>
		  The weather in {city}, {country} is: {result.description}
		</p>
	  </div>
	)}


      <div className="api-key-usage">
        <h4>API Key Usage:</h4>
        {Object.entries(apiKeyUsage).map(([key, count]) => (
          <div key={key}>
            {key}: {count}
            {count >= USAGE_LIMIT && (
              <span className="api-key-limit-reached">(Limit reached)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
