import { Layout } from "@/components/Layout";
import { NoDataMessage } from "@/components/NoDataMessage";
import { SearchBox } from "@/components/SearchBox";
import { Table } from "@/components/Table";
import { Block } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BLOCKS_LIST_COLUMNS } from "./constants";
import {
  useBlocksListPaginatedData,
  useBlocksListSearchQueryFetcher
} from "./hooks";

export type BlocksListViewProps = {
  blocks: Block[];
  totalCount: number;
};

export const BlocksListView = (props: BlocksListViewProps) => {
  const { blocks, totalCount } = props;
  const [blocksData, setBlocksData] = useState(blocks);

  const t = useTranslations();

  const { isSearchLoading, searchResult, searchError } =
    useBlocksListSearchQueryFetcher();

  const isTableDataLoading = useBlocksListPaginatedData(setBlocksData);

  return (
    <Layout>
      <div className="content mt-9">
        <h3 className="text-3xl mb-4">{t("blocks")}</h3>
        <SearchBox
          isLoading={isSearchLoading}
          className="shadow-none !border-gray"
        />

        {searchError && (
          <NoDataMessage>
            {t("block-with-the-specified-id-was-not-found")}
          </NoDataMessage>
        )}

        <Table
          isLoading={isTableDataLoading}
          show={!searchError && !isSearchLoading}
          emptyMessage="Brak bloków."
          tableClassName="min-w-[400px]"
          wrapperClassName="!my-0"
          totalCount={searchResult?.id ? 1 : totalCount}
          items={
            searchResult?.id
              ? [{ ...searchResult, href: `/blocks/${searchResult.id}` }]
              : blocksData.map(block => ({
                  ...block,
                  href: `/blocks/${block.id}`
                }))
          }
          columns={BLOCKS_LIST_COLUMNS}
        />
      </div>
    </Layout>
  );
};
