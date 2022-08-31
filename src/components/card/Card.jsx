import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CheckSquare, Clock } from "react-feather";
import Dropdown from "../dropdown/Dropdown";
import Label from "../label/Label";
import styles from "./card.module.css";
// import { v4 } from "uuid";
import { getCardsDropStyle } from "../../utils/style";
import CardInfo from "../cardInfo/CardInfo";

function Card({ listCards, onSelect, listId, cardsData, labelsData }) {
  const newCards = [...cardsData];
  return (
    <Droppable droppableId={`cards${listId}`} type="CARDS">
      {(provided, snapshot) => (
        <div
          className={getCardsDropStyle(snapshot.isDraggingOver)}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {listCards &&
            listCards.map((card, index) => {
              const cardInfo = newCards.filter((data) => data.id === card)[0];
              return (
                cardInfo && (
                  <div key={index}>
                    <Draggable draggableId={card} index={index} key={card}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className={styles.card}>
                            {/* <CardInfo /> */}
                            <div className={styles["card-top"]}>
                              <div className={styles["card-top-labels"]}>
                                {cardInfo[0] !== "empty" &&
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
                              <Dropdown
                                list={[{ label: "Delete card", value: 1 }]}
                                onSelect={onSelect}
                                componentId={cardInfo.id}
                                listId={listId}
                              />
                            </div>
                            <div className={styles["card-title"]}>
                              {cardInfo.cardName}
                            </div>
                            <div className={styles["card-footer"]}>
                              <p>
                                <Clock />
                                18 August
                              </p>
                              <p>
                                <CheckSquare />
                                1/3
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  </div>
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
