// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(promiseName) {
    const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: promiseName, time: time.toFixed(3) });
        }, time * 1000);
    });
}

async function loadPromises() {
    // Get the table body element
    const tableBody = document.getElementById('promiseTableBody');

    // Show loading text
    tableBody.innerHTML = '<tr><td colspan="2">Loading...</td></tr>';

    // Create three promises
    const promise1 = createRandomPromise('Promise 1');
    const promise2 = createRandomPromise('Promise 2');
    const promise3 = createRandomPromise('Promise 3');

    // Wait for all promises to resolve
    const results = await Promise.all([promise1, promise2, promise3]);

    // Clear loading text
    tableBody.innerHTML = '';

    // Populate the table with results
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
        tableBody.appendChild(row);
    });

    // Calculate total time taken
    const totalTime = results.reduce((acc, curr) => acc + parseFloat(curr.time), 0).toFixed(3);

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
    tableBody.appendChild(totalRow);
}

// Load promises when the script runs
loadPromises();