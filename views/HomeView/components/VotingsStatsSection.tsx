import { ItemBadge } from "@/components/ItemBadge";
import { formatNumber } from "@/utils";
import { useTranslations } from "next-intl";
import React from "react";
import { VOTING_STATS_ARRAY } from "../constants";
import { SearchResult, VotingStats } from "../types";

interface VotingsStatsSectionProps {
  votingStats: VotingStats;
}

export const VotingsStatsSection: React.FC<VotingsStatsSectionProps> = ({
  votingStats
}) => {
  const t = useTranslations();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {VOTING_STATS_ARRAY.map((item, idx) => (
        <ItemBadge
          key={idx}
          bgColor={item.color}
          color={item.color}
          icon={item.icon}
          label={t(item.label)}
          value={formatNumber(
            votingStats[item.value as keyof typeof votingStats] as number
          ).toString()}
        />
      ))}
    </div>
  );
};
