import { useRedisContext } from "../../../contexts/redis";
import { SiRedis } from "react-icons/si";
import { BiMemoryCard } from "react-icons/bi";
import { TfiDashboard } from "react-icons/tfi";
import { AiOutlineKey, AiOutlineUser } from "react-icons/ai";
import { ConvertSize } from "../../../utilities/helper";

const Details = () => {
    const { details } = useRedisContext();

    return (
        <>
            {details && (
                <div className="flex flex-wrap items-stretch justify-center md:justify-start">
                    {/* Redis version */}
                    <div className="inline-flex items-center">
                        <SiRedis className="text-xl text-white mr-2" />

                        <span className="font-medium">
                            {details.redis_version}
                        </span>
                    </div>

                    <div className="bg-gray-600 w-0.5 rounded mx-4" />

                    {/* Instance per sec */}
                    <div className="inline-flex items-center">
                        <TfiDashboard className="text-xl text-white mr-2" />

                        <span className="font-medium">
                            {details.instantaneous_ops_per_sec}
                        </span>
                    </div>

                    <div className="bg-gray-600 w-0.5 rounded mx-4" />

                    {/* Used memory */}
                    <div className="inline-flex items-center">
                        <BiMemoryCard className="text-xl text-white mr-2" />

                        <span className="font-medium">
                            {ConvertSize(details.used_memory)}
                        </span>
                    </div>

                    <div className="bg-gray-600 w-0.5 rounded mx-4" />

                    {/* Keys */}
                    <div className="inline-flex items-center">
                        <AiOutlineKey className="text-xl text-white mr-2" />

                        <span className="font-medium">{details.keys}</span>
                    </div>

                    <div className="bg-gray-600 w-0.5 rounded mx-4" />

                    {/* Clients */}
                    <div className="inline-flex items-center">
                        <AiOutlineUser className="text-xl text-white mr-2" />

                        <span className="font-medium">
                            {details.connected_clients}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Details;
