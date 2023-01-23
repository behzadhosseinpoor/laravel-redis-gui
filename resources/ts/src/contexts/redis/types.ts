export interface RedisContext {
    path: string;
    connection: string;
    connections: Array<string>;
    details: IRedisDetails | null;
    keys: Array<IKey>;
    actionType: "showKey" | "addKey" | null;
    actionDetails: {
        key: string;
    } | null;
    handleChange: (data: Partial<Omit<RedisContext, "handleChange">>) => void;
}
