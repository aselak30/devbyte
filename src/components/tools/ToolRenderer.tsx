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

const RegexTester = dynamic(
  () =>
    import("@/features/regex-tester/RegexTester").then(
      (mod) => mod.RegexTester
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const ColorConverter = dynamic(
  () =>
    import("@/features/color-converter/ColorConverter").then(
      (mod) => mod.ColorConverter
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const CronGenerator = dynamic(
  () =>
    import("@/features/cron-generator/CronGenerator").then(
      (mod) => mod.CronGenerator
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const HtmlFormatter = dynamic(
  () =>
    import("@/features/formatters/HtmlFormatter").then(
      (mod) => mod.HtmlFormatter
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const SqlFormatter = dynamic(
  () =>
    import("@/features/formatters/SqlFormatter").then(
      (mod) => mod.SqlFormatter
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const JsonToFreezed = dynamic(
  () =>
    import("@/features/flutter-tools/JsonToFreezed").then(
      (mod) => mod.JsonToFreezed
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const PubspecHelper = dynamic(
  () =>
    import("@/features/flutter-tools/PubspecHelper").then(
      (mod) => mod.PubspecHelper
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const CssFormatter = dynamic(
  () =>
    import("@/features/formatters/CssFormatter").then(
      (mod) => mod.CssFormatter
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const XmlFormatter = dynamic(
  () =>
    import("@/features/formatters/XmlFormatter").then(
      (mod) => mod.XmlFormatter
    ),
  { ssr: false, loading: () => <ToolLoadingSkeleton /> }
);

const DartListFormatter = dynamic(
  () =>
    import("@/features/flutter-tools/DartListFormatter").then(
      (mod) => mod.DartListFormatter
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
    case "regex-tester":
      return <RegexTester />;
    case "color-converter":
      return <ColorConverter />;
    case "cron-generator":
      return <CronGenerator />;
    case "html-formatter":
      return <HtmlFormatter />;
    case "sql-formatter":
      return <SqlFormatter />;
    case "json-to-freezed":
      return <JsonToFreezed />;
    case "flutter-pubspec-helper":
      return <PubspecHelper />;
    case "css-formatter":
      return <CssFormatter />;
    case "xml-formatter":
      return <XmlFormatter />;
    case "dart-list-formatter":
      return <DartListFormatter />;
    default:
      return <JsonFormatter />;
  }
}
