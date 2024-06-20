import Head from "next/head";
import { Block, Transaction, Voting } from "@/types";
import { useTranslations } from "next-intl";
import { NoDataMessage } from "@/components/NoDataMessage";
import clsx from "clsx";
import { Layout } from "@/components/Layout";
import { useHomeViewSearchQueryFetcher } from "./hooks";
import { VotingStats } from "./types";
import { VotingsStatsSection } from "./components/VotingsStatsSection";
import { HomeViewBlocksTable } from "./components/HomeViewBlocksTable";
import { HomeViewTransactionsTable } from "./components/HomeViewTransactionsTable";
import { HomeViewVotingsTable } from "./components/HomeViewVotingsTable";
import { HomeViewHeader } from "./components/HomeViewHeader";
import { useRouter } from "next/router";
import { HomeViewVotersTable } from "./components/HomeViewVotersTable";

export type HomeViewProps = {
  votingStats: VotingStats;
  last5Blocks: Block[];
  last5Transactions: Transaction[];
  last5Votings: Voting[];
};

export const HomeView = (props: HomeViewProps) => {
  const { last5Transactions, last5Blocks, last5Votings, votingStats } = props;

  const t = useTranslations();
  const router = useRouter();

  const { isSearchLoading, searchResult, searchError } =
    useHomeViewSearchQueryFetcher();

  const isSerachResultNotEmpty =
    searchResult.blocksSearchResult ??
    searchResult.transactionsSearchResult ??
    searchResult.votingsSearchResult ??
    searchResult.usersSearchResult;

  const isSearch = !!router.query.query;

  return (
    <>
      <Head>
        <title>Block Explorer</title>
        <meta name="description" content="Ivoting Alpha Blockchain " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomeViewHeader isSearchLoading={isSearchLoading} />
        <div
          className={clsx("content", isSerachResultNotEmpty ? "pt-5" : "pt-24")}
        >
          {searchError && (
            <NoDataMessage>{t("no-search-results")} </NoDataMessage>
          )}
          {!searchError && !isSearchLoading && (
            <>
              {!isSerachResultNotEmpty && (
                <VotingsStatsSection votingStats={votingStats} />
              )}
              <HomeViewBlocksTable
                searchResult={searchResult.blocksSearchResult}
                last5Blocks={last5Blocks}
                isSearch={isSearch}
              />

              <HomeViewTransactionsTable
                searchResult={searchResult.transactionsSearchResult}
                last5Transactions={last5Transactions}
                isSearch={isSearch}
              />
            </>
          )}
          <HomeViewVotingsTable
            searchResult={searchResult.votingsSearchResult}
            last5Votings={last5Votings}
            searchError={searchError}
            isSearchLoading={isSearchLoading}
            isSearch={isSearch}
          />
          <HomeViewVotersTable
            searchResult={searchResult.usersSearchResult}
            isSearch={isSearch}
          />
          {/* {!!searchResult &&
            "totalCount" in searchResult &&
            selectedItem.value === "votings" && (
              <CustomPagination
                itemsPerPage={10}
                totalCount={searchResult.totalCount}
              />
            )} */}
        </div>
      </Layout>
    </>
  );
};
