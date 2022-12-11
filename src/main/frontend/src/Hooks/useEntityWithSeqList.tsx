import { useState } from "react";
import { WithSeq } from "Utils/data";

const useEntityWithSeqList = <T extends WithSeq>(): [
  Array<T>,
  (t: T[]) => void,
  (t: T) => void,
  (t: T) => void,
  (t: T) => void,
  (t: T) => void,
  (t: T) => void
] => {
  const [list, setList] = useState<T[]>([]);
  const [maxSeq, setMaxSeq] = useState<number>(1);

  const deleteItem = (item: T) => {
    setMaxSeq((currentMaxSeq) => currentMaxSeq - 1);
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

  const itemUp = (item: T) => {
    if (item.seq === 1) {
      return;
    }

    setList((currentList) => {
      const newList = [...currentList];
      const upElementInx = item.seq - 2;
      const currElementInx = item.seq - 1;
      const upElement = newList[upElementInx];
      item.seq = item.seq - 1;
      upElement.seq = upElement.seq + 1;
      newList[upElementInx] = item;
      newList[currElementInx] = upElement;
      return newList;
    });
  };

  const itemDown = (item: T) => {
    if (item.seq === maxSeq - 1) {
      return;
    }

    setList((currentList) => {
      const newList = [...currentList];
      const downElementInx = item.seq;
      const currElementInx = item.seq - 1;
      const downElement = newList[downElementInx];
      item.seq = item.seq + 1;
      downElement.seq = downElement.seq - 1;
      newList[downElementInx] = item;
      newList[currElementInx] = downElement;
      return newList;
    });
  };

  const initializeList = (items: T[]) => {
    setMaxSeq(items.length || 1);
    setList(items);
  };

  return [list, initializeList, addItem, updateItem, deleteItem, itemDown, itemUp];
};

export default useEntityWithSeqList;
