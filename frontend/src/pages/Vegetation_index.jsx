import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import html2canvas from "html2canvas";
import axios from "axios";

const VegetationIndex = () => {
  const mapRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ndviResult, setNdviResult] = useState(null);
  const [msaviResult, setMsaviResult] = useState(null);
  const [ndviStats, setNdviStats] = useState(null);
  const [msaviStats, setMsaviStats] = useState(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const map = L.map("map").setView([22.5753, 88.3142], 13);
    L.tileLayer(
      "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles © Esri — Source: Esri, DeLorme, NAVTEQ, USGS, and the GIS User Community",
        maxZoom: 23,
      }
    ).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItems },
      draw: {
        polygon: true,
        rectangle: true,
        circle: false,
        marker: false,
        polyline: false,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event) => {
      drawnItems.clearLayers();
      drawnItems.addLayer(event.layer);
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError(""); // Clear any previous errors
  };

  const captureMapArea = async () => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const canvas = await html2canvas(mapElement);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "selected-area.png", {
          type: "image/png",
        });
        setSelectedFile(file);
      }
    }, "image/png");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select or capture an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:0/upload", formData);

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      setNdviResult(response.data.ndvi_image);
      setMsaviResult(response.data.msavi_image);
      setNdviStats(response.data.ndvi_stats);
      setMsaviStats(response.data.msavi_stats);
      setNote(response.data.note);
      setError(""); // Clear errors if success
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to process image. Please try again.");
    }
  };

  return (
    <div className="main-container">
      <h1>NDVI Vegetation Health Calculator</h1>
      <div className="flex-box">
        <div className="map-container">
          <div id="map" style={{ height: "400px" }}></div>
          <button onClick={captureMapArea} className="button">
            Take Screenshot of Marked Area
          </button>
        </div>

        <div className="upload-section">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {note && <p style={{ color: "orange" }}>{note}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept=".tif,.tiff,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <button type="submit" className="button success">
              Calculate NDVI
            </button>
          </form>
        </div>
      </div>

      {ndviResult && msaviResult && (
        <div className="results-container">
          <h2>Vegetation Index Results</h2>
          <div className="comparison">
            <div className="index-section">
              <h2>NDVI Analysis</h2>
              <p>Mean NDVI: {ndviStats?.mean?.toFixed(3)}</p>
              <img
                src={`data:image/png;base64,${ndviResult}`}
                alt="NDVI Map"
                className="image-res"
              />
            </div>

            <div className="index-section">
              <h2>MSAVI Analysis</h2>
              <p>Mean MSAVI: {msaviStats?.mean?.toFixed(3)}</p>
              <img
                src={`data:image/png;base64,${msaviResult}`}
                alt="MSAVI Map"
                className="image-res"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VegetationIndex;
