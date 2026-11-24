import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apex University Analytics Dashboard",
  description: "Comprehensive university student analytics: KPIs, departments, alumni records, at-risk students, and more — powered by live Supabase.",
};

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden m-0 p-0">
      <iframe
        src="/dashboard.html"
        title="University Student Analytics Dashboard"
        className="w-full h-full border-0"
        style={{ minHeight: "100vh" }}
      />
    </main>
  );
}
