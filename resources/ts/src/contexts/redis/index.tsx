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

    const data = window.RedisGUI;

    setData({
      connection: data.connections[0] || "",
      path: data.path as RedisContext["path"],
      connections: data.connections as RedisContext["connections"],
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

