import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Make Buffer available globally
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Client, handle_file } from "@gradio/client";
import Loading from './Loading';
// Import Gradio client and handle_file

ChartJS.register(ArcElement, Tooltip, Legend);

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [chartData, setChartData] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const initApp = async () => {
      const gradioApp = await Client.connect("Daniela-C/ai_vs_real_image_detection"); // Connect to Gradio app
      setApp(gradioApp); // Set the app in state
    };
    initApp(); // Initialize the Gradio client when the component mounts
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult('');
    }
  };

  const handleUpload = async () => {
    setResult(false)
    if (image && app) {
      setDialogOpen(true); // Open dialog immediately
      setLoading(true); // Start loading

      // Convert the image file to a Blob
      const imageBlob = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(new Blob([reader.result], { type: image.type })); // Create Blob with the correct MIME type
        };
        reader.readAsArrayBuffer(image);
      });

      // Use the Gradio client to make a prediction
      const predictionResult = await app.predict("/predict", [handle_file(imageBlob)]);

      // Extracting the label and confidence values from the result
      const { label, confidences } = predictionResult.data[0];

      // Prepare chart data
      const totalConfidence = confidences[0].confidence + confidences[1].confidence;

      const data = {
        labels: ['FAKE', 'REAL'],
        datasets: [
          {
            data: [
              (confidences[0].confidence / totalConfidence) * 100, // Percentage for FAKE
              (confidences[1].confidence / totalConfidence) * 100, // Percentage for REAL
            ],
            backgroundColor: ['#FF6384', '#36A2E1'],
            hoverBackgroundColor: ['#FF6381', '#36A2E1'],
            hoverOffset: 4
          },
        ],
      };

      setResult(label); // Update result state with the label (FAKE or REAL)
      setChartData(data); // Set chart data
      setLoading(false); // Stop loading
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult('');
    }
    setDragActive(false);
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult('');
    setDialogOpen(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl md:h-[30rem] h-screen mt-24 shadow-lg rounded-lg md:border md:border-gray-700">
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 md:border-r-2 relative overflow-hidden border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-5 text-gray-300">Upload Image</h2>

          <motion.div
            className={`drop-zone w-full h-80 flex flex-col items-center justify-center border-4 ${
              dragActive ? 'border-blue-500 bg-blue-900' : 'border-gray-600 bg-gray-800'
            } border-dashed rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-500 mb-3">Drag & Drop your image here</p>
            <p className="text-gray-500 mb-3">or</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-5 w-full absolute opacity-0 cursor-pointer h-full"
            />
            <p className="text-indigo-600 underline cursor-pointer">Browse files</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 relative shadow-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-5 text-gray-300">Preview</h2>
          {preview && (
            <motion.img
              src={preview}
              alt="Preview"
              className="mb-5 w-[90%] md:w-[28rem] overflow-hidden object-contain transition-transform duration-500 ease-in-out transform hover:scale-110 rounded-md shadow-none"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
          {image && (
            <button
              onClick={handleUpload}
              className="cssbuttons-io-button"
            >
             <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path></svg>
             <span>Upload</span>
            </button>
          )}
        </motion.div>
      </div>

      {dialogOpen && (
        <div
          data-dialog-backdrop="animated-dialog"
          data-dialog-backdrop-close="true"
          className="pointer-events-auto fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300"
        >
          <div
            data-dialog="animated-dialog"
            data-dialog-mount="opacity-100 translate-y-0 scale-100"
            data-dialog-unmount="opacity-0 -translate-y-28 scale-90 pointer-events-none"
            data-dialog-transition="transition-all duration-300"
            className="relative m-4 p-9 w-2/5 md:w-2/5 min-w-[320px] max-w-[90%] min-h-[50%] rounded-lg bg-gray-900 shadow-sm"
          >
            <div>
              <button 
                onClick={handleReset} 
                className="absolute top-4 text-white rounded transition font-extrabold"
              >
                &#10094;
              </button>
              <button 
                onClick={() => setDialogOpen(false)} 
                className="absolute top-4 right-4 text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="flex shrink-0 justify-center items-center pb-4 text-xl font-medium text-white border-b mb-10">
              Result : {result}
            </div>
            <div className="relative border-slate-200 leading-normal bg-red-00 h-[400px] py-2">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loading/>
                </div>
              ) : (
                <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
