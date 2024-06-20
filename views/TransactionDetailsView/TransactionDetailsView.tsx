import { Layout } from "@/components/Layout";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { MetaTab } from "./components/MetaTab";
import { OverviewTab } from "./components/OverviewTab";
import { TransactionDetailsTabList } from "./components/TransactionDetailsTabList";
import { VinTab } from "./components/VinTab";
import { VoutTab } from "./components/VoutTab";

export interface TransactionDetailsViewProps {
  params: ParsedUrlQuery | undefined;
  overviewTabProps: React.ComponentProps<typeof OverviewTab>;
  vinTabProps: React.ComponentProps<typeof VinTab>;
  voutTabProps: React.ComponentProps<typeof VoutTab>;
  metaTabProps: React.ComponentProps<typeof MetaTab>;
}

export const TransactionDetailsView = (props: TransactionDetailsViewProps) => {
  const { params, vinTabProps, voutTabProps, overviewTabProps, metaTabProps } =
    props;
  const t = useTranslations();

  return (
    <Layout>
      <div className="content pt-12">
        <h1 className="font-semibold text-2xl mb-5 break-all">
          {t("transaction")} #{params?.id}
        </h1>
        <Tab.Group>
          <TransactionDetailsTabList />
          <Tab.Panels>
            <Tab.Panel>
              <OverviewTab {...overviewTabProps} />
            </Tab.Panel>
            <Tab.Panel>
              <VinTab {...vinTabProps} />
            </Tab.Panel>
            <Tab.Panel>
              <VoutTab {...voutTabProps} />
            </Tab.Panel>
            <Tab.Panel>
              <MetaTab {...metaTabProps} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  );
};
