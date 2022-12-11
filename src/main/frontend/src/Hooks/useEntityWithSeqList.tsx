import { Dispatch, SetStateAction, useState } from "react";
import { WithSeq } from "../data";

const useEntityWithSeqList = <T extends WithSeq>(): [
  Array<T>,
  (t: T[]) => void,
  (t: T) => void,
  (t: T) => void,
  (t: T) => void
] => {
  const [list, setList] = useState<T[]>([]);
  const [maxSeq, setMaxSeq] = useState<number>(1);

  const deleteItem = (item: T) => {
    setMaxSeq(currentMaxSeq => currentMaxSeq - 1)
    setList((currentList) =>
      currentList
        .filter((existingItem) => existingItem.seq !== item.seq)
        .map((existingItem) =>
          existingItem.seq > item.seq
            ? { ...existingItem, seq: existingItem.seq - 1 }
            : existingItem
        )
    );
  };

  const updateItem = (item: T) => {
    setList((currentList) => {
      const newList = [...currentList];
      newList[item.seq - 1] = item;
      return newList;
    });
  };

  const addItem = (item: T) => {
    item.seq = maxSeq;
    setMaxSeq((currentMaxSeq) => currentMaxSeq + 1);
    setList((currentList) => [...currentList, item]);
  };

  const initializeList = (items: T[]) => {
    setMaxSeq(items.length)
    setList(items)
  }

  return [list, initializeList, addItem, updateItem, deleteItem];
};

export default useEntityWithSeqList;
