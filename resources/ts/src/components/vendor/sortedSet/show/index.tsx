import { Table } from "@mantine/core";
import { FC } from "react";

interface Props {
  data: IKey & { data: any };
}

const SortedSetShow: FC<Props> = ({ data }) => {
  const rows = Object.entries(data.data as Record<string, string>).map(
    ([key, value], i) => (
      <tr key={i}>
        <td className="break-all">{key}</td>
        <td className="break-all">{value}</td>
      </tr>
    )
  );

  return (
    <div>
      <Table striped withBorder withColumnBorders>
        <thead>
          <tr>
            <th className="min-w-32">Member</th>
            <th className="min-w-32">Score</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default SortedSetShow;

