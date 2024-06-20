import { VotingTypeBadge } from "@/components/VotingTypeBadge";
import { BADGE_TYPES } from "@/constants";
import { useTranslations } from "next-intl";
import React from "react";

interface OverviewTabProps {
  txid: string;
  blockId: string;
  blockTimestamp: string;
  transactionType: string;
  vinAmount: number;
  voutAmount: number;
}

export const OverviewTab = (props: OverviewTabProps) => {
  const t = useTranslations();

  const items = [
    { label: "transaction-id", value: props.txid },
    {
      label: "transaction-type",
      value: (
        <VotingTypeBadge
          type={Number(props.transactionType) as keyof typeof BADGE_TYPES}
        />
      )
    },
    { label: "transaction-timestamp", value: props.blockTimestamp },
    {
      label: "vin-amount",
      value: props.vinAmount
    },
    { label: "vout-amount", value: props.voutAmount },
    { label: "block-id", value: props.blockId }
  ];

  return (
    <div>
      <table className="w-full">
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="text-sm">
              <td className="py-[25px] min-w-[150px] w-1/3 text-left border-b-[1px] font-medium border-light-gray">
                {t(item.label)}
              </td>
              <td className="border-b-[1px] border-light-gray font-bold break-all">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
