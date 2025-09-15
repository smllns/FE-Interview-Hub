import z from 'zod';
import {
  loginSchema,
  resetPassSchema,
  resetSchema,
  signupSchema,
} from './authSchemas';

export interface NotionSelect {
  name: string;
}

export interface NotionRichText {
  plain_text: string;
}

export interface NotionProperty {
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  select?: NotionSelect | null;
}

export interface NotionPage {
  id: string;
  properties: {
    Question?: NotionProperty;
    Answer?: NotionProperty;
    Topic?: NotionProperty;
    Difficulty?: NotionProperty;
    Section?: NotionProperty;
    Lang?: NotionProperty;
    Example?: NotionProperty;
  };
}

export interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor?: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: string;
  section: string;
  lang: string;
  example: string | null;
}

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
export type ResetForm = z.infer<typeof resetSchema>;
export type ChangeForm = z.infer<typeof resetPassSchema>;
export type ResetPassForm = z.infer<typeof resetPassSchema>;
