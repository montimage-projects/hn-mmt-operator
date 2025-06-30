const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const factorizationMaps = JSON.parse(fs.readFileSync('./data/model_keras2_tfjs/factorization_maps.json', 'utf8'));
const processInput = (input) => {
  const numericalKeys = ['3', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  const categoricalKeys = ['40', '41', 'ip_src', 'ip_dst'];

  // Process numerical features
  const processedNumerical = numericalKeys.map(key => {
    const value = input[key];
    return typeof value === 'number' ? value : 0;
  });

  // Process categorical features
  const processedCategorical = categoricalKeys.map(key => {
    const value = input[key];
    return factorizationMaps[key][value] || -1; // Use -1 for unknown categories
  });

  return [...processedNumerical, ...processedCategorical];
}

const prediction = async (input) => {
  const processedInput = processInput(input);
  const model = await tf.loadLayersModel('file://data/model_keras2_tfjs/model.json');
  const tensorInput = tf.tensor2d([processedInput], [1, 15], 'float32');
  const prediction = model.predict(tensorInput);
  const result = prediction.dataSync();
  return result[0];
};

module.exports = prediction;


