import { useRedisContext } from "../../contexts/redis";
import { MdClose } from "react-icons/md";

const Action = () => {
  const { handleChange } = useRedisContext();

  return (
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
  );
};

export default Action;

