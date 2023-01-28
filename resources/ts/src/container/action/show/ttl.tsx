import { useState } from "react";
import { useRedisContext } from "../../../contexts/redis";
import { Input } from "@mantine/core";
import { BiCheck, BiEdit } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { ConvertSeconds } from "../../../utilities/helper";

const Ttl = () => {
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

    setValue(actionDetails?.ttl.toString() || "");
    setIsEdit(true);
  };

  return (
    <>
      {isEdit ? (
        <div className="relative">
          <Input
            className="w-48"
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
        <div className="inline-flex items-center text-xs">
          <span className="text-gray-600 mr-2">TTL:</span>

          <span className="text-gray-400 mr-1">
            {actionDetails?.ttl === -1
              ? "No limit"
              : ConvertSeconds(actionDetails?.ttl || 0)}
          </span>

          {/* <BiEdit
            className="transition-all duration-300 text-lg cursor-pointer"
            onClick={handleEditStart}
          /> */}
        </div>
      )}
    </>
  );
};

export default Ttl;

