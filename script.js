document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody');
    
    // Create a loading row
    const loadingRow = document.createElement('tr');
    loadingRow.id = 'loading-row';
    const loadingCell = document.createElement('td');
    loadingCell.colSpan = 2;
    loadingCell.textContent = 'Loading...';
    loadingRow.appendChild(loadingCell);
    tableBody.appendChild(loadingRow);

    // Function to create a promise that resolves after a random time between 1 and 3 seconds
    function createRandomPromise(promiseName) {
        const time = Math.floor(Math.random() * 3) + 1; // Random time between 1 and 3 seconds
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(time);
            }, time * 1000);
        });
    }

    // Create 3 promises
    const promise1 = createRandomPromise('Promise 1');
    const promise2 = createRandomPromise('Promise 2');
    const promise3 = createRandomPromise('Promise 3');

    // Update the table when all promises resolve
    Promise.all([promise1, promise2, promise3])
        .then(results => {
            // Remove the loading row
            const loadingRow = document.getElementById('loading-row');
            if (loadingRow) {
                tableBody.removeChild(loadingRow);
            }

            // Create rows for each promise
            results.forEach((result, index) => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const timeCell = document.createElement('td');

                nameCell.textContent = `Promise ${index + 1}`;
                timeCell.textContent = result.toFixed(3); // Formatting to 3 decimal places

                row.appendChild(nameCell);
                row.appendChild(timeCell);
                tableBody.appendChild(row);
            });

            // Create row for total time
            const totalTime = results.reduce((acc, time) => acc + time, 0);
            const totalRow = document.createElement('tr');
            const totalNameCell = document.createElement('td');
            const totalTimeCell = document.createElement('td');

            totalNameCell.textContent = 'Total';
            totalTimeCell.textContent = totalTime.toFixed(3); // Formatting to 3 decimal places

            totalRow.appendChild(totalNameCell);
            totalRow.appendChild(totalTimeCell);
            tableBody.appendChild(totalRow);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
