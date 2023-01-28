import { FC } from "react";

interface Props {
  data: IKey & { data: any };
}

const StreamShow: FC<Props> = ({ data }) => {
  return <div className="break-all">{data.data}</div>;
};

export default StreamShow;

