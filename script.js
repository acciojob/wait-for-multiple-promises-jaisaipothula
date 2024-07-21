document.addEventListener('DOMContentLoaded', () => {
  const resultTable = document.getElementById('result-table');
  const loadingRow = document.getElementById('loading-row');

  // Function to generate a random delay between 1 and 3 seconds
  function getRandomDelay() {
    return Math.floor(Math.random() * 3000) + 1000; // Random number between 1000 and 3000 milliseconds
  }

  // Create an array of 3 promises with random delays
  const promises = [
    new Promise(resolve => {
      setTimeout(() => resolve(getRandomDelay()), getRandomDelay());
    }),
    new Promise(resolve => {
      setTimeout(() => resolve(getRandomDelay()), getRandomDelay());
    }),
    new Promise(resolve => {
      setTimeout(() => resolve(getRandomDelay()), getRandomDelay());
    })
  ];

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises)
    .then(times => {
      // Remove loading row
      loadingRow.parentNode.removeChild(loadingRow);

      // Populate the table with the resolved times
      times.forEach((time, index) => {
        const row = resultTable.insertRow(-1); // Append row to end of table
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = `Promise ${index + 1}`;
        cell2.textContent = (time / 1000).toFixed(3); // Convert milliseconds to seconds with 3 decimal places
      });

      // Calculate total time and add it as the last row
      const totalRow = resultTable.insertRow(-1);
      const totalCell1 = totalRow.insertCell(0);
      const totalCell2 = totalRow.insertCell(1);
      totalCell1.textContent = 'Total';
      const totalTime = times.reduce((acc, curr) => acc + curr, 0) / 1000; // Total time in seconds
      totalCell2.textContent = totalTime.toFixed(3); // Display total time with 3 decimal places
    })
    .catch(error => {
      console.error('Error in promises:', error);
      // Handle errors if needed
    });
});
