import { Layout } from "@/components/Layout";
import { NoDataMessage } from "@/components/NoDataMessage";
import { SearchBox } from "@/components/SearchBox";
import { Table } from "@/components/Table";
import { useProtocols } from "@/hooks/useProtocols";
import { useTranslations } from "next-intl";
import React from "react";
import { PROTOCOLS_LIST_COLUMNS } from "./constants";

interface ProtocolsListViewProps {}

export const ProtocolsListView: React.FC<ProtocolsListViewProps> = ({}) => {
  const t = useTranslations();
  const { protocols, isLoading } = useProtocols();

  return (
    <Layout>
      <div className="content mt-9">
        <h3 className="text-3xl mb-4">{t("protocols")}</h3>
        <SearchBox isLoading={isLoading} className="shadow-none !border-gray" />
        {!protocols.length && (
          <NoDataMessage>
            {t("protocol-with-the-specified-id-or-company-name-was-not-found")}
          </NoDataMessage>
        )}
        <Table
          isLoading={isLoading}
          show={!!protocols.length && !isLoading}
          emptyMessage={t("no-transactions")}
          tableClassName="min-w-[1400px]"
          wrapperClassName="!my-0"
          items={protocols}
          columns={PROTOCOLS_LIST_COLUMNS}
        />
      </div>
    </Layout>
  );
};
