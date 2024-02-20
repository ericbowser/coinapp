const express = require('express');
const WebSocket = require('ws');
const https = require('https');

const app = express();

// Create a WebSocket server
const ws = new WebSocket.Server({ noServer: true });

// Function to handle WebSocket connection
ws.on('connection', function connection(ws) {
    console.log('WebSocket client connected');

    // Subscribe to Coinbase ticker feed
    const url = 'wss://ws-feed.pro.coinbase.com';
    const subscribeMsg = JSON.stringify({
        type: 'subscribe',
        product_ids: ['BTC-USD'], // Change this to subscribe to different product
        channels: ['ticker']
    });

    const connection = new WebSocket(url);

    connection.on('open', async function open() {
       await connection.send(subscribeMsg);
    });

    connection.on('message', async function incoming(data) {
        await ws.send(data);
    });

    connection.on('close', async function close() {
        console.log('WebSocket connection closed');
    });

    connection.on('error', async function error(err) {
        console.error('WebSocket error:', err);
    });

    ws.on('close', async function close() {
        console.log('WebSocket client disconnected');
        await connection.close();
    });
});


// Create an HTTP server
const server = https.createServer(app);

// Upgrade HTTP server to support WebSocket
server.on('upgrade', async function upgrade(request, socket, head) {
    await ws.handleUpgrade(request, socket, head, async function done(ws) {
        await ws.emit('connection', ws, request);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
