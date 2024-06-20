import { NAV_LINKS } from "@/constants";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const MobileMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const t = useTranslations();

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [router.asPath]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex focus:ring-1 ring-white outline-none shrink-0 flex-col gap-[6px] w-[40px] p-2 rounded-md "
      >
        <span className="h-[2px] rounded-md bg-white w-full" />
        <span className="h-[2px] rounded-md bg-white w-full" />
        <span className="h-[2px] rounded-md bg-white w-full" />
      </button>

      <div
        style={{ maxHeight: open ? "250px" : "0px" }}
        className={
          "transition-all duration-300 overflow-hidden  fixed top-[80px] left-0 right-0 bg-dark "
        }
      >
        <nav className="flex flex-col gap-5 py-5">
          {NAV_LINKS.map(({ href, label }, idx) => {
            const isActive = router.pathname === href;

            return (
              <Link
                key={idx}
                className={clsx(
                  "transition text-base relative text-light-gray",
                  isActive ? "opacity-100" : "opacity-50"
                )}
                href={href}
              >
                <span className="text-center w-full block">{t(label)}</span>

                <div
                  className={clsx(
                    "absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full mt-2 w-1 h-1 shrink-0 bg-white transition",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
