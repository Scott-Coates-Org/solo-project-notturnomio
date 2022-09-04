import { useEffect, useState } from "react";
import lists from "../mockData/lists.json";
import cards from "../mockData/cards.json";
import labels from "../mockData/labels.json";
// import httpService from "../services/http.services";
import { ref, set } from "firebase/database";
import { database } from "../firebase/client";

const useMockData = () => {
  const statusConst = {
    idle: "Not Started",
    pending: "In Process",
    success: "Ready",
    error: "Error Occured",
  };

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConst.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = lists.length + cards.length + labels.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConst.success);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const [index, list] of lists.entries()) {
        console.log(Object.entries(list)[0][0]);
        console.log(index);

        await set(ref(database, "lists/" + Object.entries(list)[0][0]), {
          id: Object.entries(list)[0][0],
          listName: list[Object.entries(list)[0][0]].listName,
          cards: list[Object.entries(list)[0][0]].cards,
          index: `${index}`,
        });
        // await httpService.put("/lists/" + Object.entries(list)[0][0] + ".json", list);
        incrementCount();
      }
      for (const card of cards) {
        await set(ref(database, "cards/" + card.id), {
          id: card.id,
          cardName: card.cardName,
          listId: card.listId,
          label: card.label,
          date: card.date,
          task: card.task,
        });
        // await httpService.put("/cards/" + card.id + ".json", card);
        incrementCount();
      }
      for (const label of labels) {
        // const db = getDatabase();
        await set(ref(database, "cardLabels/" + label.id), {
          id: label.id,
          labelName: label.labelName,
          color: label.color,
        });
        // await httpService.put("/cardLabels/" + label.id + ".json", label);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConst.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
