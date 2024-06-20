import { NoDataMessage } from "@/components/NoDataMessage";
import { useTranslations } from "next-intl";
import React from "react";

interface VoutTabProps {
  vouts: { amount: number; pkh: string }[];
}

export const VoutTab = (props: VoutTabProps) => {
  const { vouts } = props;

  const t = useTranslations();

  if (vouts.length === 0) {
    return (
      <div className="py-5 flex flex-col gap-5">
        <NoDataMessage>{t("no-data")}</NoDataMessage>
      </div>
    );
  }

  return (
    <div className="py-5 flex flex-col gap-5">
      {vouts.map((vout, idx) => (
        <div
          key={idx}
          className="bg-light-gray p-8 rounded-lg flex relative flex-col gap-3 overflow-hidden"
        >
          <div className="absolute -right-3 -bottom-3 lg:-top-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-12 h-1/2 lg:h-full min-h-[100px]"
              viewBox="0 0 26.995 24"
            >
              <path
                id="file-signature-solid"
                d="M3,0A3,3,0,0,0,0,3V21a3,3,0,0,0,3,3H15a3,3,0,0,0,3-3v-.9a2.836,2.836,0,0,1-.384.127l-2.817.7a2.628,2.628,0,0,1-.422.066A1.149,1.149,0,0,1,14.25,21h-3a.746.746,0,0,1-.67-.413l-.413-.83a.461.461,0,0,0-.412-.258.456.456,0,0,0-.413.258l-.413.83a.749.749,0,0,1-1.387-.117L6.75,17.859,6.291,19.4A2.252,2.252,0,0,1,4.134,21H3.75a.75.75,0,0,1,0-1.5h.384a.744.744,0,0,0,.717-.534l.7-2.32a1.252,1.252,0,0,1,2.4,0l.544,1.809a1.964,1.964,0,0,1,3.014.633l.206.412h.417a2.28,2.28,0,0,1-.066-1.3l.7-2.817a2.977,2.977,0,0,1,.787-1.392L18,9.544V7.5H12A1.5,1.5,0,0,1,10.5,6V0Zm9,0V6h6ZM25.772,6.548a1.879,1.879,0,0,0-2.653,0L21.741,7.927l3.328,3.328,1.378-1.378a1.879,1.879,0,0,0,0-2.653l-.675-.675Zm-11.152,8.5a1.484,1.484,0,0,0-.394.7l-.7,2.817a.749.749,0,0,0,.909.909l2.817-.7a1.507,1.507,0,0,0,.7-.394L24,12.314,20.677,8.986Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            {/* <span className="text-2xl text-dark break-all">{title}</span> */}
            <div className="flex flex-col">
              <span className="text-dark/50 text-sm  font-medium">
                {t("public-key-hash")}
              </span>
              <span className="text-dark text-base font-medium break-all">
                {vout.pkh}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-dark/50 text-sm  font-medium">
                {t("amount")}
              </span>
              <span className="text-dark text-base font-medium break-all">
                {vout.amount}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
