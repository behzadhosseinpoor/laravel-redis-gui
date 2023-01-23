import { FC, ReactNode } from "react";
import { RedisProvider } from "./redis";

interface Props {
    children: ReactNode;
}

const ContextsProvider: FC<Props> = ({ children }) => {
    return <RedisProvider>{children}</RedisProvider>;
};

export default ContextsProvider;
