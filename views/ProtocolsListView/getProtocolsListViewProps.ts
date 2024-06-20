import { GetServerSideProps } from "next";

export const getProtocolsListViewProps: GetServerSideProps = async context => {
  return {
    props: {
      messages: (await import(`../../lang/${context.locale}.json`)).default
    }
  };
};
