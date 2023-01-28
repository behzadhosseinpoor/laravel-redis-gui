import { useRedisContext } from "../contexts/redis";
import { useQueries } from "@tanstack/react-query";
import Common from "../utilities/common";
import classNames from "classnames";
import Layout from "../layout";
import List from "./lists";
import Action from "./action";

const Container = () => {
  const {
    refreshKeys,
    actionType,
    path,
    connection,
    query,
    type,
    handleChange,
  } = useRedisContext();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["redis", { connection }],
        queryFn: ({ queryKey }: any) =>
          Common.api.redis.Get({
            path,
            connection:
              typeof queryKey[1] !== "string"
                ? queryKey[1].connection
                : connection,
          }),
        enabled: !!connection,
        retry: false,
        refetchInterval: 10000,
        onSuccess: ({ data }: any) => {
          handleChange({
            details: data?.result || null,
          });
        },
      },
      {
        queryKey: ["keys", { connection, query, type, refreshKeys }],
        queryFn: ({ queryKey }: any) =>
          Common.api.redis.GetKeys({
            path,
            connection:
              typeof queryKey[1] !== "string"
                ? queryKey[1].connection
                : connection,
            type: typeof queryKey[1] !== "string" ? queryKey[1].type : type,
            query: typeof queryKey[1] !== "string" ? queryKey[1].query : query,
          }),
        enabled: !!connection,
        retry: false,
        refetchOnWindowFocus: false,
        onSuccess: ({ data }: any) => {
          handleChange({
            keys: data?.result || [],
            refreshKeys: false,
          });
        },
      },
    ],
  });

  return (
    <Layout loading={queries[0].isLoading}>
      <div className="grid lg:grid-cols-2 gap-4 h-full relative">
        <div
          className={classNames(
            "bg-dark-600 rounded h-full p-2 overflow-hidden",
            !actionType && "col-span-2"
          )}
        >
          <List loading={queries[1].isLoading} />
        </div>

        {actionType && (
          <div className="bg-dark-600 rounded p-2 overflow-hidden absolute lg:static w-full h-full">
            <Action />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Container;

