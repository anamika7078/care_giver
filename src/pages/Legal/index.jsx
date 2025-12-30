import React from "react";

const Legal = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-[#6B3F69]">Policies</p>
        <h1 className="text-3xl font-bold text-[#2f2235]">Legal & Privacy</h1>
        <p className="text-slate-700">
          How we protect your information and deliver services responsibly.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass-panel rounded-2xl p-5 space-y-2 animate-card">
          <h3 className="text-xl font-semibold text-[#2f2235]">Privacy notice</h3>
          <p className="text-slate-700">
            We collect only the data needed to provide care and never sell personal
            information. Access is limited to authorized clinicians and staff.
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-5 space-y-2 animate-card">
          <h3 className="text-xl font-semibold text-[#2f2235]">Terms of service</h3>
          <p className="text-slate-700">
            By booking a visit you agree to our communication, scheduling, and cancellation
            policies. Emergencies should be routed to local services.
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-5 space-y-2 animate-card sm:col-span-2">
          <h3 className="text-xl font-semibold text-[#2f2235]">HIPAA alignment</h3>
          <p className="text-slate-700">
            Protected health information is stored using encrypted services and shared only
            with consent or when legally required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Legal;

