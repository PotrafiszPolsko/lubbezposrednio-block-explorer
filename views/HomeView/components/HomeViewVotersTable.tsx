import { Table } from "@/components/Table";
import { AuthUser } from "@/types";
import { useTranslations } from "next-intl";
import React from "react";
import { HOME_VIEW_USER_COLUMNS } from "../constants";

interface HomeViewVotersTableProps {
  searchResult?: AuthUser;
  isSearch: boolean;
}

export const HomeViewVotersTable: React.FC<HomeViewVotersTableProps> = ({
  searchResult,
  isSearch
}) => {
  const t = useTranslations();

  const isSearchResult = !!searchResult;

  if (!isSearchResult) {
    return null;
  }

  return (
    <Table
      emptyMessage={t("no-blocks")}
      tableClassName="min-w-[400px]"
      show={isSearchResult || !isSearch}
      columns={HOME_VIEW_USER_COLUMNS}
      items={isSearchResult ? [searchResult] : []}
    />
  );
};
