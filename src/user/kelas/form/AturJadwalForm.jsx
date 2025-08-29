import React, { useState, useMemo } from "react";

export default function AturJadwalForm() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDates, setSelectedDates] = useState([]); // simpan banyak tanggal
  const [selectedSessions, setSelectedSessions] = useState({}); // simpan sesi tiap tanggal
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "Matematika",
    tutor: "any",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const MAX_MEETINGS = 15;

  const tutors = [
    { id: "any", name: "Any available tutor" },
    { id: "t1", name: "Pak Andi (Matematika)" },
    { id: "t2", name: "Bu Sari (Bahasa Indonesia)" },
    { id: "t3", name: "Pak Budi (Fisika)" },
  ];

  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const addMonths = (date, n) => new Date(date.getFullYear(), date.getMonth() + n, 1);

  const monthDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const startWeekDay = start.getDay();
    const totalDays = end.getDate();

    const days = [];
    for (let i = 0; i < startWeekDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
    return days;
  }, [currentMonth]);

  function isSameDay(a, b) {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSelectDate(date) {
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (isPast) return;

    const exists = selectedDates.some((d) => isSameDay(d, date));

    if (exists) {
      // hapus tanggal jika sudah ada (toggle)
      setSelectedDates((prev) => prev.filter((d) => !isSameDay(d, date)));
      setSelectedSessions((prev) => {
        const updated = { ...prev };
        const key = date.toISOString().split("T")[0];
        delete updated[key];
        return updated;
      });
    } else {
      if (selectedDates.length >= MAX_MEETINGS) {
        alert(`Maksimal ${MAX_MEETINGS} hari pertemuan per bulan.`);
        return;
      }
      setSelectedDates((prev) => [...prev, date]);
    }
  }

  function handleSelectSession(date, session) {
    const key = date.toISOString().split("T")[0];
    setSelectedSessions((prev) => ({ ...prev, [key]: session }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullname.trim() || !form.email.trim() || selectedDates.length === 0) {
      alert("Mohon lengkapi nama, email, dan pilih tanggal pertemuan.");
      return;
    }
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 900));

    const payload = {
      ...form,
      dates: selectedDates.map((d) => ({
        date: d.toISOString().split("T")[0],
        session: selectedSessions[d.toISOString().split("T")[0]] || "Belum dipilih",
      })),
      tutor: tutors.find((t) => t.id === form.tutor)?.name || "Any",
    };

    setConfirmation(payload);
    setSubmitting(false);
  }

  function monthTitle(date) {
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  }

  const sesiOptions = ["Pagi", "Siang", "Malam"];

  return (
    <div className="max-w-7xl mx-auto mb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Booking Guru Privat</h1>
        <p className="text-sm text-slate-600">Pilih maksimal {MAX_MEETINGS} hari pertemuan per bulan.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setCurrentMonth((m) => addMonths(m, -1))}
              className="px-2 py-1 rounded hover:bg-slate-100"
            >
              ‹
            </button>
            <h2 className="text-lg font-medium">{monthTitle(currentMonth)}</h2>
            <button
              type="button"
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              className="px-2 py-1 rounded hover:bg-slate-100"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 text-xs text-center text-slate-500 mb-2">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day, idx) => {
              const isDisabled = !day || (day < new Date(today.getFullYear(), today.getMonth(), today.getDate()));
              const isSelected = selectedDates.some((d) => isSameDay(d, day));
              const isTodayFlag = isSameDay(day, today);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => day && handleSelectDate(day)}
                  disabled={isDisabled}
                  className={`h-12 flex items-center justify-center rounded-md text-sm leading-none
                    ${isDisabled ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-slate-100'}
                    ${isSelected ? 'bg-blue-600 text-white' : ''}
                    ${isTodayFlag && !isSelected ? 'ring-1 ring-slate-200' : ''}`}
                  aria-pressed={isSelected}
                >
                  {day ? day.getDate() : ''}
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-sm text-slate-600">
            <p>Hari terpilih: {selectedDates.length} / {MAX_MEETINGS}</p>
          </div>

          {selectedDates.length > 0 && (
            <div className="mt-4 space-y-3">
              {selectedDates.map((d, i) => {
                const key = d.toISOString().split("T")[0];
                return (
                  <div key={i} className="border rounded p-2">
                    <p className="text-sm font-medium">{key}</p>
                    <div className="flex gap-2 mt-2">
                      {sesiOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSelectSession(d, s)}
                          className={`px-3 py-1 rounded border text-sm
                            ${selectedSessions[key] === s ? 'bg-blue-600 text-white' : 'hover:bg-slate-100'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="bg-white border rounded-lg p-4 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm">
                <span>Nama lengkap</span>
                <input name="fullname" value={form.fullname} onChange={handleInput} className="mt-1 w-full border rounded p-2" placeholder="Nama siswa / wali" />
              </label>

              <label className="text-sm">
                <span>Email</span>
                <input name="email" value={form.email} onChange={handleInput} type="email" className="mt-1 w-full border rounded p-2" placeholder="email@example.com" />
              </label>

              <label className="text-sm">
                <span>Telepon</span>
                <input name="phone" value={form.phone} onChange={handleInput} className="mt-1 w-full border rounded p-2" placeholder="0812xxxx" />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label className="text-sm">
                  <span>Mata pelajaran</span>
                  <select name="subject" value={form.subject} onChange={handleInput} className="mt-1 w-full border rounded p-2">
                    <option>Matematika</option>
                    <option>Bahasa Indonesia</option>
                    <option>Bahasa Inggris</option>
                    <option>Fisika</option>
                    <option>Kimia</option>
                  </select>
                </label>

                <label className="text-sm">
                  <span>Pilih tutor</span>
                  <select name="tutor" value={form.tutor} onChange={handleInput} className="mt-1 w-full border rounded p-2">
                    {tutors.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="text-sm">
                <span>Catatan (opsional)</span>
                <textarea name="notes" value={form.notes} onChange={handleInput} className="mt-1 w-full border rounded p-2" rows={3}></textarea>
              </label>

              <div className="flex items-center gap-3 mt-2">
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
                  {submitting ? 'Mengirim...' : 'Konfirmasi Booking'}
                </button>
              </div>
            </div>
          </form>

          {confirmation && (
            <div className="mt-4 p-3 border rounded bg-slate-50">
              <h3 className="font-medium">Booking berhasil!</h3>
              <ul className="text-sm mt-2 space-y-1">
                <li><strong>Nama:</strong> {confirmation.fullname}</li>
                <li><strong>Email:</strong> {confirmation.email}</li>
                <li><strong>Telepon:</strong> {confirmation.phone}</li>
                <li><strong>Pelajaran:</strong> {confirmation.subject}</li>
                <li><strong>Tutor:</strong> {confirmation.tutor}</li>
                <li><strong>Tanggal & Sesi dipilih:</strong>
                  <ul className="list-disc list-inside">
                    {confirmation.dates.map((d, i) => <li key={i}>{d.date} - {d.session}</li>)}
                  </ul>
                </li>
                <li><strong>Catatan:</strong> {confirmation.notes || '-'}</li>
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
