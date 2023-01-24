import { FC } from "react";
import HashAdd from "../components/vendor/hash/add";
import HashShow from "../components/vendor/hash/show";
import ListAdd from "../components/vendor/list/add";
import ListShow from "../components/vendor/list/show";
import SetAdd from "../components/vendor/set/add";
import SetShow from "../components/vendor/set/show";
import SortedSetAdd from "../components/vendor/sortedSet/add";
import SortedSetShow from "../components/vendor/sortedSet/show";
import StreamAdd from "../components/vendor/stream/add";
import StreamShow from "../components/vendor/stream/show";
import StringAdd from "../components/vendor/string/add";
import StringShow from "../components/vendor/string/show";

export const KeyTypes: Array<{
  id: number;
  title: string;
  color: string;
  components: {
    add: FC<{ data: IKey & { data: any } }>;
    show: FC<{ data: IKey & { data: any } }>;
  };
}> = [
  {
    id: 0,
    title: "None",
    color: "bg-gray-700",
    components: {
      add: StringAdd,
      show: StringShow,
    },
  },
  {
    id: 1,
    title: "String",
    color: "bg-grape-700",
    components: {
      add: StringAdd,
      show: StringShow,
    },
  },
  {
    id: 2,
    title: "Set",
    color: "bg-orange-500",
    components: {
      add: SetAdd,
      show: SetShow,
    },
  },
  {
    id: 3,
    title: "List",
    color: "bg-green-500",
    components: {
      add: ListAdd,
      show: ListShow,
    },
  },
  {
    id: 4,
    title: "Sorted Set",
    color: "bg-pink-500",
    components: {
      add: SortedSetAdd,
      show: SortedSetShow,
    },
  },
  {
    id: 5,
    title: "Hash",
    color: "bg-blue-500",
    components: {
      add: HashAdd,
      show: HashShow,
    },
  },
  {
    id: 6,
    title: "Stream",
    color: "bg-lime-500",
    components: {
      add: StreamAdd,
      show: StreamShow,
    },
  },
];

