import type { RankingMovieProps } from '@/types/movie';

export default function RankingMovie({ ranking, thumbnail }: RankingMovieProps) {
  return (
    <section className="w-56 h-64 relative p-5 transition cursor-pointer hover:scale-105">
      <img src={thumbnail} className="rounded-md" alt="movie thumbnail image" />
      <span className="absolute bottom-3 -left-0.5 text-6xl font-bold text-stroke-white">
        {ranking}
      </span>
    </section>
  );
}
