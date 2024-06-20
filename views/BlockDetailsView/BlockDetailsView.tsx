import { Tab } from "@headlessui/react";
import { ParsedUrlQuery } from "querystring";
import { Layout } from "@/components/Layout";
import { HeaderTab } from "./components/HeaderTab";
import { ConsensusInfoTab } from "./components/ConsensusInfoTab";
import { TransactionsTab } from "./components/TransactionsTab";
import { BlockDetailsTabList } from "./components/BlockDetailsTabList";

export type BlockDetailsViewProps = {
  params: ParsedUrlQuery | undefined;
  blockDetails: React.ComponentProps<typeof HeaderTab>;

  consensusInfoTabProps: React.ComponentProps<typeof ConsensusInfoTab>;
  transactionsTabProps: React.ComponentProps<typeof TransactionsTab>;
};

export const BlockDetailsView = (props: BlockDetailsViewProps) => {
  const { params, blockDetails, consensusInfoTabProps, transactionsTabProps } =
    props;

  return (
    <Layout>
      <div className="content pt-12">
        <h1 className="font-semibold text-2xl mb-5 break-all">
          Block #{params?.id}
        </h1>
        <Tab.Group>
          <BlockDetailsTabList />

          <Tab.Panels>
            <Tab.Panel>
              <HeaderTab {...blockDetails} />
            </Tab.Panel>
            <Tab.Panel>
              <div className="pt-12">
                <ConsensusInfoTab {...consensusInfoTabProps} />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="pt-12">
                <TransactionsTab {...transactionsTabProps} />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  );
};
