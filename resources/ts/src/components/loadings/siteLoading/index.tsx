import { FC } from "react";
import { VscLoading } from "react-icons/vsc";
import cs from "classnames";

interface Props {
    classNames?: {
        icon?: string;
    };
    color?: "blue" | "red" | "grape" | "gray";
    size?:
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl"
        | "6xl"
        | "7xl"
        | "8xl"
        | "9xl";
}

const SiteLoading: FC<Props> = ({
    classNames,
    color = "blue",
    size = "2xl",
}) => {
    return (
        <VscLoading
            className={cs(
                "mx-auto animate-spin",
                classNames?.icon || "",
                `text-${color}-500`,
                `text-${size}`,
            )}
        />
    );
};

export default SiteLoading;
