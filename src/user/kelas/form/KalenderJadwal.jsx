
import React, { useState, useMemo, useEffect } from "react";

const KalenderJadwal = ( { setFormTglDataBooking }) => {

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDates, setSelectedDates] = useState([]); 
    const [selectedSessions, setSelectedSessions] = useState({}); 

  
    const MAX_MEETINGS = 15;

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




    function handleSelectDate(date) {
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (isPast) return;


        const exists = selectedDates.some((d) => isSameDay(d, date));


        if (exists) {
            
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

    function monthTitle(date) {
        return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
    }


    const sesiOptions = ["Sesi Pagi", "Sesi Siang", "Sesi Malam"];

   
    useEffect(() => {
       const newPayload = selectedDates.map((d) => {
        const key = d.toISOString().split("T")[0];
        return {
        tglbooking: key,
        sesi: selectedSessions[key] || "Belum dipilih",
        };
      });
            // update payload
   if (newPayload.length > 0) {
  setFormTglDataBooking(prev => ({
    ...prev,
    tglbooking: newPayload[0].tglbooking,
    sesi: newPayload[0].sesi,
  }));
}


    }, [selectedDates, selectedSessions, setFormTglDataBooking])
  
 
    

    return (
        <>
          <div className="max-w-7xl mx-auto mb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Pilih Jadwal Kelas</h1>
        <p className="text-sm text-gray-600">Pilih maksimal {MAX_MEETINGS} hari pertemuan per bulan.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <section className="bg-white border rounded-lg p-4 shadow-sm">

        <div className="flex items-center justify-between mb-3">
            <button
                type="button"
                onClick={() => setCurrentMonth((m) => addMonths(m, -1))}
                className="px-2 py-1 rounded hover:bg-green-100"
            >
            ‹
            </button>
            <h2 className="text-lg font-medium">{monthTitle(currentMonth)}</h2>
            <button
                type="button"
                onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                className="px-2 py-1 rounded hover:bg-green-100"
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
                ${isDisabled ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-green-100 hover:text-green-600'}
                ${isSelected ? 'bg-green-600 text-white' : ''}
                ${isTodayFlag && !isSelected ? 'ring-1 ring-green-200' : ''}`}
                aria-pressed={isSelected}
            >
                    {day ? day.getDate() : ''}
            </button>
          );

        })}
        </div>
    
        </section>



        <section className="bg-white border rounded-lg p-4 shadow-sm">
            
            <div className="grid grid-cols-1 gap-3">
                <div className="mt-4 text-sm text-gray-600">
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
                    ${selectedSessions[key] === s ? 'bg-green-600 text-white' : 'hover:bg-green-100'}`}
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
        


           </div>

        </section>
</div>
        </div>
          </>
          
          


    )
}

export default KalenderJadwal;