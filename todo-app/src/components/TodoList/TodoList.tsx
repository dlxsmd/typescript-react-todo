import { Paper, Stack, Title, Text } from "@mantine/core";
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
    shadow="lg"
    p={{ base: "sm", sm: "md", md: "lg" }}
    maw={{ base: "100%", sm: 600, md: 800 }}
    w="100%"
    mx="auto"
    mt={{ base: 0, sm: "md", md: "xl" }}
    style={{
      display: "flex",
      flexDirection: "column",
      background: "white",
      minHeight: "100vh",
      boxSizing: "border-box",
    }}
  >
    <Stack w="100%" style={{ flex: 1 }} gap="md">
      <div>
        <Title order={2} c="blue.7" mb="xs" ta={{ base: "center", sm: "left" }}>
          タスク管理
        </Title>
        <Text c="dimmed" size="sm" ta={{ base: "center", sm: "left" }}>
          今日のタスクを管理しましょう
        </Text>
      </div>
      <TaskForm
        input={props.newTask.input}
        onInputChange={props.setNewTaskInput}
        onAddTask={props.onAddTask}
        priority={props.newTask.priority}
        setPriority={props.setNewTaskPriority}
        dueDate={props.newTask.dueDate}
        setDueDate={props.setNewTaskDueDate}
      />
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.5rem",
          contain: "content",
        }}
      >
        <Stack gap="sm">
          {props.tasks.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">
              タスクがありません。新しいタスクを追加しましょう！
            </Text>
          ) : (
            props.tasks.map((task) => (
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
            ))
          )}
        </Stack>
      </div>
    </Stack>
  </Paper>
);
