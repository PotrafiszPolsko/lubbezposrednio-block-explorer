import { SearchBox } from "@/components/SearchBox";
import { useTranslations } from "next-intl";
import React from "react";

interface HomeViewHeaderProps {
  isSearchLoading: boolean;
}

export const HomeViewHeader: React.FC<HomeViewHeaderProps> = ({
  isSearchLoading
}) => {
  const t = useTranslations();
  return (
    <div className="bg-dark ">
      <div className="content pt-7 pb-10 h-full relative ">
        <span className="text-lg font-light text-white">{t("welcome-to")}</span>
        <h1 className="text-white text-2xl mt-1">
          <span className="font-medium">ALPHA BLOCKCHAIN </span>
          <span className="font-light">EXPLORER</span>
        </h1>
        <SearchBox
          className="absolute left-5 bottom-0 right-5 translate-y-1/2"
          isLoading={isSearchLoading}
          clearUrlParamsOnChange
        />
      </div>
    </div>
  );
};
