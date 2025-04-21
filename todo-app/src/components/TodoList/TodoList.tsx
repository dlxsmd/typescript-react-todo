import { Paper, Stack } from "@mantine/core";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";
import { Task } from "../../types/task";

type Props = {
  // State
  tasks: Task[];
  newTask: {
    input: string;
    priority: "high" | "medium" | "low";
    dueDate: Date | null;
  };
  editingTask: {
    id: string | null;
    text: string;
    dueDate: Date | null;
  };
  // Actions
  setNewTaskInput: (value: string) => void;
  setNewTaskPriority: (priority: "high" | "medium" | "low") => void;
  setNewTaskDueDate: (date: Date | null) => void;
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onStartEditTask: (
    id: string,
    currentTitle: string,
    currentDueDate: string | null
  ) => void;
  setEditingTaskText: (text: string) => void;
  setEditingTaskDueDate: (date: Date | null) => void;
  onSaveEditTask: () => void;
  onCancelEditTask: () => void;
};

export const TodoList = (props: Props) => (
  <Paper
    shadow="xs"
    p={{ base: "sm", sm: "md" }}
    maw={{ base: "100%", sm: 600 }}
    w="100%"
    mx="auto"
    mt={{ base: 0, sm: "xl" }}
    h={{ base: "100vh", sm: "auto" }}
    style={{
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Stack w="100%" style={{ flex: 1 }} gap="sm">
      <TaskForm
        input={props.newTask.input}
        onInputChange={props.setNewTaskInput}
        onAddTask={props.onAddTask}
        priority={props.newTask.priority}
        setPriority={props.setNewTaskPriority}
        dueDate={props.newTask.dueDate}
        setDueDate={props.setNewTaskDueDate}
      />
      <Stack w="100%" style={{ flex: 1, overflowY: "auto" }} gap="xs">
        {props.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editing={props.editingTask.id === task.id}
            editingText={props.editingTask.text}
            editingDueDate={
              props.editingTask.id === task.id
                ? props.editingTask.dueDate
                : null
            }
            onEditTaskText={props.setEditingTaskText}
            onEditTaskDueDate={props.setEditingTaskDueDate}
            onSaveEditTask={props.onSaveEditTask}
            onCancelEditTask={props.onCancelEditTask}
            onStartEditTask={props.onStartEditTask}
            onDeleteTask={props.onDeleteTask}
            onToggleTask={props.onToggleTask}
          />
        ))}
      </Stack>
    </Stack>
  </Paper>
);
