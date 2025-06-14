type SelectBoxItemProps<T extends string | number | readonly string[]> = {
  children: React.ReactNode;
  value: T;
};

export default function SelectBoxItem<T extends string | number | readonly string[]>({
  children,
  value,
}: SelectBoxItemProps<T>) {
  return (
    <li
      data-value={value}
      className="flex items-center w-full p-2 hover:bg-[#ebebeb] rounded-2xl cursor-pointer"
    >
      {children}
    </li>
  );
}
