export const BADGE_TYPES = {
  0: "shielded",
  1: "opened",
  2: "generate",
  3: "miner-authorization",
  4: "organizer-authorization",
  5: "issuer-authorization",
  6: "voter-authorization",
  7: "voting-creation",
  8: "coin-join",
  9: "external-voting-protocol",
  10: "hash-personal-data"
};

export const NAV_LINKS = [
  {
    label: "dashboard",
    href: "/"
  },
  {
    label: "blocks",
    href: "/blocks"
  },
  {
    label: "transactions",
    href: "/transactions"
  },
  {
    label: "votings",
    href: "/votings"
  },
  {
    label: "protocols",
    href: "/protocols"
  }
];

export const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export const SEARCH_BOX_DROPDOWN_ITEMS = [
  { name: "blocks", value: "blocks" },
  { name: "transactions", value: "transactions" },
  { name: "votings", value: "votings" }
];
