interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => (
  <div className="bg-primary py-12 text-white">
    <div className="container mx-auto px-4 text-center md:px-6">
      <h1 className="mb-4 font-lora text-4xl font-bold md:text-5xl">{title}</h1>
      <p className="mx-auto max-w-3xl">{description}</p>
    </div>
  </div>
);

export default PageHeader;
