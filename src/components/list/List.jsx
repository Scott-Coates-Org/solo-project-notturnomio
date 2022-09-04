import React from "react";
import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import AddMenu from "../edit/AddMenu";
import styles from "./list.module.css";

function List({
  listId,
  listIndex,
  listName,
  onSubmit,
  cards,
  onDeleteList,
  onDeleteCard,
  cardsData,
  labelsData,
  tasksData,
}) {
  return (
    <div id={listId} className={styles.list} key={listId + listIndex}>
      <div className={styles["list-top"]}>
        <p className={styles["list-top-title"]}>
          {listName} &nbsp; {<span>{cards && cards.length.toString()}</span>}
        </p>
        <Dropdown
          list={[{ label: "Delete list", value: 1 }]}
          onSelect={onDeleteList}
          componentId={listId}
        />
      </div>
      <div className={styles["list-cards"]}>
        <Card
          listCards={cards}
          cardsData={cardsData}
          labelsData={labelsData}
          tasksData={tasksData}
          listId={listId}
          onSelect={onDeleteCard}
        />
        <AddMenu
          buttonText="Add New Task"
          submitText="Add Task"
          onSubmit={onSubmit}
          placeholder="Enter task title"
          menuFormTextClass={styles["add-new-card"]}
          id={listId}
        />
      </div>
    </div>
  );
}

export default List;
