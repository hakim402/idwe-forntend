// components/shared/index.ts
//
// Barrel export — import any shared component from "@/components/shared"
//
// Usage:
//   import { StatsRow, ValuesSection, Timeline, TeamSection, PageCTA, SectionHeader } from "@/components/shared";

export { StatsRow }       from "./StatsRow";
export type { StatItem }  from "./StatsRow";

export { ValuesSection }  from "./ValuesSection";
export type { ValueItem } from "./ValuesSection";

export { Timeline }           from "./Timeline";
export type { TimelineItem }  from "./Timeline";

export { TeamSection }            from "./TeamSection";
export type { TeamMember, TeamMemberSocial } from "./TeamSection";

export { PageCTA }        from "./PageCTA";

export { SectionHeader }  from "./SectionHeader";