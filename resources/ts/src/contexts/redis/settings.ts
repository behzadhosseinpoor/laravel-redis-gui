import { RedisContext } from "./types";

export const DefaultValue: RedisContext = {
    connection: "",
    connections: [],
    details: null,
    path: "",
    keys: [],
    actionType: null,
    actionDetails: null,
    handleChange: () => {},
};
