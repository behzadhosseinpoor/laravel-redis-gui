import { Select } from "@mantine/core";

const Serializers = () => {
  return (
    <Select
      variant="filled"
      onChange={(value: string) => {}}
      className="inline-block"
      //   value={connection}
      data={[]}
      placeholder="Choose serializer"
    />
  );
};

export default Serializers;

