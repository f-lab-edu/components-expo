export default function SkeletonLodging() {
  return (
    <div className="flex flex-col w-48 cursor-pointer animate-pulse">
      {/* 이미지 영역 */}
      <div className="overflow-hidden relative rounded-xl bg-gray-200 aspect-square" />

      {/* 텍스트 영역 */}
      <div className="flex flex-col mt-2 space-y-2">
        {/* 타이틀 */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* 날짜/가격/일수/별점 */}
        <div className="space-y-1 text-xs text-[#222222]">
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
