import { useTranslations } from "next-intl";
import React from "react";
import { NoDataMessage } from "@/components/NoDataMessage";
import { formatMetaTabValue } from "../helpers";

interface MetaTabProps {
  items: { label: string; value: string | number }[];
}

export const MetaTab = (props: MetaTabProps) => {
  const { items } = props;

  const t = useTranslations();

  if (items.length === 0) {
    return (
      <div className="py-5 flex flex-col gap-5">
        <NoDataMessage>{t("no-data")}</NoDataMessage>
      </div>
    );
  }

  return (
    <div>
      <table className="w-full">
        <tbody>
          {items.map((item, idx) => {
            const translatedName = t(item.label) ?? item.label;

            return (
              <tr key={idx} className="text-sm">
                <td className="py-[25px] pr-5 min-w-[150px] w-1/3 text-left border-b-[1px] font-medium border-light-gray">
                  {translatedName}
                </td>
                <td className="border-b-[1px] border-light-gray font-bold break-all">
                  {formatMetaTabValue(item.label, item.value)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
