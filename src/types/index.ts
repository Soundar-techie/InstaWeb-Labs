export interface Meme {
  id: string;
  url: string;
  title: string;
  likes: number;
  comments: number;
  createdAt: string;
  category: 'trending' | 'new' | 'classic' | 'random';
}

export interface User {
  id: string;
  name: string;
  bio: string;
  profilePicture: string;
  uploadedMemes: string[];
  likedMemes: string[];
}