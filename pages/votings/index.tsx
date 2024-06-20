import { getVotingListViewProps } from "@/views/VotingsListView/getVotingsListViewProps";
import { VotingListView } from "@/views/VotingsListView/VotingsListView";

export default VotingListView;

export const getServerSideProps = getVotingListViewProps;
