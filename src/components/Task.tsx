/*  2024-02-19 16:58:13

useSortable hook:
https://docs.dndkit.com/presets/sortable/usesortable
*/

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";
import { TaskType } from "../App";

export const Task = ({ id, title }: TaskType) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      <input type="checkbox" className="checkbox" />
      {title}
    </div>
  );
};
