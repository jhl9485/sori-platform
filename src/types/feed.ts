export type FeedCategory = "생활정보" | "맛집" | "취업" | "생활";

export interface FeedItem {
  id: string;
  avatarChar: string;
  avatarBg: string;
  avatarColor: string;
  author: string;
  time: string;
  category: FeedCategory;
  title: string;
  preview: string;
  tags: string[];
  views: string;
  comments: string;
  likes: string;
}
