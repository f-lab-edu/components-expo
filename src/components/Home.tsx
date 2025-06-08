import ExhibitionButton from './button/ExhibitionButton';
import Layout from './common/Layout';
import ExhibitionInput from './input/ExhibitionInput';
import ExhibitionInputGroup from './input/ExhibitionInputGroup';

export default function Home() {
  const components = [
    <ExhibitionButton />,
    <ExhibitionInput />,
    <ExhibitionInputGroup />,
    4,
    5,
    6,
    7,
    8,
    9,
  ];
  return (
    <main className="grid w-full h-full grid-cols-3 grid-rows-3 ">
      {components.map((el, idx) => (
        <Layout key={idx}> {el} </Layout>
      ))}
    </main>
  );
}
