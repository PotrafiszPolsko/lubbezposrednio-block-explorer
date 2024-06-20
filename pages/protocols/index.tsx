import { getProtocolsListViewProps } from "@/views/ProtocolsListView/getProtocolsListViewProps";
import { ProtocolsListView } from "@/views/ProtocolsListView/ProtocolsListView";

export default ProtocolsListView;

export const getServerSideProps = getProtocolsListViewProps;
