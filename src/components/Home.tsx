import ExhibitionButton from './button/ExhibitionButton';
import Layout from './common/Layout';

export default function Home() {
  const components = [<ExhibitionButton />, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <main className="grid w-full h-full grid-cols-3 grid-rows-3 ">
      {components.map((el) => (
        <Layout> {el} </Layout>
      ))}
    </main>
  );
}
