import Modal from '@/components/modal/Modal';
import type { RankingMovieProps } from '@/types/movie';
import { useState } from 'react';

export default function RankingMovie({
  ranking,
  thumbnail,
  categories,
  description,
}: RankingMovieProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickMovie = () => {
    setModalOpen(true);
  };

  return (
    <>
      <section
        className="w-56 h-64 relative p-5 transition cursor-pointer hover:scale-105"
        onClick={handleClickMovie}
      >
        <img src={thumbnail} className="rounded-md" alt="movie thumbnail image" />
        <span className="absolute bottom-3 -left-0.5 text-6xl font-bold text-stroke-white">
          {ranking}
        </span>
      </section>

      {modalOpen && (
        <Modal onClose={setModalOpen}>
          <div className="flex flex-col w-full h-full">
            <ul className="flex space-x-2 mb-4">
              {categories?.map((c) => (
                <li
                  key={c}
                  className="bg-slate-300 p-1 rounded-md text-gray-500 font-semibold text-sm"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p>{description}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
