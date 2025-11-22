import React, { useState, useEffect } from "react";

// FinTech FastTrack App
// Single-file React component previewable in the canvas
// Tailwind CSS classes used for styling (no external imports required here)

export default function FinTechFastTrackApp() {
  const [view, setView] = useState("dashboard");
  const [week, setWeek] = useState(1);
  const [progress, setProgress] = useState(() => {
    // load progress from localStorage
    try {
      const item = localStorage.getItem("ft_progress");
      return item ? JSON.parse(item) : { completedTasks: {}, percent: 0 };
    } catch (e) {
      return { completedTasks: {}, percent: 0 };
    }
  });

  useEffect(() => {
    localStorage.setItem("ft_progress", JSON.stringify(progress));
  }, [progress]);

  const weeks = Array.from({ length: 24 }, (_, i) => i + 1);

  const defaultSchedule = {
    1: [
      { id: "w1t1", title: "Start Intro to FinTech (HKU - edX)", time: "6 hrs" },
      { id: "w1t2", title: "Excel: Pivot tables & VLOOKUP (Coursera)", time: "3 hrs" },
      { id: "w1t3", title: "SQL basics (SQLBolt)", time: "2 hrs" },
    ],
    2: [
      { id: "w2t1", title: "Continue FinTech course", time: "4 hrs" },
      { id: "w2t2", title: "Complete SQL basics", time: "4 hrs" },
    ],
    3: [
      { id: "w3t1", title: "Finish Excel course + mini project", time: "6 hrs" },
      { id: "w3t2", title: "Start documenting notes for portfolio", time: "2 hrs" },
    ],
    4: [
      { id: "w4t1", title: "Finish FinTech course", time: "4 hrs" },
      { id: "w4t2", title: "Create simple Excel dashboard", time: "4 hrs" },
    ],
    // ... you can expand this to all 24 weeks. For brevity, only first 8 weeks prefilled
    5: [
      { id: "w5t1", title: "Business Analysis Fundamentals (Udemy)", time: "5 hrs" },
      { id: "w5t2", title: "Write user stories and acceptance criteria", time: "3 hrs" },
    ],
    6: [
      { id: "w6t1", title: "Start Product Management course (Coursera)", time: "5 hrs" },
      { id: "w6t2", title: "Map user journeys (Miro/Figma)", time: "3 hrs" },
    ],
    7: [
      { id: "w7t1", title: "API basics (Postman) - get free certificate", time: "3 hrs" },
      { id: "w7t2", title: "Combine workflows into first portfolio case study", time: "5 hrs" },
    ],
    8: [
      { id: "w8t1", title: "Payments 101 (Payments Association)", time: "4 hrs" },
      { id: "w8t2", title: "AML/KYC basics (Udemy)", time: "4 hrs" },
    ],
  };

  function toggleTaskCompleted(taskId) {
    setProgress((p) => {
      const completed = { ...p.completedTasks };
      if (completed[taskId]) delete completed[taskId];
      else completed[taskId] = true;
      const totalTasks = getAllTasks().length;
      const done = Object.keys(completed).length;
      const percent = Math.round((done / totalTasks) * 100);
      return { completedTasks: completed, percent };
    });
  }

  function getAllTasks() {
    return Object.values(defaultSchedule).flat();
  }

  function resetProgress() {
    setProgress({ completedTasks: {}, percent: 0 });
  }

  // Simple CV generator state
  const [cvData, setCvData] = useState({
    name: "",
    title: "FinTech Product Analyst",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  function downloadJSON() {
    const data = {
      schedule: defaultSchedule,
      progress,
      cvData,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fintech_fasttrack_export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Simple quiz
  const quiz = [
    {
      id: 1,
      q: "Which of the following is NOT typically part of AML checks?",
      options: ["Customer identity verification", "Transaction monitoring", "User interface design", "Sanctions screening"],
      answer: 2,
    },
    {
      id: 2,
      q: "Open Banking APIs are mainly used to:",
      options: ["Share customer-permissioned financial data", "Encrypt payments", "Create blockchain wallets", "Host websites"],
      answer: 0,
    },
  ];
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  function submitQuiz() {
    let score = 0;
    quiz.forEach((item) => {
      if (quizAnswers[item.id] === item.answer) score++;
    });
    setQuizScore(`${score} / ${quiz.length}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12">
          <aside className="col-span-3 bg-gradient-to-b from-sky-600 to-indigo-600 text-white p-6">
            <h1 className="text-2xl font-bold mb-4">FinTech FastTrack</h1>
            <p className="text-sm mb-4">Practice app: 6-month roadmap • CV • Portfolio • Visa checklist</p>
            <nav className="space-y-2">
              <button onClick={() => setView("dashboard")} className={`w-full text-left px-3 py-2 rounded ${view === "dashboard" ? "bg-white text-sky-700 font-semibold" : "hover:bg-white/10"}`}>Dashboard</button>
              <button onClick={() => setView("schedule")} className={`w-full text-left px-3 py-2 rounded ${view === "schedule" ? "bg-white text-sky-700 font-semibold" : "hover:bg-white/10"}`}>Weekly Schedule</button>
              <button onClick={() => setView("checklist")} className={`w-full text-left px-3 py-2 rounded ${view === "checklist" ? "bg-white text-sky-700 font-semibold" : "hover:bg-white/10"}`}>GTV Checklist</button>
              <button onClick={() => setView("cv")} className={`w-full text-left px-3 py-2 rounded ${view === "cv" ? "bg-white text-sky-700 font-semibold" : "hover:bg-white/10"}`}>CV Builder</button>
              <button onClick={() => setView("portfolio")} className={`w-full text-left px-3 py-2 rounded ${view === "portfolio" ? "bg-white text-sky-700 font-semibold" : "hover:bg-white/10"}`}>Portfolio Templates</button>
              <button onClick={() => setView("quiz")} className={`w-full text-left px-3 py-2 rounded ${view === "quiz" ? "bg-white text-sky-700 font-semibold" : "hover:bg-white/10"}`}>Practice Quiz</button>
              <button onClick={() => setView("resources")} className={`w-full text-left px-3 py-2 rounded ${view === "resources" ? "bg-white text-sky-700 font-semibold" : "hover:bg-white/10"}`}>Resources</button>
            </nav>

            <div className="mt-6">
              <div className="text-xs">Overall Progress</div>
              <div className="w-full bg-white/20 rounded-full h-4 mt-2">
                <div className="h-4 rounded-full bg-white" style={{ width: `${progress.percent}%` }} />
              </div>
              <div className="text-xs mt-1">{progress.percent}% completed</div>
              <div className="mt-4 space-y-2">
                <button onClick={resetProgress} className="w-full bg-white/10 text-white px-3 py-2 rounded">Reset Progress</button>
                <button onClick={downloadJSON} className="w-full bg-white text-sky-700 px-3 py-2 rounded font-semibold">Export</button>
              </div>
            </div>

            <div className="mt-6 text-xs opacity-80">
              Built for practice: follow the weekly plan, publish projects, collect certificates, and start applying.
            </div>
          </aside>

          <main className="col-span-9 p-6">
            {view === "dashboard" && (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <p className="text-sm text-gray-600">Week: {week} • Pick a weekly plan and tick tasks as you complete them.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Quick actions</div>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => setView("schedule")} className="px-3 py-2 bg-sky-600 text-white rounded">Open Schedule</button>
                      <button onClick={() => setView("cv")} className="px-3 py-2 bg-white border text-sky-700 rounded">Build CV</button>
                    </div>
                  </div>
                </div>

                <section className="mt-6 grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white p-4 rounded shadow-sm">
                    <h3 className="font-semibold">This Week's Tasks</h3>
                    <ul className="mt-3 space-y-2">
                      {(defaultSchedule[week] || [{ id: "empty", title: "No tasks planned for this week", time: "0" }]).map((task) => (
                        <li key={task.id} className="flex items-center justify-between border-b py-2">
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-xs text-gray-500">Estimated: {task.time}</div>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input type="checkbox" checked={!!progress.completedTasks[task.id]} onChange={() => toggleTaskCompleted(task.id)} className="form-checkbox" />
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex gap-2">
                      <button onClick={() => setWeek((w) => Math.max(1, w - 1))} className="px-3 py-2 border rounded">Prev Week</button>
                      <button onClick={() => setWeek((w) => Math.min(24, w + 1))} className="px-3 py-2 border rounded">Next Week</button>
                      <div className="ml-auto text-sm text-gray-500">Week {week} of 24</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded shadow-sm">
                    <h3 className="font-semibold">Mini Toolbox</h3>
                    <ul className="mt-2 text-sm space-y-2 text-gray-600">
                      <li>Track certificates in the checklist tab</li>
                      <li>Publish projects (LinkedIn / Medium)</li>
                      <li>Collect 3 recommendation letters</li>
                    </ul>
                    <div className="mt-4">
                      <button onClick={() => setView("checklist")} className="w-full px-3 py-2 bg-sky-600 text-white rounded">Open GTV Checklist</button>
                    </div>
                  </div>
                </section>

                <section className="mt-6 bg-white p-4 rounded shadow-sm">
                  <h3 className="font-semibold">Quick Portfolio Preview</h3>
                  <p className="text-sm text-gray-600 mt-2">Your main portfolio should contain: 1) Digital Bank Onboarding case study, 2) Payments dashboard, 3) AML workflow. Use the Portfolio Templates tab to start them.</p>
                </section>
              </div>
            )}

            {view === "schedule" && (
              <div>
                <h2 className="text-xl font-bold">Weekly Schedule</h2>
                <p className="text-sm text-gray-600 mt-1">Follow the week-by-week tasks. Mark them complete as you go.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <label className="block text-sm text-gray-700">Select Week</label>
                    <select value={week} onChange={(e) => setWeek(Number(e.target.value))} className="mt-2 border rounded px-3 py-2 w-full">
                      {weeks.map((w) => (
                        <option value={w} key={w}>Week {w}</option>
                      ))}
                    </select>

                    <div className="mt-4">
                      <h3 className="font-semibold">Tasks for Week {week}</h3>
                      <ul className="mt-2 space-y-2">
                        {(defaultSchedule[week] || [{ id: `w${week}t1`, title: "No preset tasks — add your own", time: "" }]).map((task) => (
                          <li key={task.id} className="flex items-center justify-between border-b py-2">
                            <div>
                              <div className="font-medium">{task.title}</div>
                              <div className="text-xs text-gray-500">{task.time}</div>
                            </div>
                            <div>
                              <input type="checkbox" checked={!!progress.completedTasks[task.id]} onChange={() => toggleTaskCompleted(task.id)} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded shadow-sm">
                    <h3 className="font-semibold">Quick Add Task</h3>
                    <AddTaskForm week={week} onAdd={(task) => {
                      // append temporary task to defaultSchedule (local only)
                      const id = `w${week}t${Date.now()}`;
                      defaultSchedule[week] = [...(defaultSchedule[week] || []), { id, title: task, time: "user" }];
                      // force re-render
                      setWeek((w) => w + 0);
                    }} />
                    <div className="mt-4 text-sm text-gray-500">Custom tasks are stored while the app is open. Use Export to save progress.</div>
                  </div>
                </div>
              </div>
            )}

            {view === "checklist" && (
              <div>
                <h2 className="text-xl font-bold">Global Talent Visa Checklist</h2>
                <p className="text-sm text-gray-600 mt-1">Track required evidence and certificates here.</p>
                <ul className="mt-4 space-y-2">
                  {[
                    { id: "c1", text: "Intro to FinTech certificate (edX)" },
                    { id: "c2", text: "Excel Skills certificate (Coursera)" },
                    { id: "c3", text: "SQL certificate" },
                    { id: "c4", text: "Power BI / Tableau certificate" },
                    { id: "c5", text: "Payments 101 certificate" },
                    { id: "c6", text: "AML/KYC certificate" },
                    { id: "c7", text: "3 Recommendation letters (prepare drafts)" },
                    { id: "c8", text: "Portfolio: Onboarding case study (PDF)" },
                    { id: "c9", text: "Portfolio: Payments Dashboard (Power BI)" },
                    { id: "c10", text: "Published articles (LinkedIn/Medium)" },
                  ].map((c) => (
                    <li key={c.id} className="flex items-center gap-3 border-b py-3">
                      <input type="checkbox" checked={!!progress.completedTasks[c.id]} onChange={() => toggleTaskCompleted(c.id)} />
                      <div className="text-sm">{c.text}</div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-gray-600">Tip: Ask managers or trainers for recommendation letters early — provide them with a draft to sign.</div>
              </div>
            )}

            {view === "cv" && (
              <div>
                <h2 className="text-xl font-bold">CV Builder</h2>
                <p className="text-sm text-gray-600 mt-1">Fill the fields and preview a FinTech-ready CV you can copy.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <label className="block text-sm text-gray-700">Full Name</label>
                    <input value={cvData.name} onChange={(e) => setCvData({ ...cvData, name: e.target.value })} className="mt-2 w-full border px-3 py-2 rounded" />
                    <label className="block text-sm text-gray-700 mt-3">Professional Summary</label>
                    <textarea value={cvData.summary} onChange={(e) => setCvData({ ...cvData, summary: e.target.value })} className="mt-2 w-full border px-3 py-2 rounded" rows={4} />
                    <label className="block text-sm text-gray-700 mt-3">Experience (brief)</label>
                    <textarea value={cvData.experience} onChange={(e) => setCvData({ ...cvData, experience: e.target.value })} className="mt-2 w-full border px-3 py-2 rounded" rows={4} />
                    <label className="block text-sm text-gray-700 mt-3">Skills (comma separated)</label>
                    <input value={cvData.skills} onChange={(e) => setCvData({ ...cvData, skills: e.target.value })} className="mt-2 w-full border px-3 py-2 rounded" />
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => navigator.clipboard.writeText(generateCVText(cvData))} className="px-3 py-2 bg-sky-600 text-white rounded">Copy CV</button>
                      <button onClick={() => {
                        const blob = new Blob([generateCVText(cvData)], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "cv.txt";
                        a.click();
                        URL.revokeObjectURL(url);
                      }} className="px-3 py-2 border rounded">Download</button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded shadow-sm">
                    <h3 className="font-semibold">CV Preview</h3>
                    <div className="mt-3 text-sm whitespace-pre-wrap font-mono text-gray-700">
                      {generateCVText(cvData)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === "portfolio" && (
              <div>
                <h2 className="text-xl font-bold">Portfolio Templates</h2>
                <p className="text-sm text-gray-600 mt-1">Use these templates as PDFs or web posts. Fill the sections and publish.</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <TemplateCard title="Onboarding Case Study" bullets={["Problem statement", "Current workflow", "Proposed workflow", "Compliance steps", "Business impact"]} />
                  <TemplateCard title="Payments Dashboard" bullets={["Dataset description", "KPIs", "Dashboard screenshots", "Insights & actions"]} />
                  <TemplateCard title="AML/KYC Workflow" bullets={["Risk triggers", "Screening steps", "Escalation process", "Example cases"]} />
                </div>
                <div className="mt-6 bg-white p-4 rounded shadow-sm">
                  <h3 className="font-semibold">Quick start</h3>
                  <ol className="list-decimal list-inside text-sm mt-2 text-gray-600">
                    <li>Choose a template</li>
                    <li>Draft the content (use the CV Builder for bio sections)</li>
                    <li>Create visuals in Figma / Power BI</li>
                    <li>Publish on LinkedIn & Medium</li>
                  </ol>
                </div>
              </div>
            )}

            {view === "quiz" && (
              <div>
                <h2 className="text-xl font-bold">Practice Quiz</h2>
                <p className="text-sm text-gray-600 mt-1">Small multiple-choice quiz to test basic knowledge. No pressure — just practice.</p>
                <div className="mt-4 bg-white p-4 rounded shadow-sm">
                  {quiz.map((q) => (
                    <div key={q.id} className="mb-4">
                      <div className="font-medium">{q.id}. {q.q}</div>
                      <div className="mt-2 space-y-2">
                        {q.options.map((opt, i) => (
                          <label key={i} className="flex items-center gap-2">
                            <input type="radio" name={`q${q.id}`} checked={quizAnswers[q.id] === i} onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: i })} />
                            <div>{opt}</div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button onClick={submitQuiz} className="px-3 py-2 bg-sky-600 text-white rounded">Submit</button>
                    <div className="ml-3 text-sm text-gray-600">Score: {quizScore ?? "—"}</div>
                  </div>
                </div>
              </div>
            )}

            {view === "resources" && (
              <div>
                <h2 className="text-xl font-bold">Resources</h2>
                <p className="text-sm text-gray-600 mt-1">Curated list of courses & platforms to look up.</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h3 className="font-semibold">Courses (search these on platform)</h3>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                      <li>Introduction to FinTech — HKU (edX)</li>
                      <li>Excel Skills for Business — Coursera</li>
                      <li>SQL for Data Analysis — Coursera / SQLBolt</li>
                      <li>Business Analysis Fundamentals — Udemy</li>
                      <li>Product Management — University of Virginia (Coursera)</li>
                      <li>Power BI Data Analyst Professional Certificate — Coursera</li>
                      <li>Payments 101 — The Payments Association</li>
                      <li>AML/KYC Compliance — Udemy</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded shadow-sm">
                    <h3 className="font-semibold">Tools</h3>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                      <li>Excel / Google Sheets</li>
                      <li>Power BI or Tableau</li>
                      <li>Figma or Miro (for flows)</li>
                      <li>Postman (API basics)</li>
                      <li>GitHub (portfolio hosting)</li>
                    </ul>
                    <div className="mt-4 text-sm text-gray-600">Tip: For each course, download certificates and add them to the checklist tab.</div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}

function AddTaskForm({ week, onAdd }) {
  const [val, setVal] = useState("");
  return (
    <div>
      <label className="block text-sm">Task title</label>
      <input value={val} onChange={(e) => setVal(e.target.value)} className="mt-2 w-full border px-3 py-2 rounded" />
      <div className="mt-2 flex gap-2">
        <button onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(""); } }} className="px-3 py-2 bg-sky-600 text-white rounded">Add Task</button>
        <button onClick={() => setVal("")} className="px-3 py-2 border rounded">Clear</button>
      </div>
    </div>
  );
}

function TemplateCard({ title, bullets }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="font-semibold">{title}</h4>
      <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="mt-4">
        <button className="px-3 py-2 bg-sky-600 text-white rounded">Use template</button>
      </div>
    </div>
  );
}

function generateCVText(data) {
  return `${data.name || "Your Name"}\n${data.title}\n\nProfessional Summary:\n${data.summary || "Brief summary about your strengths and transition to FinTech."}\n\nExperience:\n${data.experience || "List your relevant roles and achievements."}\n\nEducation:\n${data.education || "Your degrees and institutions."}\n\nSkills:\n${data.skills || "Excel, SQL, Power BI, Product Analysis, Payments"}\n`;
}
