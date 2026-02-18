const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`API en ligne sur le port ${PORT}`);
  console.log(`Health check disponible sur /health`);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
app.get('/', (req, res) => {
  res.send('Serveur Express en ligne !');
});

