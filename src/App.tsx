/*  2024-02-19 16:48:31

Whole Project Code from :
https://github.com/CodeCompleteYT/react-drag-and-drop 

required dependencies:
npm install @dnd-kit/core @dnd-kit/utilities @dnd-kit/sortable

Key Concepts of this dnd-kit:
  DndContext          --from "@dnd-kit/core";
    SortableContext   --from "@dnd-kit/sortable";
      useSortable     --from "@dnd-kit/sortable";
      CSS             --from "@dnd-kit/utilities";

1. DndContext
  <DndContext
    sensors={sensors}
    collisionDetection={closestCorners}
    onDragEnd={handleDragEnd}
  >
    <Column id="toDo" tasks={tasks} />
  </DndContext>
2. SortableContext
  <SortableContext 
    items={tasks} 
    strategy={verticalListSortingStrategy}
  >
    {tasks.map((task) => (
      <Task key={task.id} id={task.id} title={task.title} />
    ))}
  </SortableContext>
3. useSortable
  <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    className="task"
  >
    {title}
  </div>


2024-02-19 20:35:57
Couldn't find official Doc for arrayMove function.
It seems to be:
  arrayMove<T>(array: T[], from: number | string, to: number | string): T[]
  It swaps [from] and [to] index of [array] and returns new array.

*/

import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import "./App.css";
import { Column } from "./components/Column";
import { Input } from "./components/Input";

export type TaskType = {
  id: number;
  title: string;
};

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "84 미화에게 편지쓰기" },
    { id: 2, title: "08 혜진에게 전화하기" },
    { id: 3, title: "87 외숙에게 고백하기" },
    { id: 4, title: "93 인아에게 선물하기" },
  ]);

  // Add New Task
  const addTask = (title: string) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  // Listening to sensors from different input devices
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //
  const getTaskPos = (id: number) => tasks.findIndex((task) => task.id === id);

  // DragEndEvent handler
  // Record new Order
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over?.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(Number(active.id));
      const newPos = getTaskPos(Number(over.id));

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="App">
      <h1>DND-KIT Example</h1>
      <Input onSubmit={addTask} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column id="toDo" tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
