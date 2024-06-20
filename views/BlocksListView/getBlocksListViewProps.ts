import { GetServerSideProps } from "next";
import { BlocksListViewProps } from "./BlocksListView";
import { getBlocksListData } from "./dataFetchers";

export const getBlocksListViewProps: GetServerSideProps<
  BlocksListViewProps
> = async context => {
  const { latest10Blocks, totalCount } = await getBlocksListData();

  return {
    props: {
      totalCount,
      blocks: latest10Blocks,
      messages: (await import(`../../lang/${context.locale}.json`)).default
    }
  };
};
