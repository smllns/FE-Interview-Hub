// types for notion, forms and navigation

import z from 'zod';
import {
  loginSchema,
  resetPassSchema,
  resetSchema,
  signupSchema,
} from './authSchemas';

// notion + question
export type NotionQueryBody = {
  page_size: number;
  start_cursor?: string;
  filter?: {
    property: string;
    select: {
      equals: string;
    };
  };
};

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

//forms
export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
export type ResetForm = z.infer<typeof resetSchema>;
export type ChangeForm = z.infer<typeof resetPassSchema>;
export type ResetPassForm = z.infer<typeof resetPassSchema>;

export interface UseAuthFormsProps {
  initialMode?: 'login' | 'signup' | 'reset';
  open?: boolean;
  setOpen?: (open: boolean) => void;
  setSuccess?: (success: boolean) => void;
}

//navigation
export interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
  toggleRef?: React.RefObject<HTMLDivElement | null>;
}

export interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  toggleRef?: React.RefObject<HTMLDivElement | null>;
}

export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

export interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

export interface NavbarLogoProps {
  visible?: boolean;
}
