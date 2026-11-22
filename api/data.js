const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  const dataPath = path.join(process.cwd(), 'real-data.json');
  if (fs.existsSync(dataPath)) {
    const stream = fs.createReadStream(dataPath);
    return stream.pipe(res);
  }
  
  res.status(404).json({ error: 'Real data snapshot not found' });
};
