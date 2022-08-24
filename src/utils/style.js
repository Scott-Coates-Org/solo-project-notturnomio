import listStyles from "../app.module.css";
import cardStyles from "../components/list/list.module.css";

export const getListsDropStyle = (isDraggingOver) => {
  return isDraggingOver
    ? listStyles["app-list-dragging-over"]
    : listStyles["app-list-dragging"];
};

export const getCardsDropStyle = (isDraggingOver) => {
  return isDraggingOver
    ? cardStyles["list-cards-dragging-over"]
    : cardStyles["list-cards-dragging"];
};
