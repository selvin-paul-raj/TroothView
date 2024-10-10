import { useState } from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult('');
    }
  };

  const handleUpload = () => {
    // Placeholder logic for checking if the image is AI-generated.
    const isAiGenerated = Math.random() > 0.5 ? 'AI Generated' : 'Not AI Generated';
    setResult(isAiGenerated);
    setDialogOpen(true);
  };

  // Drag and Drop Handlers
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

  const data = {
    labels: ['AI', 'Human'],
    datasets: [
      {
        data: [result === 'AI Generated' ? 1 : 0, result === 'Not AI Generated' ? 1 : 0],
        backgroundColor: ['#FF6384', '#36A2E1'],
        hoverBackgroundColor: ['#FF6381', '#36A2E1'],
        borderColor: ['white', 'white'],
      },
    ],
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-900 p-4">
      {/* Upload and Preview Section */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl md:h-[30rem] h-screen mt-24 shadow-lg rounded-lg md:border md:border-gray-700">
        
        {/* Left side for Image Upload */}
        
            <motion.div
              className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 md:border-r-2 relative overflow-hidden border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-5 text-gray-300">Upload Image</h2>

              {/* Drag and Drop Zone */}
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
            <hr className="border border-black" />
      
        
        {/* Right side for Image Preview */}
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
              className="px-4 py-2 bg-black text-white rounded transition-all duration-300 ease-in-out hover:bg-black/50"
            >
              Upload
            </button>
          )}
        </motion.div>
      </div>

      {/* Dialog for Result */}
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
                className="absolute top-4  text-white rounded transition font-extrabold"
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
              Result
            </div>
            <div className="relative border-slate-200 leading-normal bg-red-00 h-[400px] py-2">
              <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
