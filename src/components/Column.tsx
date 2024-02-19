/*  2024-02-19 16:59:10



*/
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "./Task";

import "./Column.css";
import { TaskType } from "../App";

type ColumnProps = {
  id: string;
  tasks: TaskType[];
};

export const Column = ({ tasks }: ColumnProps) => {
  return (
    <div className="column">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} />
        ))}
      </SortableContext>
    </div>
  );
};
