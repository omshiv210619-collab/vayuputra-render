const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => res.send('Vayuputra 24x7 ONLINE'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Vayuputra running on port ${PORT}`);
});
