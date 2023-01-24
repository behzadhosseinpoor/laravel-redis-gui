export interface IGetRedisFormData {
  path: string;
  connection: string;
}

export interface IGetRedisKeysFormData {
  path: string;
  connection: string;
  query?: string;
  type?: string;
}

export interface IGetRedisKeyFormData {
  id: string;
  connection: string;
  path: string;
}

