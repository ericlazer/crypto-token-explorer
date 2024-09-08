export interface User {
  id: string;
  username: string;
  avatar: string;
  walletAddress: string;
  heldTokens: Token[];
  createdTokens: Token[];
  followers: User[];
  following: User[];
  likesReceived: number;
  mentionsReceived: number;
  bio: string;
  replies: Reply[];
  notifications: Notification[];
}

export interface Token {
  id: string;
  name: string;
  ticker: string;
  image: string;
  creator: User;
  marketCap: number;
  replies: number;
  description: string;
  isFeatured?: boolean;
}

export interface Reply {
  id: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'mention' | 'reply';
  from: User;
  timestamp: Date;
}

export interface Action {
  user: User;
  action: string;
  token: Token;
  amount: number;
  timestamp: Date;
}