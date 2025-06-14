import RankingMovieDetailModal from '@/components/modal/RankingMovieDetailModal';
import { useModal } from '@/hooks/useModal';
import type { RankingMovieProps } from '@/types/movie';

export default function RankingMovie({
  ranking,
  thumbnail,
  categories,
  description,
}: RankingMovieProps) {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <section
        className="w-56 h-64 relative p-5 transition cursor-pointer hover:scale-105 overflow-hidden rounded-md"
        onClick={openModal}
      >
        <img src={thumbnail} className="rounded-md" alt="movie thumbnail image" />
        <span className="absolute bottom-3 -left-0.5 text-6xl font-bold text-stroke-white">
          {ranking}
        </span>
      </section>

      {isModalOpen && (
        <RankingMovieDetailModal
          categories={categories}
          description={description}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
