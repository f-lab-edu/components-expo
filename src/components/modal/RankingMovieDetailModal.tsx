import Modal from '@/components/modal/Modal';
import type { RankingMovieProps } from '@/types/movie';
import { useEffect, useState, type SetStateAction } from 'react';

type RankingMovieDetailModalProps = Pick<RankingMovieProps, 'categories' | 'description'> & {
  isModalOpen: boolean;
  closeModal: React.Dispatch<SetStateAction<boolean>>;
};

export default function RankingMovieDetailModal({
  categories,
  description,
  isModalOpen,
  closeModal,
}: RankingMovieDetailModalProps) {
  const [blur, setBlur] = useState(true);

  const handleLoad = () => {
    setTimeout(() => {
      setBlur(false);
    }, 500);
  };

  useEffect(() => {
    setBlur(true);
  }, [isModalOpen]);

  return (
    <Modal onClose={closeModal}>
      <div className="flex flex-col items-center w-full h-full overflow-hidden">
        <div className="w-full flex justify-center">
          <img
            src={
              'https://occ-0-1360-2218.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABRv_Xv-t534pVH-OoHaS5k9MrfulGcsIwdHjJsT9UiNmsR8q_RPPJvYQUPAwVD9qpEj6ug5TnxbCONYrKJt88FpPSjfpxT_7Cdmc.webp?r=41e'
            }
            alt="movie detail image"
            className={`max-w-full h-auto object-cover transition ${blur ? 'blur-lg' : ''}`}
            onLoad={handleLoad}
          />
        </div>
        <ul className="flex space-x-2 mb-4">
          {categories?.map((c) => (
            <li key={c} className="bg-slate-300 p-1 rounded-md text-gray-500 font-semibold text-sm">
              {c}
            </li>
          ))}
        </ul>
        <p>{description}</p>
      </div>
    </Modal>
  );
}
