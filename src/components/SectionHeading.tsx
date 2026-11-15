interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const SectionHeading = ({ title, description, className = "mb-12" }: SectionHeadingProps) => (
  <div className={`text-center ${className}`}>
    <h2 className="mb-4 font-lora text-3xl font-bold text-primary md:text-4xl">{title}</h2>
    {description && <p className="mx-auto max-w-3xl text-gray-600">{description}</p>}
    <div className="mx-auto mt-4 h-1 w-20 bg-gold" aria-hidden="true"></div>
  </div>
);

export default SectionHeading;
