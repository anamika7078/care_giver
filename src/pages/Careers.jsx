import React from "react";

const roles = [
  {
    title: "Home Health RN",
    location: "Remote + Local Visits",
    summary: "Lead in-home visits, educate families, and coordinate care.",
  },
  {
    title: "Care Coordinator",
    location: "Remote",
    summary:
      "Own schedules, follow-ups, and communication between clinicians and families.",
  },
  {
    title: "Clinical Operations Lead",
    location: "Hybrid",
    summary:
      "Shape protocols, quality metrics, and partnerships with health systems.",
  },
];

const Careers = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-[#6B3F69]">Careers</p>
        <h1 className="text-3xl font-bold text-[#2f2235]">Join the team</h1>
        <p className="text-slate-700">
          Build family-centered care with a multidisciplinary group.
        </p>
      </div>
      <div className="grid gap-3">
        {roles.map((role) => (
          <div
            key={role.title}
            className="glass-panel rounded-2xl p-5 flex flex-col gap-2 animate-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-[#2f2235]">{role.title}</span>
              <span className="px-2.5 py-1 rounded-lg text-xs bg-[#6B3F69]/12 text-[#6B3F69] border border-[#e7d7df]">
                {role.location}
              </span>
            </div>
            <div className="text-slate-700">{role.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;

