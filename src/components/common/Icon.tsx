import React from "react";
import {
  FileJson,
  Smartphone,
  ShieldCheck,
  Binary,
  Wrench,
  Code2,
  KeyRound,
  Link2,
  Hash,
  Clock,
  Search,
  Palette,
  CalendarClock,
  Database,
  Box,
  Package,
  Terminal,
  ArrowRight,
  Copy,
  Check,
  Sun,
  Moon,
  Zap,
  Shield,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Filter,
  CheckCircle2,
  X,
  Menu,
  LucideProps,
} from "lucide-react";

export type IconName =
  | "FileJson"
  | "Smartphone"
  | "ShieldCheck"
  | "Binary"
  | "Wrench"
  | "Code2"
  | "KeyRound"
  | "Link2"
  | "Hash"
  | "Clock"
  | "Search"
  | "Palette"
  | "CalendarClock"
  | "Database"
  | "Box"
  | "Package"
  | "Terminal"
  | "ArrowRight"
  | "Copy"
  | "Check"
  | "Sun"
  | "Moon"
  | "Zap"
  | "Shield"
  | "Cpu"
  | "Layers"
  | "Sparkles"
  | "ExternalLink"
  | "ChevronRight"
  | "BookOpen"
  | "Filter"
  | "CheckCircle2"
  | "X"
  | "Menu"
  | "Code";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  FileJson,
  Smartphone,
  ShieldCheck,
  Binary,
  Wrench,
  Code2,
  KeyRound,
  Link2,
  Hash,
  Clock,
  Search,
  Palette,
  CalendarClock,
  Database,
  Box,
  Package,
  Terminal,
  ArrowRight,
  Copy,
  Check,
  Sun,
  Moon,
  Zap,
  Shield,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Filter,
  CheckCircle2,
  X,
  Menu,
  Code: Code2,
};

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const Component = ICON_MAP[name] || Wrench;
  return <Component {...props} />;
}
