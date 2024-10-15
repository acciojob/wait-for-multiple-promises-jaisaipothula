function createRandomPromise(promiseName) {
    return new Promise((resolve) => {
        const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
        setTimeout(() => {
            resolve({ name: promiseName, time: time.toFixed(3) });
        }, time * 1000);
    });
}

async function main() {
    const loadingRow = document.querySelector('#loading');
    
    // Create the three promises
    const promises = [
        createRandomPromise('Promise 1'),
        createRandomPromise('Promise 2'),
        createRandomPromise('Promise 3')
    ];

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    
    // Remove the loading text
    loadingRow.remove();

    // Calculate total time
    const totalTime = results.reduce((sum, result) => sum + parseFloat(result.time), 0).toFixed(3);

    // Populate the table with results
    const tbody = document.getElementById('output');
    results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
        tbody.appendChild(row);
    });

    // Add the total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
    tbody.appendChild(totalRow);
}

// Start the main function
main();
