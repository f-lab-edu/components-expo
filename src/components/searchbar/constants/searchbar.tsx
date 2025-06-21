import InputAutoComplete from '@/components/input/InputAutoComplete';

export const searchbarElements: { title: string; content: string | React.ReactNode }[] = [
  {
    title: '여행지',
    content: <InputAutoComplete placeholder="여행지 검색" />,
  },
  { title: '체크인', content: '날짜 추가' },
  { title: '체크아웃', content: '날짜 추가' },
  { title: '여행자', content: '게스트 추가' },
];
