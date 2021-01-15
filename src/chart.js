import Chart from 'chart.js';

const constValues = {
  CANVAS_WIDTH: 500,
  CANVAS_HEIGHT: 300,
  PERCENTAGE_TO_KEEP: 0.05
};

function initChartJs(wordsCount) {
  createCanvas();
  const ctx = document.getElementById('myChart');
  const data = getData(wordsCount);
  const options = getOptions();

  new Chart(ctx, {
    type: 'pie',
    data,
    options
  });
}

function createCanvas() {
  clearPreviousChart();
  const target = document.querySelector('.results-area');
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'myChart');
  canvas.setAttribute('width', constValues['CANVAS_WIDTH']);
  canvas.setAttribute('height', constValues['CANVAS_HEIGHT']);
  target.insertAdjacentElement('afterbegin', canvas);
}

function clearPreviousChart() {
  const chart = document.getElementById('myChart');
  chart.parentNode.removeChild(chart);
}

function getData(data) {
  const filteredData = filterData(data);
  const colors = generateColors(filteredData.length);
  return {
    datasets: [{
      label: 'Repartition of words occurence: ',
      data: filteredData.map(el => el[1]),
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderWidth: 1
    }],
    labels: filteredData.map(el => el[0]),
  }
}

function filterData(data) {
  if (data.length > 30) {
    const mostUsedWordLimit = Math.ceil(constValues['PERCENTAGE_TO_KEEP'] * data.length);
    const filteredData = data.slice(0, mostUsedWordLimit);
    filteredData.push([
      'Rest of words',
      calcLessUsedWordsCount(filteredData, data.length),
      calcLessUsedWordsPercentage(filteredData)
    ]);
    return filteredData;
  }
  return data;
}

function calcLessUsedWordsCount(filteredData, totalWordCount) {
  const mostUsedWordCount = filteredData.reduce((acc, cur) => {
    return acc + cur[1];
  }, 0);
  return totalWordCount - mostUsedWordCount;
}

function calcLessUsedWordsPercentage(filteredData) {
  const mostUsedWordsPercentage = filteredData.reduce((acc, cur) => {
    return acc + +cur[2];
  }, 0);
  return 100 - mostUsedWordsPercentage;
}

function generateColors(numOfColorToGenerate) {
  const colors = { background: [], border: [] };
  for (let i = 0; i < numOfColorToGenerate; i++) {
    const randomRGB = [];
    for (let j = 0; j < 3; j++) {
      randomRGB.push(Math.floor(Math.random() * 256));
    }
    colors.background.push((`rgba(${randomRGB.join(',')}, 0.2)`));
    colors.border.push(`rgba(${randomRGB.join(',')}, 1)`);
  }
  return colors;
}

function getOptions() {

}

export { initChartJs };