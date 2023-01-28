import Request from "../../../../services/request";
import {
  IGetRedisFormData,
  IGetRedisKeyFormData,
  IGetRedisKeysFormData,
  IRemoveRedisFormData,
} from "./types";

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

const GetKey = async ({ id, connection, path }: IGetRedisKeyFormData) =>
  await new Request().get<IReturnValue<IKey & { data: any }>>({
    base: "KEY",
    params: {
      id,
      connection,
      path,
    },
  });

const Remove = async ({ id, path, connection }: IRemoveRedisFormData) =>
  await new Request().delete<IReturnValue<IRedisDetails>>({
    base: "KEY",
    params: {
      path,
      connection,
      id,
    },
  });

// Main Object
const RedisApis = {
  Get,
  GetKeys,
  GetKey,
  Remove,
};

export default RedisApis;

