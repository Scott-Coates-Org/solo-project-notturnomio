import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CheckSquare, Clock } from "react-feather";
import Dropdown from "../dropdown/Dropdown";
import Label from "../label/Label";
import styles from "./card.module.css";
// import { v4 } from "uuid";
import { getCardsDropStyle } from "../../utils/style";
import CardInfo from "../cardInfo/CardInfo";
import { cardDateFormat } from "../../utils/dateFormat";

function Card({
  listCards,
  onSelect,
  listId,
  cardsData,
  labelsData,
  tasksData,
}) {
  const [showModal, setShowModal] = useState(false);
  const [cardObj, setCardObj] = useState({});
  const [tasks, setTasks] = useState(tasksData);
  const newCards = [...cardsData];

  const handleOpenCardInfo = (cardInfo) => {
    setCardObj(cardInfo);
    setShowModal(true);
  };

  const handleCardTasksInfo = (cardInfo) => {
    let tasksCount = 0;
    let checkedCount = 0;
    if (!cardInfo.task) {
      return `${checkedCount}/${tasksCount}`;
    } else {
      const tasksChecked = tasks.filter((task) => task.checked === true);
      console.log(tasksChecked);
      tasksCount = cardInfo.task.length;
      checkedCount = tasksChecked.length;
      return `${checkedCount}/${tasksCount}`;
    }
  };

  useEffect(() => {}, [tasks]);

  return (
    <Droppable droppableId={`cards${listId}`} type="CARDS">
      {(provided, snapshot) => (
        <div
          className={`${getCardsDropStyle(snapshot.isDraggingOver)} ${
            styles["cards-container"]
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {listCards &&
            listCards.map((card, index) => {
              const cardInfo = newCards.filter((data) => data.id === card)[0];

              return (
                cardInfo && (
                  <Draggable draggableId={card} index={index} key={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {showModal && (
                          <CardInfo
                            onClose={() => setShowModal(false)}
                            card={cardObj}
                            labelsData={labelsData}
                            tasksData={tasksData}
                          />
                        )}
                        <div
                          className={styles.card}
                          onClick={() => handleOpenCardInfo(cardInfo)}
                        >
                          <div className={styles["card-top"]}>
                            <div className={styles["card-top-labels"]}>
                              {cardInfo.label !== "empty" &&
                                cardInfo.label.map((id) => {
                                  const label = labelsData.filter(
                                    (labelData) => labelData.id === id
                                  )[0];
                                  return (
                                    label !== undefined && (
                                      <Label
                                        key={label.id}
                                        close
                                        text={label.labelName}
                                        color={label.color}
                                      />
                                    )
                                  );
                                })}
                            </div>
                            <div className="card-top-dd-button">
                              <Dropdown
                                list={[{ label: "Delete card", value: 1 }]}
                                onSelect={onSelect}
                                componentId={cardInfo.id}
                                listId={listId}
                              />
                            </div>
                          </div>
                          <div className={styles["card-title"]}>
                            {cardInfo.cardName}
                          </div>
                          <div className={styles["card-footer"]}>
                            {cardInfo.date && (
                              <p className={styles["card-footer-date"]}>
                                <Clock />
                                {`${cardInfo.date.time} - ${cardDateFormat(
                                  cardInfo.date.date
                                )}`}
                              </p>
                            )}

                            <p className={styles["card-footer-tasks"]}>
                              <CheckSquare />
                              {handleCardTasksInfo(cardInfo)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              );
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Card;
