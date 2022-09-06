import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import AddMenu from "../edit/AddMenu";
import List from "../list/List";
import { database } from "../../firebase/client.js";
import { ref, set, onValue, remove } from "firebase/database";
import { getListsDropStyle } from "../../utils/style.js";
import useMockData from "../../utils/useMockData";
import { getFormatedNowDate } from "../../utils/dateFormat";
import styles from "./listsContainer.module.css";

function ListsContainer() {
  const [listsData, setListsData] = useState();
  const [cardsData, setCardsData] = useState();
  const [labelsData, setLabelsData] = useState();
  const [tasksData, setTasksData] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    geAppData();
    // console.log(tasksData);
  }, [setListsData]);

  async function geAppData() {
    try {
      const content = ref(database);
      onValue(content, (snapshot) => {
        const data = snapshot.val();
        const listsArray = [];
        for (const list in data.lists) {
          listsArray.push(data.lists[list]);
        }
        listsArray.sort((a, b) => a.index - b.index);
        setListsData(listsArray);
        const cardsArray = [];
        for (const card in data.cards) {
          cardsArray.push(data.cards[card]);
        }
        setCardsData(cardsArray);
        const labelsArray = [];
        for (const label in data.cardLabels) {
          labelsArray.push(data.cardLabels[label]);
        }
        setLabelsData(labelsArray);
        const tasksArray = [];
        for (const task in data.cardTasks) {
          tasksArray.push(data.cardTasks[task]);
        }
        setTasksData(tasksArray);
        // updateListData(postElement, data);
      });
      setLoading(false);
    } catch (error) {
      // console.log(error.message);
    }
  }

  async function setMovedLists(
    source,
    destination,
    sourceList,
    destinationList
  ) {
    try {
      await set(ref(database, "lists/" + sourceList.id), {
        ...sourceList,
        index: destination.index,
      });
      await set(ref(database, "lists/" + destinationList.id), {
        ...destinationList,
        index: source.index,
      });
    } catch (error) {
      console.log(error.message);
      // setError(error);
      // setStatus(statusConst.error);
    }
  }

  async function setMovedCards(
    sourceId,
    destinationId,
    sourceList,
    destinationList,
    draggableId,
    cardObject
  ) {
    try {
      await set(ref(database, "lists/" + sourceList.id), {
        ...sourceList,
        cards: sourceList.cards,
      });
      if (sourceId !== destinationId) {
        await set(ref(database, "lists/" + destinationList.id), {
          ...destinationList,
          cards: destinationList.cards,
        });

        await set(ref(database, "cards/" + draggableId), {
          ...cardObject,
          listId: destinationList.id,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const { error, initialize, progress, status } = useMockData();
  // console.log(error);
  // console.log(progress);
  // console.log(status);

  const handleClickFirebase = () => {
    // httpService.post("/lists.json", lists).then((response) => {
    //   console.log(response);
    // });

    // const dashboardRef = await database().ref("lists");
    // dashboardRef.push(lists);

    initialize();

    //   const db = getDatabase();
    //   set(ref(db, "lists/"), listsDummyData);
  };

  // const fetchDatabase = () => {
  //   // const db = getDatabase();
  //   // await set(ref(database, "lists/" + Object.entries(list)[0][0]),

  //   // const dbRef = ref(getDatabase());
  //   get(child(database, "lists/"))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log(snapshot.val());
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   // const db = getDatabase();
  //   const dataList = ref(database, "lists/");
  //   onValue(dataList, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //     // updateListData(postElement, data);
  //   });
  // };
  // fetchDatabase();

  // useEffect(() => {
  //   const mouseWheelScrollHorizontal = () => {
  //     const appBoard = document.querySelector("#app-board");
  //     // const appList = document.querySelectorAll("li");
  //     // console.log(appList);
  //     console.log(appBoard);

  //     appBoard.onwheel = (e) => {
  //       console.log("wheel", e.target);

  //       if (e.target.id === "app-lists") {
  //         e.preventDefault();
  //         const delta = e.deltaY;
  //         const scrollLeft = appBoard.scrollLeft;
  //         appBoard.scrollLeft = scrollLeft + delta;
  //       }
  //     };
  //   };

  //   mouseWheelScrollHorizontal();
  // }, []);

  const handleDeleteList = async (e) => {
    try {
      await remove(ref(database, "lists/" + e.componentId));
    } catch (error) {
      console.log(error.message);
      // setError(error);
      // setStatus(statusConst.error);
    }
  };

  const handleDeleteCard = async (e) => {
    try {
      const fromList = listsData.find((list) => list.id === e.listId);
      fromList.cards = fromList.cards.filter((card) => card !== e.componentId);

      await set(ref(database, "lists/" + e.listId), fromList);
      await remove(ref(database, "cards/" + e.componentId));
    } catch (error) {
      console.log(error.message);
      // setError(error);
      // setStatus(statusConst.error);
    }
  };

  const handleCreateNewList = async (e) => {
    try {
      e.preventDefault();
      const newListName = e.target[0].value;
      const newListId = v4();
      const newListIndex = listsData.length;
      await set(ref(database, "lists/" + newListId), {
        id: newListId,
        listName: newListName,
        // cards: false,
        index: newListIndex,
      });
    } catch (error) {
      console.log(error.message);
      // setError(error);
      // setStatus(statusConst.error);
    }
  };

  const handleCreateNewCard = async (e) => {
    try {
      e.preventDefault();
      const newCardName = e.target[0].value;
      const newCardListId = e.target[0].name;
      const newCardId = v4();
      const newList = listsData.find((list) => list.id === newCardListId);
      if (!newList.cards) {
        newList.cards = [newCardId];
      } else {
        newList.cards.push(newCardId);
      }

      await set(ref(database, "lists/" + newCardListId), {
        ...newList,
      });
      await set(ref(database, "cards/" + newCardId), {
        id: newCardId,
        cardName: newCardName,
        listId: newCardListId,
        label: ["empty"],
        task: ["empty"],
        date: getFormatedNowDate(),
      });
    } catch (error) {
      console.log(error.message);
      // setError(error);
      // setStatus(statusConst.error);
    }
  };

  const onDragEnd = ({ source, destination, draggableId, type }, lists) => {
    const sourceId = source.droppableId.slice(5);
    const destinationId = destination.droppableId.slice(5);

    if (!destination) {
      return;
    }

    if (type === "LISTS" && sourceId !== destinationId) {
      const sourceList = lists.find((list) => list.id === sourceId);
      const destinationList = lists.find((list) => list.id === destinationId);

      setMovedLists(source, destination, sourceList, destinationList);
    }

    if (type === "CARDS") {
      if (sourceId === destinationId) {
        const newlists = [...lists];
        newlists.map((list) => {
          if (list.id === sourceId) {
            const cardsList = list.cards;
            cardsList.splice(source.index, 1);
            cardsList.splice(destination.index, 0, draggableId);
            list.cards = cardsList;
            setMovedCards(sourceId, destinationId, list, list, draggableId);
          }
          return list;
        });
      } else {
        const sourceList = lists.find((list) => list.id === sourceId);
        const destinationList = lists.find((list) => list.id === destinationId);

        const draggedCard = sourceList.cards.splice(source.index, 1);
        if (sourceList.cards === undefined) {
          sourceList.cards = [];
        }
        if (destinationList.cards === undefined) {
          destinationList.cards = [draggedCard[0]];
        } else {
          destinationList.cards.splice(destination.index, 0, draggedCard[0]);
        }

        const newCardObject = cardsData.find((card) => card.id === draggableId);

        setMovedCards(
          sourceId,
          destinationId,
          sourceList,
          destinationList,
          draggableId,
          newCardObject
        );
      }
    }
  };

  return (
    <div id="app-board" className={styles["app-board"]}>
      {!listsData ? (
        <p className={styles["app-loading"]}>Loading...</p>
      ) : (
        <>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, listsData)}>
            {listsData.map((list, index) => {
              return (
                <Droppable
                  droppableId={`lists${list.id}`}
                  type="LISTS"
                  key={list.id}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`${getListsDropStyle(
                        snapshot.isDraggingOver
                      )}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Draggable
                        draggableId={list.id}
                        index={index}
                        key={list.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={styles["app-lists"]}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <List
                              listId={list.id}
                              listIndex={index}
                              listName={list.listName}
                              onSubmit={handleCreateNewCard}
                              cards={list.cards}
                              onDeleteList={handleDeleteList}
                              onDeleteCard={handleDeleteCard}
                              cardsData={cardsData && cardsData}
                              labelsData={labelsData && labelsData}
                              tasksData={tasksData && tasksData}
                            />
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
            <div className={styles["app-lists-list"]}>
              <AddMenu
                buttonText="Add New List"
                submitText="Add List"
                onSubmit={handleCreateNewList}
                placeholder="Enter list title"
                menuFormTextClass={styles["add-new-list"]}
              />
            </div>
          </DragDropContext>
        </>
      )}
      {/* </div> */}
      <div>
        <h3>Initialize mockData in FireBase</h3>
        <ul>
          <li>Status: {status}</li>
          <li>Progress: {progress}%</li>
          {error && <li>Error: {error.message}</li>}
        </ul>
        <button onClick={handleClickFirebase}>Firebase!</button>
      </div>
    </div>
  );
}

export default ListsContainer;
