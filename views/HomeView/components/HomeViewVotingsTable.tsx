import { Table } from "@/components/Table";
import { VotingTypeBadge } from "@/components/VotingTypeBadge";
import { BADGE_TYPES } from "@/constants";
import { Voting } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";
import { HOME_VIEW_VOTINGS_COLUMNS } from "../constants";
import { SearchResult } from "../types";
import { ActionButton } from "./ActionButton";

interface HomeViewVotingsTableProps {
  searchResult: SearchResult;
  last5Votings: Voting[];
  searchError: boolean;
  isSearchLoading: boolean;
  isSearch: boolean;
}

export const HomeViewVotingsTable: React.FC<HomeViewVotingsTableProps> = ({
  searchResult,
  last5Votings,
  searchError,
  isSearchLoading,
  isSearch
}) => {
  const t = useTranslations();

  const isVotingSearchResult = !!searchResult && "votings" in searchResult;

  return (
    <Table
      emptyMessage={t("no-votings")}
      title={isVotingSearchResult ? "" : t("most-recent-votings")}
      show={
        isVotingSearchResult || (!isSearch && !searchError && !isSearchLoading)
      }
      tableClassName="min-w-[1350px]"
      isLoading={isVotingSearchResult && isSearchLoading}
      action={<ActionButton href="/votings" />}
      columns={HOME_VIEW_VOTINGS_COLUMNS}
      items={
        isVotingSearchResult
          ? searchResult.votings.map(voting => ({
              ...voting,
              type: (
                <VotingTypeBadge
                  type={voting.type as keyof typeof BADGE_TYPES}
                />
              ),
              turnout: `${voting.turnout}%`
            }))
          : last5Votings.map(voting => ({
              ...voting,
              type: (
                <VotingTypeBadge
                  type={voting.type as keyof typeof BADGE_TYPES}
                />
              ),
              turnout: `${voting.turnout}%`
            }))
      }
    />
  );
};
