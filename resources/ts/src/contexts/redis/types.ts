export interface RedisContext {
  query: string;
  type: string;
  path: string;
  connection: string;
  connections: Array<string>;
  details: IRedisDetails | null;
  keys: Array<IKey>;
  actionType: "showKey" | "addKey" | null;
  actionDetails: IKey | null;
  refreshKeys: boolean;
  handleChange: (data: Partial<Omit<RedisContext, "handleChange">>) => void;
}

