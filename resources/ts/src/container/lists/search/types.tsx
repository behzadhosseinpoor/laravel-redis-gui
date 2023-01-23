import { KeyTypes } from "../../../constants/redis";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { BiListCheck } from "react-icons/bi";

interface Props {
  handleChangeType: (type: string) => void;
}

const Types: FC<Props> = ({ handleChangeType }) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  useEffect(() => {
    if (isShowDropdown) {
      console.log("fdsafds");
      window.addEventListener("click", handleCloseDropdown);
    }
  }, [isShowDropdown]);

  const handleCloseDropdown = () => {
    setIsShowDropdown(false);

    window.removeEventListener("click", handleCloseDropdown);
  };

  return (
    <div className="bg-dark-400 absolute top-0 left-0 h-full w-9 rounded hover:bg-red-900 hover:bg-opacity-30 transition-all duration-300">
      <div
        className="h-full w-full flex items-center justify-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();

          setIsShowDropdown(!isShowDropdown);
        }}
      >
        <BiListCheck className="text-xl" />
      </div>

      <div
        className={classNames(
          "absolute top-full pt-2 left-0 z-10",
          isShowDropdown ? "block" : "hidden"
        )}
      >
        <div className="bg-dark-600 border border-solid border-dark-400 w-32 rounded p-1">
          {KeyTypes.map(
            (key, i) =>
              key.id !== 0 && (
                <div
                  key={i}
                  className="flex items-center py-1.5 px-2.5 hover:bg-red-900 hover:bg-opacity-30 rounded cursor-pointer transition-all duration-300"
                  onClick={() => handleChangeType(key.id.toString())}
                >
                  <div
                    className={classNames(
                      "w-2 h-2 rounded-full mr-2",
                      key.color
                    )}
                  ></div>
                  {key.title}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Types;

