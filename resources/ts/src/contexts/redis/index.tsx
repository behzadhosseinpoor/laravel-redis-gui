// @ts-nocheck
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DefaultValue } from "./settings";
import { RedisContext } from "./types";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
}

const Context = createContext<RedisContext>(DefaultValue);

export const RedisProvider: FC<Props> = ({ children }) => {
  const [data, setData] = useState(DefaultValue);

  useEffect(() => {
    if (!window.RedisGUI) {
      return undefined;
    }

    const redis = window.RedisGUI;

    if (redis.assetsAreCurrent) {
      toast.warn(({ closeToast }) => (
        <div>
          <div className="mb-1">
            The published RedisGUI assets are not up-to-date with the installed
            version. To update, run:
          </div>

          <code className="bg-gray-100 p-1 text-gray-900 rounded">
            php artisan redis-gui:publish
          </code>
        </div>
      ));
    }

    setData({
      ...data,
      connection: redis.connections[0] || "",
      path: redis.path as RedisContext["path"],
      connections: redis.connections as RedisContext["connections"],
    });
  }, []);

  const handleChange: RedisContext["handleChange"] = (newData) => {
    setData((oldState) => ({
      ...oldState,
      ...newData,
    }));
  };

  return (
    <Context.Provider value={{ ...data, handleChange }}>
      {children}
    </Context.Provider>
  );
};

export const useRedisContext = () => useContext(Context);

