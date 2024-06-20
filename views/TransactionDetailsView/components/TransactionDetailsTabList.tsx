import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";
import { TRANSACTION_DETAILS_TABS } from "../constants";

interface TransactionDetailsTabListProps {}

export const TransactionDetailsTabList: React.FC<
  TransactionDetailsTabListProps
> = ({}) => {
  const t = useTranslations();
  return (
    <>
      <Tab.List className="flex gap-10 w-full flex-nowrap overflow-auto lg:gap-20">
        {TRANSACTION_DETAILS_TABS.map((item, idx) => (
          <Tab className="outline-none relative pb-2 group" key={idx}>
            {({ selected }) => (
              <div>
                <span
                  className={clsx(
                    selected ? "text-blue" : "text-dark/50",
                    "font-medium text-xl whitespace-nowrap"
                  )}
                >
                  {t(item)}
                </span>

                <span
                  className={clsx(
                    "absolute bottom-0 left-0 w-full h-[4px] transition rounded-sm mt-1 group-hover:bg-dark/10",
                    selected && "!bg-blue"
                  )}
                />
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <div className="-translate-y-[3px] relative -z-10">
        <div className="h-[2px] bg-light-gray absolute !w-[100vw]  !right-[50%] !translate-x-[50%]" />
      </div>
    </>
  );
};
