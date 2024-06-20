import { useRouter } from "next/router";
import { ReactNode } from "react";
import clsx from "clsx";
import { CustomPagination } from "./Pagination";
import { Spinner } from "./Spinner";
import { NoDataMessage } from "./NoDataMessage";
import { useTranslations } from "next-intl";

type TableProps<Accessor extends string> = {
  title?: string;
  action?: ReactNode | undefined;
  itemsPerPage?: number;
  totalCount?: number;
  wrapperClassName?: string;
  tableClassName?: string;
  emptyMessage: string;
  isLoading?: boolean;
  show?: boolean;
  showPagination?: boolean;
  columns: { name: string; accessor: Exclude<Accessor, "href"> }[];
  items: ({ [K in Accessor]: string | number | ReactNode } & {
    href?: string;
  })[];
};

export const Table = <Accessor extends string>(props: TableProps<Accessor>) => {
  const {
    columns,
    items,
    action,
    title,
    totalCount,
    itemsPerPage = 10,
    emptyMessage,
    wrapperClassName,
    tableClassName,
    show = true,
    isLoading = false,
    showPagination = true
  } = props;
  const t = useTranslations();

  const router = useRouter();

  if (!show) return null;

  return (
    <div className={clsx("my-10", wrapperClassName)}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl mb-3 font-medium">{title}</h3>
        {items.length > 0 && <div className="hidden md:block">{action}</div>}
      </div>

      {items.length > 0 ? (
        <div className="overflow-auto relative ">
          {isLoading && (
            <div className="absolute inset-0 bg-light-gray/60 rounded-lg  z-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Spinner size={80} />
              </div>
            </div>
          )}
          <table
            className={clsx(
              "w-full border-separate border-spacing-y-2 min-w-[1100px]",
              tableClassName
            )}
          >
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th
                    className="text-left text-dark/50  text-sm font-semibold px-3"
                    key={idx}
                  >
                    {t(col.name)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const { href, ...rest } = item;

                return (
                  <tr
                    key={idx}
                    className={clsx(
                      "bg-light-gray transition",
                      href && "cursor-pointer hover:bg-dark/10"
                    )}
                    onClick={() => href && router.push(href)}
                  >
                    {Object.values(rest).map((property, index) => (
                      <td
                        key={index}
                        className="h-[48px] align-middle font-medium text-dark text-sm whitespace-nowrap px-3"
                      >
                        {property as string}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataMessage>{emptyMessage}</NoDataMessage>
      )}

      {items.length > 0 && <div className="mt-5 md:hidden">{action}</div>}

      {Boolean(totalCount) && showPagination && (
        <CustomPagination
          itemsPerPage={itemsPerPage}
          totalCount={totalCount!}
        />
      )}

      <style jsx>{`
        tr td:first-child {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        tr td:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      `}</style>
    </div>
  );
};
