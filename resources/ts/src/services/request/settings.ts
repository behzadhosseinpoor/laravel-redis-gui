import { TApiRoutes } from "./types";

export const ApiRoutes: TApiRoutes = {
  REDIS: {
    methods: ["GET"],
    url: "/#path/api/#connection",
  },
  KEYS: {
    methods: ["GET"],
    url: "/#path/api/#connection/keys",
  },
  KEY: {
    methods: ["GET", "DELETE"],
    url: "/#path/api/#connection/keys/#id",
  },
};

