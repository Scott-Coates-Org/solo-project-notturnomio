import React, { useState, useEffect } from "react";
import styles from "./cardInfo.module.css";
import Modal from "../modal/Modal";
import {
  Calendar,
  CheckSquare,
  FileText,
  List,
  Tag,
  Type,
  X,
} from "react-feather";
import AddMenu from "../edit/AddMenu";
import { database } from "../../firebase/client";
import { remove, ref, update, set, onValue } from "firebase/database";
import Label from "../label/Label";
import { v4 } from "uuid";
import Task from "../task/Task";

const labelColors = [
  "orange",
  "yellowgreen",
  "turquoise",
  "coral",
  "mediumslateblue",
  "deeppink",
  "dodgerblue",
  "gold",
];

function CardInfo({ onClose, card, labelsData }) {
  const [editedCard, setEditedCard] = useState(card);
  const [labelActiveColor, setLabelActiveColor] = useState("orange");

  const [tasksData, setTasksData] = useState();

  useEffect(() => {
    geTasksData();
    // console.log(tasksData);
  }, [setTasksData]);

  async function geTasksData() {
    try {
      const content = ref(database, "cardTasks");
      onValue(content, (snapshot) => {
        const data = snapshot.val();
        const tasksArray = [];
        for (const task in data) {
          tasksArray.push(data[task]);
        }
        setTasksData(tasksArray);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleEditCardTitle = async (e) => {
    try {
      e.preventDefault();
      const newCardName = e.target[0].value;
      await update(ref(database, "cards/" + editedCard.id), {
        ...editedCard,
        cardName: newCardName,
      });
      setEditedCard({
        ...editedCard,
        cardName: newCardName,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditCardDescription = async (e) => {
    try {
      e.preventDefault();
      const newDescription = e.target[0].value;
      await update(ref(database, "cards/" + editedCard.id), {
        ...editedCard,
        description: newDescription,
      });
      setEditedCard({
        ...editedCard,
        description: newDescription,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddNewLabel = async (e) => {
    try {
      e.preventDefault();
      const newLabelName = e.target[0].value;
      const newLabelId = v4();
      const cardLabels = editedCard.label;
      if (cardLabels[0] === "empty") {
        cardLabels[0] = newLabelId;
      } else {
        cardLabels.push(newLabelId);
      }
      await update(ref(database, "cards/" + editedCard.id), {
        ...editedCard,
        label: cardLabels,
      });
      await update(ref(database, "cardLabels/" + newLabelId), {
        color: labelActiveColor,
        id: newLabelId,
        labelName: newLabelName,
      });
      setEditedCard({
        ...editedCard,
        label: cardLabels,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddNewTask = async (e) => {
    try {
      e.preventDefault();
      const newTaskName = e.target[0].value;
      const newTaskId = v4();
      let cardTasks = [];
      if (editedCard.hasOwnProperty("task")) {
        cardTasks = editedCard.task;
        cardTasks.push(newTaskId);
      } else {
        cardTasks = [newTaskId];
      }
      await set(ref(database, "cards/" + editedCard.id), {
        ...editedCard,
        task: cardTasks,
      });
      await set(ref(database, "cardTasks/" + newTaskId), {
        checked: false,
        id: newTaskId,
        taskName: newTaskName,
      });
      setEditedCard({
        ...editedCard,
        task: cardTasks,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleToggleCheckedTask = async ({ e, id }) => {
    try {
      const checked = e.target.checked;
      const task = tasksData.filter((task) => task.id === id);
      await set(ref(database, "cardTasks/" + id), {
        ...task[0],
        checked: checked,
      });
      const tasksList = tasksData.map((task) => {
        if (task.id === id) {
          task.checked = checked;
        }
        return task;
      });
      setTasksData(tasksList);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteTask = async (removingId) => {
    try {
      const cardTasks = editedCard.task;
      const filteredTasks = cardTasks.filter((TaskId) => TaskId !== removingId);

      await update(ref(database, "cards/" + editedCard.id), {
        ...editedCard,
        task: filteredTasks,
      });
      await remove(ref(database, "cardTasks/" + removingId));
      setEditedCard({
        ...editedCard,
        task: filteredTasks,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal onClose={() => onClose()}>
      <div className={styles.cardInfo}>
        <div className={styles["cardInfo-box"]}>
          <div className={styles["cardInfo-box-title"]}>
            <Type />
            {editedCard.cardName}
          </div>
          <div className={styles["cardInfo-box-body"]}>
            <AddMenu
              buttonText="Edit title"
              submitText="Save"
              onSubmit={handleEditCardTitle}
              placeholder={card.cardName}
              menuFormTextClass={styles["add-card-button"]}
            />
          </div>
        </div>
        <div className={styles["cardInfo-box"]}>
          <div className={styles["cardInfo-box-title"]}>
            <FileText />
            Description
          </div>
          <div className={styles["cardInfo-box-body"]}>
            {editedCard.description && <p>{editedCard.description}</p>}
            <AddMenu
              buttonText="Edit description"
              submitText="Save"
              onSubmit={handleEditCardDescription}
              placeholder={card.description || "Enter description"}
              menuFormTextClass={styles["add-card-button"]}
              description="description"
            />
          </div>
        </div>
        <div className={styles["cardInfo-box"]}>
          <div className={styles["cardInfo-box-title"]}>
            <Calendar />
            Due date &amp; time
          </div>
          <div
            className={`${styles["cardInfo-box-body"]} ${styles["cardInfo-box-date"]}`}
          >
            <input
              type="date"
              defaultValue={editedCard.date ? editedCard.date["date"] : ""}
            />
            <input
              type="time"
              defaultValue={editedCard.date ? editedCard.date["time"] : ""}
            />
          </div>
        </div>
        <div className={styles["cardInfo-box"]}>
          <div className={styles["cardInfo-box-title"]}>
            <Tag />
            Labels
          </div>
          <div className={styles["cardInfo-box-body"]}>
            <div className={styles["cardInfo-box-body-labels"]}>
              {editedCard?.label &&
                editedCard.label.map((id) => {
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
                })}{" "}
            </div>
            <div className={styles["cardInfo-box-body-add-label"]}>
              <h5>Add new label</h5>
              <div className={styles["cardInfo-box-label-colors"]}>
                {labelColors.map((item, index) => (
                  <li
                    key={index}
                    style={{ backgroundColor: item }}
                    className={
                      item === labelActiveColor ? styles["active"] : ""
                    }
                    onClick={() => setLabelActiveColor(item)}
                  />
                ))}{" "}
                {/* <X onClick={() => setLabelActiveColor("")} /> */}
              </div>
              <AddMenu
                buttonText="Add label name"
                submitText="Save"
                onSubmit={handleAddNewLabel}
                placeholder={card.description || "Enter label name"}
                menuFormTextClass={styles["add-card-button"]}
              />
            </div>
          </div>
        </div>
        {tasksData && (
          <div className={styles["cardInfo-box"]}>
            <div className={styles["cardInfo-box-title"]}>
              <CheckSquare />
              Tasks
            </div>
            <div className={styles["cardInfo-box-body"]}>
              <div className={styles["cardInfo-box-body-tasks"]}>
                {editedCard?.task &&
                  editedCard.task.map((id) => {
                    const task = tasksData.filter(
                      (taskData) => taskData.id === id
                    )[0];
                    return (
                      task !== undefined && (
                        <Task
                          key={task.id}
                          id={task.id}
                          name={task.taskName}
                          checked={task.checked}
                          onRemove={handleDeleteTask}
                          onChecked={handleToggleCheckedTask}
                        />
                      )
                    );
                  })}
              </div>
              <AddMenu
                buttonText="Add Task"
                submitText="Save"
                onSubmit={handleAddNewTask}
                placeholder={"Enter new task"}
                menuFormTextClass={styles["add-card-button"]}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CardInfo;
