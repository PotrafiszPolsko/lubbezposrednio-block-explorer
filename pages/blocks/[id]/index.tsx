import { BlockDetailsView } from "@/views/BlockDetailsView/BlockDetailsView";
import { getBlockDetailsProps } from "@/views/BlockDetailsView/getBlockDetailsViewProps";

export default BlockDetailsView;

export const getServerSideProps = getBlockDetailsProps;
