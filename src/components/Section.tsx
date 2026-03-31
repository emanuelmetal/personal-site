type SectionProps = {
  id: string;
  children: React.ReactNode;
  alternate?: boolean;
  'aria-labelledby'?: string;
};

export default function Section({
  id,
  children,
  alternate = false,
  'aria-labelledby': ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`px-4 py-16 sm:px-8 lg:px-12 lg:py-24 ${
        alternate
          ? 'bg-slate-50 dark:bg-slate-900'
          : 'bg-white dark:bg-slate-950'
      }`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
