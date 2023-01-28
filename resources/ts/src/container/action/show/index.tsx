import classNames from "classnames";
import { KeyTypes } from "../../../constants/redis";
import { useRedisContext } from "../../../contexts/redis";
import Key from "./key";
import { MdClose } from "react-icons/md";
import { ActionIcon } from "@mantine/core";
import { FC } from "react";
import Serializers from "../../../components/inc/serializers";
import { BiRefresh, BiTrash } from "react-icons/bi";
import Ttl from "./ttl";
import SiteLoading from "../../../components/loadings/siteLoading";
import { useMutation } from "@tanstack/react-query";
import Common from "../../../utilities/common";

interface Props {
  loading: boolean;
  data: IKey & { data: any };
  status: "error" | "success" | "loading";
  refetch: Function;
}

const Show: FC<Props> = ({ loading, data, status, refetch }) => {
  const { connection, path, actionDetails, handleChange } = useRedisContext();

  const { mutate, isLoading } = useMutation(
    () =>
      Common.api.redis.Remove({
        connection,
        id: actionDetails?.key || "",
        path,
      }),
    {
      onSuccess: () => {
        handleChange({
          actionDetails: null,
          actionType: null,
          refreshKeys: true,
        });
      },
    }
  );

  const handleRefreshData = () => {
    refetch();
  };

  const handleRemoveItem = () => {
    mutate();
  };

  const Component = KeyTypes.find((item) => item.id === data.type)?.components
    .show;

  return (
    <>
      {loading && <SiteLoading />}

      {!loading && (
        <div className="flex flex-col items-center overflow-hidden h-full">
          <div className="border-0 border-b border-solid border-dark-400 mb-1 w-full">
            <div className="flex items-center">
              <div
                className={classNames(
                  "rounded h-9 flex items-center justify-between px-2 w-28 mr-4 min-w-28",
                  KeyTypes.find((item) => item.id === actionDetails?.type)
                    ?.color
                )}
              >
                <span className="text-xs w-full text-center font-medium">
                  {KeyTypes.find(
                    (item) => item.id === actionDetails?.type
                  )?.title.toUpperCase()}
                </span>
              </div>

              <Key />

              <div className="min-w-10 ml-auto text-end">
                <ActionIcon
                  size="lg"
                  className="ml-auto"
                  color="red"
                  onClick={() =>
                    handleChange({
                      actionDetails: null,
                      actionType: null,
                    })
                  }
                >
                  <MdClose className="transition-all duration-300" />
                </ActionIcon>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-auto">
                <Ttl />
              </div>

              {/* <div className="mr-2">
            <Serializers />
          </div> */}

              <div className="min-w-10 ml-auto text-end">
                <ActionIcon
                  size="lg"
                  color="blue"
                  className="ml-auto"
                  onClick={handleRefreshData}
                  disabled={isLoading}
                >
                  <BiRefresh className="transition-all duration-300 text-lg" />
                </ActionIcon>
              </div>

              <div>
                <ActionIcon
                  size="lg"
                  color="red"
                  onClick={handleRemoveItem}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  <BiTrash className="transition-all duration-300" />
                </ActionIcon>
              </div>
            </div>
          </div>

          {!!Component && status === "success" && (
            <div className="h-full w-full overflow-auto scroll-gray-700">
              <Component data={data} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Show;

