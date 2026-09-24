import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  breadcrumb?: string;
}

export default function PageHero({ label, title, description, breadcrumb }: PageHeroProps) {
  return (
    <section className="page-hero relative z-10 pt-32 pb-16 md:pt-40 md:pb-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {breadcrumb && (
          <p className="text-xs font-semibold tracking-[0.2em] text-[#4b8ef5] uppercase mb-4">
            Home <ChevronRight size={12} className="inline mx-1" /> {breadcrumb}
          </p>
        )}
        <span className="label-badge mb-4 inline-block">{label}</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text-light mb-5">{title}</h1>
        <div className="section-divider-wide w-40 mx-auto mb-5" />
        {description && (
          <p className="text-[#94aed4] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
