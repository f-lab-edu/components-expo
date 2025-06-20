export type LodgingProps = {
  id: string;
  image: string;
  isLiked: boolean;
  title: string;
  usingDate: string; // 9월 1일~2일
  totalPrice: string; // 화폐단위 포함
  rate: number;
  days: string; // 일수+단위, eg, 2박
  isGuestPreferred: boolean;
  onClick?: (id: string) => void;
};
