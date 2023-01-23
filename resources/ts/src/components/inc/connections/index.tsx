import { useRedisContext } from "../../../contexts/redis";
import { Select } from "@mantine/core";
import { SiRedis } from "react-icons/si";

const Connections = () => {
    const { connection, connections, handleChange } = useRedisContext();

    return (
        <Select
            variant="filled"
            onChange={(value: string) =>
                handleChange({
                    connection: value,
                })
            }
            icon={<SiRedis className="text-lg text-red-500" />}
            className="inline-block"
            value={connection}
            data={connections.map((item) => ({
                label: item,
                value: item,
            }))}
            placeholder="Choose connection"
        />
    );
};

export default Connections;
