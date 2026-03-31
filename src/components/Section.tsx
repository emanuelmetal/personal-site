type SectionProps = {
  id: string;
  children: React.ReactNode;
  alternate?: boolean;
};

export default function Section({
  id,
  children,
  alternate = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-12 sm:px-8 lg:px-12 lg:py-16 ${
        alternate
          ? 'bg-slate-50 dark:bg-slate-900'
          : 'bg-white dark:bg-slate-950'
      }`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
