import { Table } from "@/components/Table";
import { Block } from "@/types";
import { isBlock } from "@/utils";
import { useTranslations } from "next-intl";
import React from "react";
import { HOME_VIEW_BLOCKS_COLUMNS } from "../constants";
import { SearchResult } from "../types";
import { ActionButton } from "./ActionButton";

interface HomeViewBlocksTableProps {
  searchResult: SearchResult;
  last5Blocks: Block[];
  isSearch: boolean;
}

export const HomeViewBlocksTable: React.FC<HomeViewBlocksTableProps> = ({
  searchResult,
  last5Blocks,
  isSearch
}) => {
  const t = useTranslations();

  const isBlockSearchResult = !!searchResult && isBlock(searchResult);

  return (
    <Table
      title={isBlockSearchResult ? "" : t("most-recent-blocks")}
      emptyMessage={t("no-blocks")}
      tableClassName="min-w-[400px]"
      show={isBlockSearchResult || !isSearch}
      action={<ActionButton href="/blocks" />}
      columns={HOME_VIEW_BLOCKS_COLUMNS}
      items={
        isBlockSearchResult
          ? [
              {
                ...searchResult,
                href: `/blocks/${searchResult.id}`
              }
            ]
          : last5Blocks.map(block => ({
              ...block,
              href: `/blocks/${block.id}`
            }))
      }
    />
  );
};
