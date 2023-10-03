export default interface BlogType {
  _id: string;
  blogTitle: string;
  author: string;
  content: string;
  isFeatured: boolean;
  isPrivate: boolean;
  isPublished: boolean;
  publishedAt: Date;
  blogImageUrl: string;
  description: string;
  slug: string;
  tags: [string];
  createdAt: Date;
  updatedAt: Date;
}
