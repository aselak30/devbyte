import React from "react";
import Link from "next/link";
import { Tool } from "@/types/tool";
import { Icon } from "@/components/common/Icon";
import { Badge } from "@/components/common/Badge";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
  className?: string;
}

export function ToolCard({ tool, featured = false, className }: ToolCardProps) {
  // Category-based subtle tint
  const categoryAccents: Record<string, { iconBg: string; text: string; ring: string }> = {
    "flutter-dart": {
      iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20",
      text: "text-blue-600 dark:text-blue-400",
      ring: "group-hover:border-blue-500/40",
    },
    "json-data": {
      iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500/20",
      text: "text-violet-600 dark:text-violet-400",
      ring: "group-hover:border-violet-500/40",
    },
    "security-tokens": {
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-400",
      ring: "group-hover:border-emerald-500/40",
    },
    "encoders-decoders": {
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/20",
      text: "text-amber-600 dark:text-amber-400",
      ring: "group-hover:border-amber-500/40",
    },
    utilities: {
      iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500/20",
      text: "text-indigo-600 dark:text-indigo-400",
      ring: "group-hover:border-indigo-500/40",
    },
    formatters: {
      iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20",
      text: "text-purple-600 dark:text-purple-400",
      ring: "group-hover:border-purple-500/40",
    },
  };

  const accent = categoryAccents[tool.category] || categoryAccents.utilities;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl p-5 border bg-white dark:bg-slate-900/90 transition-all duration-200",
        "border-slate-200/80 dark:border-slate-800 hover:shadow-lg hover:-translate-y-0.5",
        accent.ring,
        featured ? "ring-1 ring-indigo-500/20" : "",
        className
      )}
    >
      <div>
        {/* Header row: Icon & Status Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0",
              accent.iconBg
            )}
          >
            <Icon name={tool.iconName} className="w-5 h-5" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 justify-end">
            {tool.popular && (
              <Badge variant="indigo" size="sm">
                Popular
              </Badge>
            )}
            {tool.isNew && (
              <Badge variant="emerald" size="sm">
                New
              </Badge>
            )}
            {tool.offlineReady && (
              <span
                className="hidden sm:inline-flex items-center text-[10px] font-medium text-slate-500 dark:text-slate-400 gap-1 bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded"
                title="Runs 100% in your browser. Zero server transfer."
              >
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Local
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
          {tool.name}
        </h3>

        {/* Short Description */}
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      {/* Footer row: Category tag & Action Arrow */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-500 dark:text-slate-400">
          {tool.categoryLabel}
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
          Open Tool
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
