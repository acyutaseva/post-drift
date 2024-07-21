const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000/graphql');

ws.on('open', function open() {
  ws.send(
    JSON.stringify({
      type: 'connection_init',
      payload: {},
    }),
  );
  ws.send(
    JSON.stringify({
      id: '1',
      type: 'start',
      payload: {
        query: `
        subscription {
          postPositionChanged {
            id
            position
          }
        }
      `,
      },
    }),
  );
  console.log('Connected to WebSocket');
});

ws.on('message', function incoming(data) {
  console.log('Received message:', data);
});

ws.on('close', function close() {
  console.log('Disconnected from WebSocket');
});

ws.on('error', function error(error) {
  console.log('WebSocket error:', error);
});
