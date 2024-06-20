export const icons = {
  users: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>`,
  search: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path><path d="M21 21l-6 -6"></path>`,
  caretDown: ` <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 10l6 6l6 -6h-12"></path>`,
  x: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path>`,
  arrowRight: ` <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l14 0"></path><path d="M15 16l4 -4"></path><path d="M15 8l4 4"></path>`,
  arrowLeft: `<path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l14 0"></path><path d="M5 12l4 4"></path><path d="M5 12l4 -4"></path>`,
};

export type icon = keyof typeof icons;

type IconProps = {
  strokeWidth?: number;
  className?: string;
  fill?: boolean;
  name: icon;
};

export const Icon = (props: IconProps) => {
  const { className, fill = false, strokeWidth = 2, name } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      className={`w-[24px] h-[24px] ${className}`}
      stroke="currentColor"
      fill={fill ? "currentColor" : "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: icons[name] ?? "" }}
    ></svg>
  );
};
