import { BlocksListView } from "@/views/BlocksListView/BlocksListView";
import { getBlocksListViewProps } from "@/views/BlocksListView/getBlocksListViewProps";

export default BlocksListView;

export const getServerSideProps = getBlocksListViewProps;
