import { ActionIcon, Button } from "@mantine/core";
import { FC } from "react";
import Search from "./search";
import ListView from "./list";
import { BiPlus, BiRefresh } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import Common from "../../utilities/common";
import { useRedisContext } from "../../contexts/redis";

interface Props {
  loading: boolean;
}

const List: FC<Props> = ({ loading }) => {
  const { connection, path, query, type, handleChange } = useRedisContext();

  const { mutate } = useMutation(
    () =>
      Common.api.redis.GetKeys({
        connection,
        path,
        query,
        type,
      }),
    {
      onSuccess: ({ data }) => {
        handleChange({
          keys: data.result || [],
        });
      },
    }
  );

  return (
    <div className="h-full overflow-hidden flex flex-col w-full items-center">
      <div className="flex items-center flex-wrap md:flex-nowrap justify-between mb-2 w-full">
        <div className="w-full md:pr-4 mb-4 md:mb-0">
          <Search />
        </div>

        {/* <Button
          leftIcon={<BiPlus />}
          className="mr-4"
          onClick={() =>
            handleChange({
              actionType: "addKey",
            })
          }
        >
          Key
        </Button> */}

        <ActionIcon
          variant="subtle"
          color="blue"
          className="transition-all duration-300"
          size="lg"
          onClick={() => mutate()}
        >
          <BiRefresh className="text-2xl" />
        </ActionIcon>
      </div>

      <div className="border-0 border-t border-solid border-dark-400 w-full pt-1 h-full overflow-hidden">
        <div className="scroll-gray-700 overflow-y-auto overflow-x-hidden h-full">
          <ListView loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default List;

