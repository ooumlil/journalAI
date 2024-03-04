export interface User {
  id: string;
  clerkId: string;
  email: string;
}

export interface JournalEntry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
  analysis?: Analysis | null;
  content: string;
}

export interface Analyse {
  mood: string;
  subject: string;
  negative: boolean;
  summary: string;
  color: string;
  emoji: string;
  sentimentScore: number;
}

export interface Analysis {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  entryId: string;
  entry: JournalEntry;
  user: User;
  userId: string;
  mood: string;
  summary: string;
  subject: string;
  color: string;
  emoji: string;
  negative: boolean;
  sentimentScore: number;
}
