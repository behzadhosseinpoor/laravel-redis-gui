import { useRedisContext } from "../../contexts/redis";
import { MdClose } from "react-icons/md";
import Show from "./show";
import { useQuery } from "@tanstack/react-query";
import Common from "../../utilities/common";
import { useEffect } from "react";

const Action = () => {
  const { actionType, actionDetails, path, connection, handleChange } =
    useRedisContext();

  const { data, isLoading, refetch } = useQuery(
    ["getKeyDetails"],
    () =>
      Common.api.redis.GetKey({
        id: actionDetails?.key || "",
        connection: connection,
        path: path,
      }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    if (actionType !== "showKey") {
      return undefined;
    }

    refetch();
  }, [actionDetails]);

  return (
    <>
      {actionType === "addKey" && (
        <div className="text-end p-2">
          <MdClose
            className="text-xl cursor-pointer hover:text-red-400 transition-all duration-300"
            onClick={() =>
              handleChange({
                actionDetails: null,
                actionType: null,
              })
            }
          />
        </div>
      )}

      {actionType === "showKey" && (
        <Show
          loading={isLoading}
          data={
            data?.data.result || {
              data: "",
              key: "",
              ttl: 0,
              type: 0,
            }
          }
          refetch={refetch}
        />
      )}
    </>
  );
};

export default Action;

