import { Tutorial } from "@/types/tool";

export const TUTORIALS: Tutorial[] = [
  {
    id: "flutter-null-safety-json-guide",
    slug: "flutter-null-safety-json-serialization",
    title: "Mastering Dart Null Safety with JSON Serialization in Flutter",
    description: "Learn how to parse complex nested JSON payloads in modern Flutter without runtime TypeErrors or null-pointer crashes.",
    readTime: "6 min read",
    category: "Flutter & Dart",
    publishedAt: "Nov 2026",
    tags: ["Flutter", "Dart", "JSON", "Architecture"],
    featured: true,
  },
  {
    id: "jwt-security-best-practices",
    slug: "understanding-jwt-claims-and-signature-security",
    title: "Understanding JWT Claims, Signatures, and Client-Side Token Hygiene",
    description: "Why decoding a JWT does not equal verifying its signature, and how to avoid critical authentication pitfalls in SPAs and mobile apps.",
    readTime: "8 min read",
    category: "Security",
    publishedAt: "Nov 2026",
    tags: ["JWT", "Security", "OAuth", "APIs"],
    featured: true,
  },
  {
    id: "base64-unicode-guide",
    slug: "the-complete-guide-to-base64-in-modern-web-and-mobile",
    title: "The Developer Guide to Base64 & Unicode UTF-8 Pitfalls",
    description: "A deep dive into why window.btoa fails on emojis and multi-byte characters, and how to handle binary payloads reliably across platforms.",
    readTime: "5 min read",
    category: "Web Engineering",
    publishedAt: "Nov 2026",
    tags: ["Base64", "UTF-8", "Encoding", "JavaScript"],
    featured: false,
  },
];
