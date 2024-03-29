import SiteLoading from "../../../components/loadings/siteLoading";
import { KeyTypes } from "../../../constants/redis";
import { useRedisContext } from "../../../contexts/redis";
import { ConvertSeconds } from "../../../utilities/helper";
import classNames from "classnames";
import { FC } from "react";

interface Props {
  loading: boolean;
}

const ListView: FC<Props> = ({ loading }) => {
  const { keys, actionDetails, handleChange } = useRedisContext();

  return (
    <>
      {!loading &&
        !!keys?.length &&
        keys.map(({ key, ttl, type }, i) => {
          const keyType = KeyTypes.find((item) => item.id === type);

          return (
            <div
              key={i}
              className={classNames(
                "flex items-center p-3 hover:bg-red-900 hover:bg-opacity-30 transition-all duration-300 cursor-pointer",
                actionDetails?.key === key
                  ? "bg-red-900 bg-opacity-30"
                  : i % 2 === 0
                  ? "bg-dark-500"
                  : ""
              )}
              onClick={() => {
                handleChange({
                  actionType: "showKey",
                  actionDetails: {
                    key,
                    ttl,
                    type,
                  },
                });
              }}
            >
              <div className="w-40">
                <div
                  className={classNames(
                    "px-2 rounded py-1.5 font-medium text-xs text-center mr-2 uppercase inline-block",
                    keyType?.color
                  )}
                >
                  {keyType?.title}
                </div>
              </div>

              <p className="w-full break-all">{key}</p>

              <div className="w-32 text-right">
                {ttl === -1 ? "No limit" : ConvertSeconds(ttl)}
              </div>
            </div>
          );
        })}

      {!loading && !keys?.length && (
        <div className="font-bold text-xl text-center py-8">
          No results found!
        </div>
      )}

      {!!loading && (
        <div className="text-center py-8">
          <SiteLoading size="5xl" color="red" />
        </div>
      )}
    </>
  );
};

export default ListView;

