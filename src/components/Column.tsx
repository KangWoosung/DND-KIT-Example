/*  2024-02-19 16:59:10

strategy:
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSwappingStrategy,
  rectSortingStrategy,
  
차이가 별로 없다. 
verticalListSortingStrategy, horizontalListSortingStrategy 둘 사이에만 차이가 보이고,
디폴트 rectSortingStrategy 만으로도 충분한 것 같다. CSS 를 우선순위로 따르는 듯..

*/
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

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
      <SortableContext items={tasks} strategy={rectSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} />
        ))}
      </SortableContext>
    </div>
  );
};
