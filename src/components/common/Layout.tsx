type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="flex justify-center items-center border border-gray-200">{children}</div>;
}
