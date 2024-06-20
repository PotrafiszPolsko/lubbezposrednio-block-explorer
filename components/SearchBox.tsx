import clsx from "clsx";
import { Icon } from "./Icon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "./Spinner";
import { useTranslations } from "next-intl";

type SearchBoxProps = {
  className?: string;
  isLoading?: boolean;
  clearUrlParamsOnChange?: boolean;
};

export const SearchBox = (props: SearchBoxProps) => {
  const {
    className,
    isLoading = false,
    clearUrlParamsOnChange = false
  } = props;

  const [value, setValue] = useState("");

  const router = useRouter();

  const t = useTranslations();

  const clearValue = () => {
    setValue("");
    if (clearUrlParamsOnChange) {
      router.replace({});
      return;
    }

    delete router.query.query;
    router.replace(
      {
        query: { ...router.query }
      },
      undefined,
      { scroll: false }
    );
  };

  useEffect(() => {
    setValue((router.query.query as string) ?? "");
  }, [router.query?.query]);

  return (
    <div
      className={clsx(
        "border border-light-gray flex bg-white rounded-lg shadow-md z-10",
        className
      )}
    >
      <div className="relative flex-1">
        <Icon
          name="search"
          className="w-[16px] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />

        {value !== "" && !isLoading && (
          <button
            onClick={clearValue}
            className="rounded-full w-[20px] p-[5px] h-[20px] flex items-center justify-center bg-dark
             absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Icon name="x" strokeWidth={3} className="w-[12px] text-white" />
          </button>
        )}

        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner width={6} />
          </div>
        )}

        <input
          onKeyUp={e => {
            if (e.key === "Enter") {
              if (clearUrlParamsOnChange) {
                router.replace(
                  {
                    query: { query: value }
                  },
                  undefined,
                  { scroll: false }
                );
              } else {
                router.replace(
                  {
                    query: { ...router.query, query: value }
                  },
                  undefined,
                  { scroll: false }
                );
              }
            }
          }}
          disabled={isLoading}
          value={value}
          onChange={e => {
            if (e.target.value === "") clearValue();
            setValue(e.target.value);
          }}
          placeholder={`${t("search")}...`}
          className="tracking-wider py-[14px] pl-12 pr-14 rounded-lg  w-full font-semibold placeholder-dark/50 text-sm  outline-none disabled:bg-[#E0E0E0]"
        />
      </div>
    </div>
  );
};
