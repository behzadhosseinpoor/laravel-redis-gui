interface IRedisDetails {
    connected_clients: number;
    instantaneous_ops_per_sec: number;
    keys: number;
    redis_version: string;
    used_memory: number;
}

interface IKey {
    key: string;
    ttl: number;
    type: number;
}
