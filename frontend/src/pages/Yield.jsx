import React, { useState } from "react";

const YieldPrediction = () => {
  const [formData, setFormData] = useState({
    crop_type: "",
    area: "",
    seeds: "",
    ph: "",
    water: "",
    investment: "",
    flood_impact: "",
    disease_impact: "",
    temperature: "",
    other_damage: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid input parameters or server error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-6">
        Yield Prediction
      </h1>
      <form
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        {[
          { label: "Crop Type", name: "crop_type", type: "text" },
          { label: "Area (bigha)", name: "area", type: "number" },
          { label: "Seeds Shown", name: "seeds", type: "number" },
          { label: "PH Level", name: "ph", type: "number", step: "0.1" },
          { label: "Water (ml)", name: "water", type: "number" },
          { label: "Investment", name: "investment", type: "number" },
          { label: "Flood Impact (%)", name: "flood_impact", type: "number" },
          {
            label: "Disease Impact (%)",
            name: "disease_impact",
            type: "number",
          },
          { label: "Temperature (°C)", name: "temperature", type: "number" },
          { label: "Other Damage (%)", name: "other_damage", type: "number" },
        ].map(({ label, name, type, step }) => (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium">{label}</label>
            <input
              type={type}
              name={name}
              step={step}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 bg-gray-700 text-white"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
        >
          Predict Yield
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold text-green-400">
            Prediction Result
          </h2>
          <p>Predicted Yield: {result.predicted}</p>
          <p>Net Produced: {result.net_produced}</p>
          <p>Net Wastage: {result.net_wastage}</p>
        </div>
      )}
    </div>
  );
};

export default YieldPrediction;
