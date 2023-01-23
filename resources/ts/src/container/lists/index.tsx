import { ActionIcon } from "@mantine/core";
import { FC, useState } from "react";
import { RiListCheck } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import Search from "./search";
import { TShowTypes } from "./types";
import ListView from "./list";
import TreeView from "./tree";

interface Props {
    loading: boolean;
}

const List: FC<Props> = ({ loading }) => {
    const [showType, setShowType] = useState<TShowTypes>("list");

    return (
        <div className="h-full overflow-hidden flex flex-col w-full items-center">
            <div className="md:flex items-center justify-between mb-2 w-full">
                <div className="w-full pr-4 mb-4 md:mb-0">
                    <Search />
                </div>

                <div className="bg-dark-700 p-1 rounded inline-flex items-center min-w-max">
                    <ActionIcon
                        variant={showType === "list" ? "filled" : "subtle"}
                        color="red.7"
                        className="mr-2 transition-all duration-300"
                        size="lg"
                        onClick={() => setShowType("list")}>
                        <RiListCheck />
                    </ActionIcon>

                    <ActionIcon
                        variant={showType === "tree" ? "filled" : "subtle"}
                        color="red.7"
                        className="transition-all duration-300"
                        size="lg"
                        onClick={() => setShowType("tree")}>
                        <MdOutlineAccountTree />
                    </ActionIcon>
                </div>
            </div>

            <div className="border-0 border-t border-solid border-dark-400 w-full pt-1 h-full overflow-hidden">
                <div className="scroll-gray-700 overflow-y-auto overflow-x-hidden h-full">
                    {showType === "list" && <ListView loading={loading} />}

                    {showType === "tree" && <TreeView loading={loading} />}
                </div>
            </div>
        </div>
    );
};

export default List;
