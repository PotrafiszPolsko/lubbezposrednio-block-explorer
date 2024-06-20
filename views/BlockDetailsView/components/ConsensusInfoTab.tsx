import { SearchBox } from "@/components/SearchBox";
import { CheckToSlot } from "@/public/SvgIcons";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ItemBadge } from "@/components/ItemBadge";
import { Spinner } from "@/components/Spinner";
import { CustomPagination } from "@/components/Pagination";
import { SignatureItem } from "./SignatureItem";
import { useConsensusTabPaginatedData } from "../hooks";

type ConsensusInfoTabProps = {
  signaturesAmount: number;
  minersAmount: number;
  signaturesPercentage: number;
  signaturesAndPublicKeys: {
    publicKey: string;
    signature: string;
  }[];
  blockId: string;
};

export const ConsensusInfoTab = (props: ConsensusInfoTabProps) => {
  const {
    minersAmount,
    signaturesAmount,
    signaturesPercentage,
    signaturesAndPublicKeys,
    blockId
  } = props;

  const [signaturesData, setSignaturesData] = useState(signaturesAndPublicKeys);

  const t = useTranslations();

  const isTableDataLoading = useConsensusTabPaginatedData(
    blockId,
    setSignaturesData
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        <ItemBadge
          bgColor="#3981E6"
          color="#3981E6"
          icon={<CheckToSlot />}
          label={t("total-number-of-signatures")}
          value={signaturesAmount.toString()}
        />
        <ItemBadge
          bgColor="#3981E6"
          color="#3981E6"
          icon={<CheckToSlot />}
          label={t("number-of-miners")}
          value={minersAmount.toString()}
        />
        <ItemBadge
          bgColor="#3981E6"
          color="#3981E6"
          icon={<CheckToSlot />}
          label={t("signature-percentage")}
          value={`${signaturesPercentage} %`}
        />
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <h3 className="text-2xl font-medium">{t("list-of-signatures")}</h3>
        <SearchBox
          className="shadow-none !border-gray"
          isLoading={isTableDataLoading}
        />

        <div className="relative">
          {isTableDataLoading && (
            <div className="absolute inset-0 bg-light-gray/60 rounded-lg  z-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Spinner size={80} />
              </div>
            </div>
          )}
          {signaturesData.map((s, idx) => (
            <SignatureItem
              key={idx}
              title="---"
              publicKey={s.publicKey}
              signature={s.signature}
            />
          ))}
        </div>
      </div>
      <CustomPagination itemsPerPage={5} totalCount={signaturesAmount} />
    </>
  );
};
