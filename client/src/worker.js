// worker.js
import { pipeline } from '@xenova/transformers';

class MyImageClassificationPipeline {
  static task = 'image-classification';
  static model = 'dima806/ai_vs_real_image_detection';
  static instance = null;

  // Singleton pattern to ensure the model is only loaded once
  static async getInstance() {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model);
    }
    return this.instance;
  }
}

// Worker message handler
onmessage = async (event) => {
  const { imageData } = event.data;

  // Get pipeline instance (loads model if necessary)
  const model = await MyImageClassificationPipeline.getInstance();

  // Perform the image classification
  const result = await model(imageData);

  // Return the result back to the main thread
  postMessage(result[0].label);  // AI generated or not
  console.log(result);
  console.log(result[0].label);
  
  
};
