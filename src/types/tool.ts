export type ToolCategory =
  | "json-data"
  | "flutter-dart"
  | "security-tokens"
  | "encoders-decoders"
  | "utilities"
  | "formatters";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  isNew?: boolean;
  offlineReady?: boolean;
  keywords: string[];
  phase: 1 | 2 | 3;
  status: "available" | "coming_soon";
}

export interface CategoryMeta {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
}

export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  publishedAt: string;
  tags: string[];
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
