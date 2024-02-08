let url = 'https://jwilson9567.pythonanywhere.com/calc_top_paths';
let data = {
    'start_node': '5',
    'start_distance': 3,
    'data_type': 'CWE'
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
    console.log("Top Paths:", data.top_paths);
})
.catch((error) => {
    console.error('Error:', error);
});




