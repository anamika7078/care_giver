import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thanks for reaching out! We will reply shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form
      className="glass-panel rounded-2xl p-6 md:p-8 space-y-5 animate-card"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-[#2f2235]">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
          className="w-full rounded-xl bg-white border border-[#e7d7df] px-3 py-2.5 text-[#2f2235] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-[#2f2235]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@email.com"
          required
          className="w-full rounded-xl bg-white border border-[#e7d7df] px-3 py-2.5 text-[#2f2235] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-[#2f2235]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help your family"
          required
          className="w-full rounded-xl bg-white border border-[#e7d7df] px-3 py-2.5 text-[#2f2235] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8D5F8C]/50"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl py-3 gradient-cta hover:scale-[1.01] active:scale-[0.99]"
      >
        Send message
      </button>
    </form>
  );
};

export default ContactForm;

