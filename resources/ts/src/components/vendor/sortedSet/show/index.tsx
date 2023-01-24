import { Table } from "@mantine/core";
import { FC } from "react";

interface Props {
  data: IKey & { data: any };
}

const SortedSetShow: FC<Props> = ({ data }) => {
  const rows = Object.entries(data.data as Record<string, string>).map(
    ([key, value], i) => (
      <tr key={i}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    )
  );

  return (
    <div>
      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Member</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default SortedSetShow;

