import { useState } from "react";

const Recommendation = () => {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rainfallMessage, setRainfallMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get user's coordinates
  const getCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          });
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Predict rainfall based on coordinates
  const predictRainfall = async () => {
    const { latitude, longitude } = formData;

    if (!latitude || !longitude) {
      setRainfallMessage("Please press `Collect Coordinates` first.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain&daily=precipitation_sum`
      );
      const data = await response.json();

      if (!data.daily || !data.daily.precipitation_sum) {
        throw new Error("No rainfall data available for this location.");
      }

      const dailyRain = data.daily.precipitation_sum[0] || 0;
      const seasonalEstimate = dailyRain * 30;

      setFormData({ ...formData, rainfall: seasonalEstimate.toFixed(2) });
      setRainfallMessage(
        `Predicted Rainfall: ${seasonalEstimate.toFixed(
          2
        )} mm (Approximate value)`
      );
    } catch (error) {
      setRainfallMessage(`Error: ${error.message}`);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:3000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPrediction(`Recommended Crop: ${data.prediction}`);
        setImage(`http://127.0.0.1:3000/${data.image}`);
      }
    } catch (err) {
      setError("Failed to fetch recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-6 text-center md:text-middle">
            Crop Recommendation System
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Grid Layout for Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["N", "P", "K", "temperature", "humidity", "ph"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-lg">{field.toUpperCase()}</label>
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 mt-1 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              ))}
            </div>

            {/* Rainfall Input in Center */}
            <div className="flex flex-col items-center">
              <label className="text-lg">RAINFALL</label>
              <input
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                required
                className="w-full sm:w-2/3 px-4 py-2 mt-1 bg-transparent border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-all"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Get Recommendation"}
            </button>
          </form>

          {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
        </div>

        {/* Right Side - Buttons and Output Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center space-y-4">
          {/* Prediction Text */}
          {prediction && (
            <h2 id="prediction-text" className="text-xl font-semibold">
              {prediction}
            </h2>
          )}

          {/* Crop Image Display */}
          {image && (
            <img
              id="crop-image"
              src={image}
              alt="Recommended Crop"
              className="mt-4 w-40 h-40 object-cover mx-auto rounded-lg shadow-lg"
            />
          )}

          {/* Collect Coordinates Button */}
          <button
            className="w-2/3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
            onClick={getCoordinates}
          >
            Collect Coordinates
          </button>

          {/* Predict Rainfall Button */}
          <button
            className="w-2/3 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition-all"
            onClick={predictRainfall}
          >
            Predict Rainfall
          </button>

          {/* Rainfall Prediction Output */}
          {rainfallMessage && (
            <p className="mt-2 text-lg font-semibold">{rainfallMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
