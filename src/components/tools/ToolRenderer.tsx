"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Tool } from "@/types/tool";

const JsonFormatter = dynamic(
  () =>
    import("@/features/json-formatter/JsonFormatter").then(
      (mod) => mod.JsonFormatter
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const JsonToDart = dynamic(
  () =>
    import("@/features/json-to-dart/JsonToDart").then((mod) => mod.JsonToDart),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const JwtDecoder = dynamic(
  () =>
    import("@/features/jwt-decoder/JwtDecoder").then((mod) => mod.JwtDecoder),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const Base64Converter = dynamic(
  () =>
    import("@/features/base64/Base64Converter").then(
      (mod) => mod.Base64Converter
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const UrlEncoder = dynamic(
  () => import("@/features/url-encoder/UrlEncoder").then((mod) => mod.UrlEncoder),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const UuidGenerator = dynamic(
  () =>
    import("@/features/uuid-generator/UuidGenerator").then(
      (mod) => mod.UuidGenerator
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const TimestampConverter = dynamic(
  () =>
    import("@/features/timestamp-converter/TimestampConverter").then(
      (mod) => mod.TimestampConverter
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

function ToolLoadingSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center animate-pulse">
      <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded mx-auto mb-4" />
      <div className="h-64 bg-slate-100 dark:bg-slate-950 rounded-xl" />
    </div>
  );
}

interface ToolRendererProps {
  tool: Tool;
}

export function ToolRenderer({ tool }: ToolRendererProps) {
  switch (tool.slug) {
    case "json-formatter":
      return <JsonFormatter />;
    case "json-to-dart":
      return <JsonToDart />;
    case "jwt-decoder":
      return <JwtDecoder />;
    case "base64-converter":
      return <Base64Converter />;
    case "url-encoder":
      return <UrlEncoder />;
    case "uuid-generator":
      return <UuidGenerator />;
    case "timestamp-converter":
      return <TimestampConverter />;
    default:
      // For any future tools, fallback to JSON Formatter or generic utility
      return <JsonFormatter />;
  }
}
