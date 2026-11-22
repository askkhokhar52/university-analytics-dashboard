module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const projectId = process.env.SUPABASE_PROJECT_ID || 'qbhfwfyrffmrconfvmiz';
  res.status(200).json({
    project_id: projectId,
    supabase_url: `https://${projectId}.supabase.co`,
    anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaGZ3ZnlyZmZtcmNvbmZ2bWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMjM0MTEsImV4cCI6MjExMDY5OTQxMX0.PwF1q2HkmckNtFen-COvuFmljxUMvo1muIAboICRkC8'
  });
};
