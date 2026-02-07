import { CalendarDays } from 'lucide-react';

interface DateItem {
  date: string;
  event: string;
  description: string;
}

export default function ImportantDates({ dates }: { dates: DateItem[] }) {
  return (
    <section className="my-12 rounded-lg border-2 border-brand-gold/30 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3 text-brand-navy">
        <CalendarDays className="text-brand-gold" />
        <h3 className="font-display text-xl font-bold italic">Chronological Reference</h3>
      </div>
      
      <div className="space-y-6">
        {dates.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row md:gap-8 border-b border-brand-navy/5 pb-4 last:border-0">
            <span className="min-w-[120px] font-bold text-brand-gold">{item.date}</span>
            <div>
              <h4 className="font-bold text-brand-navy">{item.event}</h4>
              <p className="text-sm text-brand-ink/70">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}