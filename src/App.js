import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import styles from "./app.module.css";
import AddMenu from "./components/edit/AddMenu";
import List from "./components/list/List";
import { getListsDropStyle } from "./utils/style";
// import Login from './components/login/Login'

export const dataLabels = [
  {
    id: "daa1345b-a789-438b-97f9-1db71d8a5323",
    labelName: "Urgent",
    color: "red",
  },
  {
    id: "12b48155-2a3b-4ad1-be54-88f442871711",
    labelName: "South",
    color: "orange",
  },
  {
    id: "49adfcb4-2d70-443d-a9fa-f82438619e18",
    labelName: "Meeting",
    color: "green",
  },
  {
    id: "e5d01e24-0762-4c01-8731-8922002fb897",
    labelName: "Paperwork",
    color: "darkslateblue",
  },
  {
    id: "f9350f01-b273-46d5-bbc2-daffc95b029c",
    labelName: "Accounting",
    color: "purple",
  },
  {
    id: "b8e91043-f4d7-49cd-a820-8d207603f45c",
    labelName: "West",
    color: "coral",
  },
];

export const dataCards = [
  {
    id: "b6cfa9ae-788e-42ec-ab80-d63d2fc5f627",
    cardName: "First Task",
    listId: "775db463-8b02-4d05-9dbe-6945cdc95d67",
    label: [
      "daa1345b-a789-438b-97f9-1db71d8a5323",
      "49adfcb4-2d70-443d-a9fa-f82438619e18",
    ],
  },
  {
    id: "f99c8218-ac22-4b16-bbdf-667088dc0bf0",
    cardName: "Second Task",
    listId: "a3350f54-6a05-4fc5-88d8-259c49689184",
    label: ["12b48155-2a3b-4ad1-be54-88f442871711"],
  },
  {
    id: "5d276e30-3cbc-456c-88be-494d220ebdcd",
    cardName: "Third Task",
    listId: "775db463-8b02-4d05-9dbe-6945cdc95d67",
    label: [
      "e5d01e24-0762-4c01-8731-8922002fb897",
      "f9350f01-b273-46d5-bbc2-daffc95b029c",
      "b8e91043-f4d7-49cd-a820-8d207603f45c",
    ],
  },
];

const dataLists = [
  {
    "775db463-8b02-4d05-9dbe-6945cdc95d67": {
      listName: "ToDo",
      cards: [
        "b6cfa9ae-788e-42ec-ab80-d63d2fc5f627",
        "5d276e30-3cbc-456c-88be-494d220ebdcd",
      ],
    },
  },
  {
    "a3350f54-6a05-4fc5-88d8-259c49689184": {
      listName: "InProgress",
      cards: ["f99c8218-ac22-4b16-bbdf-667088dc0bf0"],
    },
  },
];

function App() {
  const [lists, setLists] = useState(dataLists);
  const [cards, setCards] = useState(dataCards);

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

  const handleDeleteList = (e) => {
    const newLists = lists.filter(
      (list) => Object.entries(list)[0][0] !== e.componentId
    );
    setLists(newLists);
  };

  const handleDeleteCard = (e) => {
    const newLists = [...lists];
    const newCards = [...cards];
    newLists.map((list) => {
      if (Object.entries(list)[0][0] === e.listId) {
        const filteredCardsList = list[e.listId].cards.filter(
          (card) => card !== e.componentId
        );
        list[e.listId].cards = filteredCardsList;
        const filteredCards = newCards.filter(
          (card) => card.id !== e.componentId
        );
        setCards(filteredCards);
      }
      return list;
    });
    setLists(newLists);
  };

  const handleCreateNewList = (e) => {
    e.preventDefault();
    const newListName = e.target[0].value;
    const newLists = [
      ...lists,
      {
        [v4()]: {
          listName: newListName,
          cards: [],
        },
      },
    ];
    setLists(newLists);
  };

  const handleCreateNewCard = (e) => {
    e.preventDefault();
    const newCardName = e.target[0].value;
    const listId = e.target[0].name;
    const cardId = v4();
    const newLists = [...lists];
    const newCards = [...cards];

    newLists.map((list, index) => {
      return Object.keys(list).findIndex((id) => {
        if (id === listId) {
          newLists[index][listId].cards.push(cardId);
          newCards.push({
            id: cardId,
            cardName: newCardName,
            listId: listId,
            label: [],
          });
        }
        return newLists;
      });
    });
    setLists(newLists);
    setCards(newCards);
  };

  const onDragEnd = (
    { source, destination, draggableId, type },
    lists,
    setLists
  ) => {
    const sourceId = source.droppableId.slice(5);
    const destinationId = destination.droppableId.slice(5);

    if (!destination) {
      return;
    }

    if (type === "LISTS") {
      console.log("lists drag");
    }

    if (type === "CARDS") {
      if (sourceId === destinationId) {
        const newlists = [...lists];
        newlists.map((list) => {
          if (Object.entries(list)[0][0] === sourceId) {
            const cardsList = list[sourceId].cards;
            cardsList.splice(source.index, 1);
            cardsList.splice(destination.index, 0, draggableId);
            return (list[sourceId].cards = cardsList);
          }
          return list;
        });

        setLists(newlists);
      } else {
        const sourceList = lists.find(
          (list) => Object.entries(list)[0][0] === sourceId
        );
        const destinationList = lists.find(
          (list) => Object.entries(list)[0][0] === destinationId
        );

        const draggedCard = sourceList[sourceId].cards.splice(source.index, 1);
        destinationList[destinationId].cards.splice(
          destination.index,
          0,
          draggedCard[0]
        );

        const newLists = lists.map((list) => {
          if (Object.entries(list)[0][0] === Object.entries(sourceList)[0][0]) {
            list = sourceList;
          } else if (
            Object.entries(list)[0][0] === Object.entries(destinationList)[0][0]
          ) {
            list = destinationList;
          }
          return list;
        });

        setLists(newLists);
      }
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles["app-header"]}>
        <h2>Dunder Mifflin Task Board</h2>
      </header>
      <div id="app-board" className={styles["app-board"]}>
        {/* <div id="app-lists" className={styles["app-lists"]}> */}
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, lists, setLists)}
        >
          {lists &&
            Object.entries(lists).map(([i, list], index) => {
              return Object.entries(list).map(([listId, listValue]) => {
                return (
                  <Droppable
                    droppableId={`lists${listId}`}
                    type="LISTS"
                    key={listId}
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
                          draggableId={listId}
                          index={index}
                          key={listId}
                        >
                          {(provided, snapshot) => (
                            <div
                              className={styles["app-lists"]}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <List
                                listId={listId}
                                listIndex={index}
                                listName={listValue.listName}
                                onSubmit={handleCreateNewCard}
                                cards={listValue.cards}
                                onDeleteList={handleDeleteList}
                                onDeleteCard={handleDeleteCard}
                                cardsData={cards}
                              />
                            </div>
                          )}
                        </Draggable>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              });
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
        {/* </div> */}
      </div>
      {/* <Login /> */}
    </div>
  );
}

export default App;
