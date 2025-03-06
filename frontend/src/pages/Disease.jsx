import React, { useState } from "react";
import { Upload, Loader, AlertCircle, Check } from "lucide-react";

const Disease = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cropType, setCropType] = useState("Tomato");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
      setPrediction(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("crop", cropType);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-4">
        Crop Disease Detection
      </h1>
      <p className="text-gray-300 mb-6">
        Upload an image of a crop leaf to detect diseases.
      </p>

      <div className="w-full max-w-md  p-6 rounded-lg shadow-lg">
        <label className="block text-white mb-2">Select Crop Type:</label>
        <select
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          className="w-full p-2 rounded-lg border border-green-400 bg-black text-white mb-4"
        >
          <option value="Tomato">Tomato</option>
          <option value="Rice">Rice</option>
          <option value="Bell Pepper">Bell Pepper</option>
          <option value="Potato">Potato</option>
          <option value="Apple">Apple</option>
        </select>

        <div className="mb-4">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-400 border-dashed rounded-lg cursor-pointer hover:bg-white/5"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-contain rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <Upload className="w-12 h-12 text-green-400 mb-2" />
                <p className="text-sm text-gray-300">
                  Click to upload or drag & drop
                </p>
              </div>
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          {loading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            "Predict Disease"
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-500 text-white p-3 rounded-lg flex items-center">
          <AlertCircle className="mr-2" /> {error}
        </div>
      )}

      {prediction && (
        <div className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            Prediction Result
          </h2>
          <div className="p-4 border border-green-400 rounded-lg bg-gray-900">
            <p className="text-lg">
              <span className="font-semibold text-green-300">Disease:</span>{" "}
              {prediction.predicted_class}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-green-300">Confidence:</span>{" "}
              {prediction.confidence * 100}%
            </p>
            <p className="text-lg">
              <span className="font-semibold text-green-300">
                Disease Info:
              </span>{" "}
              {prediction.disease_info}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disease;
