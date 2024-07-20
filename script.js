document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('resultTable');
  const loadingRow = table.rows[0]; // First row for loading text
  const promiseRows = [
    table.rows[1], // Promise 1 row
    table.rows[2], // Promise 2 row
    table.rows[3]  // Promise 3 row
  ];
  const totalRow = table.rows[4]; // Total row

  // Helper function to create a promise that resolves after a random time between 1 and 3 seconds
  const createRandomPromise = () => {
    const randomDelay = Math.floor(Math.random() * 2000) + 1000; // Random between 1000ms and 3000ms
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(randomDelay / 1000); // Resolve with seconds
      }, randomDelay);
    });
  };

  // Array of promises
  const promises = [
    createRandomPromise(),
    createRandomPromise(),
    createRandomPromise()
  ];

  // Update table after all promises resolve
  Promise.all(promises)
    .then(results => {
      // Remove loading text
      loadingRow.cells[0].textContent = '';

      // Update each promise row with resolved time
      results.forEach((time, index) => {
        promiseRows[index].cells[1].textContent = time.toFixed(3); // Display time with 3 decimal places
      });

      // Calculate total time
      const totalTime = results.reduce((acc, curr) => acc + curr, 0);
      totalRow.cells[1].textContent = totalTime.toFixed(3); // Display total time with 3 decimal places
    })
    .catch(error => {
      console.error('Error occurred:', error);
    });
});
