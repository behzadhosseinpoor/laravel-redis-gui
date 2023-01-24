import classNames from "classnames";
import { FC } from "react";

interface Props {
  data: IKey & { data: any };
}

const SetShow: FC<Props> = ({ data }) => {
  return (
    <div>
      {data &&
        data.data.length &&
        data.data.map((item: string, i: number) => (
          <div
            key={i}
            className={classNames(
              "px-2 py-3",
              i / 2 === 0 ? "bg-dark-500" : ""
            )}
          >
            {item}
          </div>
        ))}
    </div>
  );
};

export default SetShow;

