export type RecommendPlaceResponse = {
  title: string;
  items: {
    itemId: string;
    image: string;
    itemTitle: string;
    description: string;
  }[];
};
