import {
  NextButton,
  PageButton,
  Pagination,
  PrevButton
} from "react-headless-pagination";
import { Icon } from "./Icon";
import useBreakpoint from "use-breakpoint";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { BREAKPOINTS } from "@/constants";

type CustomPaginationProps = {
  itemsPerPage: number;
  totalCount: number;
};

export const CustomPagination = (props: CustomPaginationProps) => {
  const { itemsPerPage, totalCount } = props;

  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (router.query?.page) {
      const page = Array.isArray(router.query.page)
        ? 1
        : parseInt(router.query.page ?? "1");

      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
  }, [router.query]);

  useEffect(() => {
    if (currentPage === 1 && router.query?.page) {
      delete router.query.page;
      router.replace(
        {
          query: router.query
        },
        undefined,
        { scroll: false }
      );
    } else if (currentPage > 1) {
      router.replace(
        {
          query: { ...router.query, page: currentPage }
        },
        undefined,
        { scroll: false }
      );
    }
  }, [currentPage]);

  if (Math.ceil(totalCount! / itemsPerPage) === 1) return null;

  const totalPages = Math.ceil(totalCount! / itemsPerPage);

  return (
    <Pagination
      className="flex items-center max-w-screen  h-10 text-sm select-none list-none mt-10 lg:mt-16 w-fit mx-auto"
      currentPage={currentPage - 1}
      edgePageCount={breakpoint === "mobile" ? 1 : 2}
      middlePagesSiblingCount={breakpoint === "mobile" ? 0 : 1}
      setCurrentPage={page => setCurrentPage(page + 1)}
      totalPages={totalPages}
      truncableClassName="w-10 px-0.5 text-center"
      truncableText="..."
    >
      <PrevButton className="flex items-center text-dark hover:text-dark/75 focus:outline-none mr-2 lg:mr-7">
        <Icon name="arrowLeft" className="h-[30px] w-[30px]" />
      </PrevButton>
      <div
        className={clsx(
          "flex items-center justify-center flex-grow text-base font-semibold",
          totalPages > 100 && breakpoint !== "mobile" ? "gap-2" : "gap-0"
        )}
      >
        <PageButton
          activeClassName="bg-blue p-0 rounded-md text-white "
          className="flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"
          inactiveClassName="text-dark"
        />
      </div>
      <NextButton className="flex items-center text-dark hover:text-dark/75 focus:outline-none ml-2 lg:ml-7">
        <Icon name="arrowRight" className="h-[30px] w-[30px]" />
      </NextButton>
    </Pagination>
  );
};
