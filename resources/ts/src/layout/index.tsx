import Connections from "../components/inc/connections";
import { FC, ReactNode } from "react";
import Details from "../components/inc/details";
import SiteLoading from "../components/loadings/siteLoading";

interface Props {
  loading: boolean;
  children: ReactNode;
}

const Layout: FC<Props> = ({ loading, children }) => {
  return (
    <div className="p-4 flex flex-col items-center h-screen w-screen">
      <div className="md:inline-flex items-center justify-between w-full mb-4">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          <Connections />
        </div>

        <Details />
      </div>

      {loading && (
        <div className="py-8 w-full h-full flex items-center justify-center">
          <SiteLoading size="6xl" color="red" />
        </div>
      )}

      {!loading && (
        <div className="h-full w-full overflow-hidden">{children}</div>
      )}
    </div>
  );
};

export default Layout;

