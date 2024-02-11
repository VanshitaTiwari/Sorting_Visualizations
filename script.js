let array = [];
let barWidth = 20; 
let paused = false;

function generateArray() {
  array = [];
  for (let i = 0; i < 50; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
}

function renderArray() {
  const barsContainer = document.getElementById('barsContainer');
  barsContainer.innerHTML = '';
  array.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 4}px`; 
    bar.style.width = `${barWidth}px`; 
    const valueLabel = document.createElement('div');
    valueLabel.classList.add('value');
    valueLabel.textContent = value;
    bar.appendChild(valueLabel);
    barsContainer.appendChild(bar);
  });
}

function randomizeArray() {
  generateArray();
  renderArray();
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mergeSort() {
  await mergeSortHelper(array, 0, array.length - 1);
  renderArray();
}

async function mergeSortHelper(arr, left, right) {
  if (left >= right || paused) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSortHelper(arr, left, mid);
  await mergeSortHelper(arr, mid + 1, right);
  await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
  const leftArray = arr.slice(left, mid + 1);
  const rightArray = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while (i < leftArray.length && j < rightArray.length && !paused) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k++] = leftArray[i++];
    } else {
      arr[k++] = rightArray[j++];
    }
    renderArray();
    await delay(50);
  }
  while (i < leftArray.length && !paused) {
    arr[k++] = leftArray[i++];
    renderArray();
    await delay(50);
  }
  while (j < rightArray.length && !paused) {
    arr[k++] = rightArray[j++];
    renderArray();
    await delay(50);
  }
}

async function bubbleSort() {
  const len = array.length;
  for (let i = 0; i < len && !paused; i++) {
    for (let j = 0; j < len - i - 1 && !paused; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        renderArray();
        await delay(50);
      }
    }
  }
}

async function insertionSort() {
  const len = array.length;
  for (let i = 1; i < len && !paused; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current && !paused) {
      array[j + 1] = array[j];
      j--;
      renderArray();
      await delay(50);
    }
    array[j + 1] = current;
    renderArray();
    await delay(50);
  }
}

async function selectionSort() {
  const len = array.length;
  for (let i = 0; i < len - 1 && !paused; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len && !paused; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      renderArray();
      await delay(50);
    }
  }
}

async function shellSort() {
  const len = array.length;
  let gap = Math.floor(len / 2);
  while (gap > 0 && !paused) {
    for (let i = gap; i < len && !paused; i++) {
      let temp = array[i];
      let j = i;
      while (j >= gap && array[j - gap] > temp && !paused) {
        array[j] = array[j - gap];
        j -= gap;
        renderArray();
        await delay(50);
      }
      array[j] = temp;
      renderArray();
      await delay(50);
    }
    gap = Math.floor(gap / 2);
  }
}

function reduceSize() {
  barWidth -= 2; // Reduce the bar width
  if (barWidth < 5) barWidth = 5; // Minimum width
  renderArray();
}

function togglePause() {
  paused = !paused; // Toggle the paused flag
}

// Initial render
randomizeArray();
