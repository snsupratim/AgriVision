import React, { useState } from "react";
import { Upload, AlertCircle, Check } from "lucide-react";

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
    formData.append("image", selectedFile);
    formData.append("crop_type", cropType);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-400 mb-6">
            Crop Disease Detection
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Upload an image of your crop leaves to detect diseases and get
            detailed remedies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <div className="mb-4">
              <label className="block text-white mb-2">Select Crop Type:</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full p-2 rounded-lg border border-green-400 bg-black text-white"
              >
                <option value="Tomato">Tomato</option>
                <option value="Pepper Bell">Pepper Bell</option>
              </select>
            </div>

            <div className="mb-8">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-400 border-dashed rounded-lg cursor-pointer hover:bg-white/5"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-green-400 mb-4" />
                    <p className="text-sm text-green-400">
                      Click to upload or drag and drop
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !selectedFile}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Analyzing..." : "Detect Disease"}
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            {error && (
              <div className="flex items-center text-red-400 mb-4">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {prediction && (
              <div className="space-y-6">
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-400 mr-2" />
                  <h3 className="text-xl font-semibold text-green-400">
                    Detection Results
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-white text-lg">
                    Detected Disease: {prediction.prediction}
                  </p>
                  <p className="text-white text-lg">
                    Confidence: {(prediction.confidence * 100).toFixed(2)}%
                  </p>
                  <h3 className="text-green-400 text-lg font-semibold">
                    Disease Details
                  </h3>
                  <p className="text-white text-lg">
                    {prediction.disease_info}
                  </p>
                </div>
              </div>
            )}
            {!error && !prediction && (
              <div className="text-center text-gray-300">
                Upload an image to see the detection results
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disease;
