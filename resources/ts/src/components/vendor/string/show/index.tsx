import { FC } from "react";

interface Props {
  data: IKey & { data: any };
}

const StringShow: FC<Props> = ({ data }) => {
  return <div className="break-all">{data.data}</div>;
};

export default StringShow;

