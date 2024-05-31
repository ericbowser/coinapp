
const get = async (url) => {
    const options = {
        method: 'POST',
        headers: {
            'X-API-KEY': 'c871ef44be2647b88441255cbc8b3c7f'
        },
     /*   body: JSON.stringify({
            list_address: 'So11111111111111111111111111111111111111112,mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'
        })*/
    };
    const response = await fetch(url, options);
    return response.json();
}

module.exports = get;
