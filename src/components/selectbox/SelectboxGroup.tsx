type SelectboxGroupProps = {
  title: string;
  children: React.ReactNode;
};

export default function SelectboxGroup({ title, children }: SelectboxGroupProps) {
  return (
    <>
      <div className="flex flex-col py-6 px-3 overflow-y-scroll">
        <span className="text-sm mb-2">{title}</span>
        <ul className="flex flex-col space-y-2">{children}</ul>
      </div>
    </>
  );
}
