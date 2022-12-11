import { Dispatch, SetStateAction, useState } from "react";
import { WithId } from "../data";

const useEntityWithIdList = <T extends WithId>(): [
  Array<T>,
  Dispatch<SetStateAction<T[]>>,
  (t: T) => void,
  (t: T) => void
] => {
  const [list, setList] = useState<T[]>([]);

  const deleteItem = (item: T) => {
    setList((currentList) =>
      currentList.filter((existingItem) => existingItem.id !== item.id)
    );
  };

  const saveItem = (item: T) => {
    setList((currentList) => [
      ...currentList.filter((existingItem) => existingItem.id !== item.id),
      item,
    ]);
  };

  return [list, setList, saveItem, deleteItem];
};

export default useEntityWithIdList;
