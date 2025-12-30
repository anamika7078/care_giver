import React from "react";

const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 md:p-6 animate-card">
      {icon && (
        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#6B3F69]/15 text-[#6B3F69] text-xs font-semibold mb-3">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-1 text-[#2f2235]">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default ServiceCard;

