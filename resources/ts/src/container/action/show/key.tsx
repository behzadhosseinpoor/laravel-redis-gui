import { ActionIcon, Input } from "@mantine/core";
import { useState } from "react";
import { BiCheck, BiEdit } from "react-icons/bi";
import { MdClose, MdOutlineCancel } from "react-icons/md";
import { useRedisContext } from "../../../contexts/redis";
import { useMutation } from "@tanstack/react-query";

const Key = () => {
  const [value, setValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const { actionDetails } = useRedisContext();

  //   const {} = useMutation();

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleEditStart = () => {
    if (isEdit) {
      setIsEdit(false);
      return undefined;
    }

    setValue(actionDetails?.key || "");
    setIsEdit(true);
  };

  return (
    <>
      <div className="mr-4 w-action-text">
        {isEdit ? (
          <div className="relative">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value || "")}
            />

            <div className="absolute w-20 z-10 -bottom-8 h-8 right-0 bg-gray-600 rounded grid grid-cols-2 overflow-hidden">
              <div className="px-0.5 py-1.5 flex items-center justify-center hover:bg-green-500 transition-all duration-300 cursor-pointer">
                <BiCheck className="text-xl" />
              </div>

              <div
                className="px-0.5 py-1.5 flex items-center justify-center hover:bg-red-500 transition-all duration-300 cursor-pointer"
                onClick={handleCancel}
              >
                <MdOutlineCancel className="text-lg" />
              </div>
            </div>
          </div>
        ) : (
          <div className="inline-flex items-center w-full">
            <div className="truncate w-full">{actionDetails?.key}</div>
          </div>
        )}
      </div>

      {/* <div className="w-10">
        <ActionIcon size="lg" color="yellow" onClick={handleEditStart}>
          <BiEdit className="transition-all duration-300" />
        </ActionIcon>
      </div> */}
    </>
  );
};

export default Key;

