module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    status: 'ok',
    supabase_project: process.env.SUPABASE_PROJECT_ID || 'qbhfwfyrffmrconfvmiz',
    timestamp: new Date().toISOString()
  });
};
