# 🎓 Apex University • Academic & Student Analytics Intelligence Dashboard

A production-ready executive analytics dashboard for universities, providing real-time insights into **Departments**, **Students**, and **Alumni Records** with **automated KPI computation** powered by live Supabase PostgreSQL data.

---

## ⚡ Connected Supabase Project Credentials

- **Project ID**: `qbhfwfyrffmrconfvmiz`
- **REST Endpoint**: `https://qbhfwfyrffmrconfvmiz.supabase.co/rest/v1`
- **Authentication**: Anon Public Key configured for client-side queries

---

## 📊 Features & Architecture

### 1. Automated KPI Engine
- **Total Students**: 360 students tracked
- **Active Enrolled**: 247 students (68.6% active cohort)
- **Overall Graduation Rate**: 75.8% (Avg 3.1 years to graduation)
- **Alumni Employment Rate**: 70.3% post-graduation placement
- **Total Academic Programs**: 12 degree programs across 6 departments
- **Total Faculty & Ratios**: 167 faculty members; 27.7 : 1 student-to-faculty ratio
- **Average Starting Salary**: PKR 118K/month
- **Institutional Satisfaction**: 4.0 / 5.0 across departments
- **At-Risk Monitoring**: Automated early warning flagging students with low CGPA (< 2.5), low attendance (< 75%), or unpaid fees
- **Internship Rate**: 65% across departments

### 2. Multi-Tabbed Executive Interface
1. **🌟 Executive Overview**:
   - Admission Conversion Funnel (Applied → Shortlisted → Admitted → Enrolled)
   - 5-Year Active vs Non-Active student trajectory line chart
   - Geographic distribution across provinces
   - Scholarship vs Self-Financed split
   - Market skill gaps & demand scores
2. **🏛️ Department Insights**:
   - Individual department profile cards (Faculty, Enrollment, Ratio, Satisfaction, Internship Rate)
   - Student-to-Faculty Ratio comparative chart
   - Satisfaction & Internship rate benchmark chart
   - Full Academic Programs Directory with search, degree level, duration, and seats
3. **🎓 Student Analytics**:
   - Student Status breakdown donut (Active, Graduated, Dropped Out, Suspended, On Leave)
   - Cohort Retention rate across study years (Year 1 to Year 4)
   - Dropout and Leave root causes
   - Average CGPA by Program with probation flags
   - Gender ratio by Program (Female vs Male)
   - **⚠️ Early Warning System**: Interactive searchable table of at-risk students with specific warning flags
4. **💼 Alumni Records & Placement**:
   - Top Employers Leaderboard with verified reputable status
   - Placement rate and salary spectrum (Min, Avg, Max) by academic program
   - Polar area chart of Alumni by Industry
   - Employer organization type (Fortune 500, Multinational, Local Enterprise)
   - Career destination location (Domestic employment, Abroad, Higher Studies)
5. **🗃️ Live Raw Records Explorer**:
   - Interactive database browser for **Departments (6)**, **Students (360)**, and **Alumni (320)**
   - Instant text search across all columns
   - Client-side pagination (15 records/page)
   - 1-Click CSV data export

---

## 🚀 How to Run Locally

### Option 1: Built-in Node.js Server
From this directory (`University DashBoard`):
```bash
node server.js
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Direct Browser File
Double-click `index.html` or open it directly in any modern web browser.

---

## 🎨 Theme & Responsiveness
- Includes seamless Dark Mode and Light Mode switching with custom chart color adaptation.
- Fully responsive across desktop, tablet, and mobile devices.
