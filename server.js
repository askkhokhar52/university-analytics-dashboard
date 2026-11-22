const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// ============================================================
// Load .env / .env.local file automatically
// ============================================================
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim();
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
      console.log(`Loaded environment from ${file}`);
    }
  }
}

loadEnv();

const SUPABASE_PROJECT_ID = process.env.SUPABASE_PROJECT_ID || 'qbhfwfyrffmrconfvmiz';
const SUPABASE_HOST = `${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaGZ3ZnlyZmZtcmNvbmZ2bWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMjM0MTEsImV4cCI6MjExMDY5OTQxMX0.PwF1q2HkmckNtFen-COvuFmljxUMvo1muIAboICRkC8';
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaGZ3ZnlyZmZtcmNvbmZ2bWl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NTEyMzQxMSwiZXhwIjoyMTEwNjk5NDExfQ.5AFGiPC6Kp3siOtC2erpO0ysxZCI2l7V5SezhAfQ0lE';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const host = req.headers.host || 'localhost';
  const reqUrl = new URL(req.url, `http://${host}`);
  const pathname = reqUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, apikey, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Healthcheck endpoint
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      supabase_project: SUPABASE_PROJECT_ID,
      supabase_host: SUPABASE_HOST,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Public Supabase Config
  if (pathname === '/api/config') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      project_id: SUPABASE_PROJECT_ID,
      supabase_url: `https://${SUPABASE_HOST}`,
      anon_key: SUPABASE_ANON_KEY
    }));
    return;
  }

  // Real-time aggregate data endpoint
  if (pathname === '/api/data') {
    const dataPath = path.join(__dirname, 'real-data.json');
    if (fs.existsSync(dataPath)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      fs.createReadStream(dataPath).pipe(res);
      return;
    }
  }

  // Proxy endpoint to Supabase REST API
  if (pathname.startsWith('/api/supabase/')) {
    const supabasePath = pathname.replace('/api/supabase', '/rest/v1') + (reqUrl.search || '');
    const clientReq = https.request({
      hostname: SUPABASE_HOST,
      path: supabasePath,
      method: req.method,
      headers: {
        'apikey': req.headers['apikey'] || SUPABASE_ANON_KEY,
        'Authorization': req.headers['authorization'] || `Bearer ${SUPABASE_ANON_KEY}`,
        'Accept': 'application/json'
      }
    }, clientRes => {
      res.writeHead(clientRes.statusCode, clientRes.headers);
      clientRes.pipe(res);
    });

    clientReq.on('error', err => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Supabase proxy error', message: err.message }));
    });

    req.pipe(clientReq);
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

const DEFAULT_PORT = process.env.PORT || 3000;

function startServer(port) {
  server.listen(port, () => {
    console.log(`\n=======================================================`);
    console.log(`🎓 University Analytics Dashboard`);
    console.log(`=======================================================`);
    console.log(`🌐 Local Server Running at: http://localhost:${port}`);
    console.log(`⚡ Connected Supabase:      https://${SUPABASE_HOST}`);
    console.log(`📦 Loaded .env Config:      Project ID ${SUPABASE_PROJECT_ID}`);
    console.log(`=======================================================\n`);
  }).on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(DEFAULT_PORT);
