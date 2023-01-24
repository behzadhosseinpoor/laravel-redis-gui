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

interface Props {
  loading: boolean;
  data: IKey & { data: any };
  refetch: Function;
}

const Show: FC<Props> = ({ loading, data, refetch }) => {
  const { actionDetails, handleChange } = useRedisContext();

  const handleRefreshData = () => {
    refetch();
  };

  const handleRemoveItem = () => {};

  const Component = KeyTypes.find((item) => item.id === data.type)?.components
    .show;

  return (
    <>
      {loading && <SiteLoading />}

      {!loading && (
        <>
          <div className="border-0 border-b border-solid border-gray-600 p-2 mb-4">
            <div className="flex items-center mb-4">
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

              <div className="w-10 ml-auto">
                <ActionIcon
                  size="lg"
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

              <div className="">
                <ActionIcon size="lg" color="blue" onClick={handleRefreshData}>
                  <BiRefresh className="transition-all duration-300 text-lg" />
                </ActionIcon>
              </div>

              {/* <div>
            <ActionIcon size="lg" color="red" onClick={handleRemoveItem}>
              <BiTrash className="transition-all duration-300" />
            </ActionIcon>
          </div> */}
            </div>
          </div>

          {!!Component && (
            <div className="p-2">
              <Component data={data} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Show;

