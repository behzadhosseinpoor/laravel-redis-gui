import Connections from "../components/inc/connections";
import { FC, ReactNode } from "react";
import Details from "../components/inc/details";
import SiteLoading from "../components/loadings/siteLoading";
import { useRedisContext } from "../contexts/redis";

interface Props {
  loading: boolean;
  children: ReactNode;
}

const Layout: FC<Props> = ({ loading, children }) => {
  const { path, details } = useRedisContext();

  return (
    <div className="p-4 flex flex-col items-center h-screen w-screen">
      <div className="lg:inline-flex items-center justify-between w-full mb-4">
        <div className="mb-2 lg:mb-0">
          <div className=" text-center lg:text-left lg:inline-flex items-center justify-center lg:justify-start">
            {path && (
              <img
                src={"/vendor/" + path + "/logo.png"}
                className="w-10 mr-4"
              />
            )}

            <Connections />
          </div>

          {details?.prefix && (
            <div className="text-xs text-center lg:text-start">
              <span className="text-gray-600 mr-2">Prefix:</span>

              <span className="text-gray-400">{details?.prefix}</span>
            </div>
          )}
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

