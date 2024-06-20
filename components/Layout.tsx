import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/constants";
import { MobileMenu } from "./MobileMenu";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  const router = useRouter();

  const t = useTranslations();

  return (
    <>
      <header className="bg-dark text-white h-[80px]  fixed left-0 right-0 top-0 z-20">
        <div className="content h-full flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link href={"/"}>
              <img className="" src={"/ABLogo.svg"} />
              {/* <span className="text-4xl">
                <span className="font-semibold ">Block</span>
                <span className="font-light ">Explorer</span>
              </span> */}
            </Link>

            <div className="text-xs flex gap-2">
              <Link locale="pl" href={router.asPath}>
                PL
              </Link>
              <Link locale="en" href={router.asPath}>
                EN
              </Link>
            </div>
          </div>
          <MobileMenu />

          <nav className="hidden lg:flex gap-24 mt-3 lg:mt-0">
            {NAV_LINKS.map(({ href, label }, idx) => {
              const isActive = router.pathname === href;

              return (
                <Link
                  key={idx}
                  className={clsx(
                    "transition text-base relative hover:opacity-80",
                    isActive ? "opacity-100" : "opacity-50"
                  )}
                  href={href}
                >
                  {t(label)}

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

          <div className="h-[1px] absolute bottom-0 left-0 right-0 bg-light-gray/20" />
        </div>
      </header>

      <main className="mt-[80px] overflow-hidden z-10 relative pb-5">
        {children}
      </main>
      <img
        className="pointer-events-none select-none fixed bottom-0 left-0 right-0"
        src={"/BG.svg"}
      />
    </>
  );
};
