import { Table } from "@mantine/core";
import { FC } from "react";

interface Props {
  data: IKey & { data: any };
}

const SetShow: FC<Props> = ({ data }) => {
  const rows = data.data.map((item: string, i: number) => (
    <tr key={i}>
      <td className="break-all">{item}</td>
    </tr>
  ));

  return (
    <div>
      <Table striped withBorder withColumnBorders>
        <thead>
          <tr>
            <th className="min-w-32">Member</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default SetShow;

