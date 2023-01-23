import Request from "../../../../services/request";
import { IGetRedisFormData, IGetRedisKeysFormData } from "./types";

const Get = async ({ path, connection }: IGetRedisFormData) =>
  await new Request().get<IReturnValue<IRedisDetails>>({
    base: "REDIS",
    params: {
      path,
      connection,
    },
  });

const GetKeys = async ({
  path,
  connection,
  query = "",
  type,
}: IGetRedisKeysFormData) =>
  await new Request().get<IReturnValue<Array<IKey>>>(
    {
      base: "KEYS",
      params: {
        path,
        connection,
      },
    },
    {
      params: { query, type },
    }
  );

// Main Object
const RedisApis = {
  Get,
  GetKeys,
};

export default RedisApis;

