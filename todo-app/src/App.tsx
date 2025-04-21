// App.tsx
import { MantineProvider } from "@mantine/core";
import { useTodoList } from "./hooks/useTodoList";
import { TodoList } from "./components/TodoList/TodoList";
import "@mantine/core/styles.css";

// App.tsx
export default function App() {
  const { state, actions } = useTodoList();

  return (
    <MantineProvider>
      <TodoList
        // Stateの展開
        tasks={state.tasks}
        newTask={state.newTask}
        editingTask={state.editingTask}
        // Actionsの展開
        setNewTaskInput={actions.setNewTaskInput}
        setNewTaskPriority={actions.setNewTaskPriority}
        setNewTaskDueDate={actions.setNewTaskDueDate}
        onAddTask={actions.addTask}
        onDeleteTask={actions.deleteTask}
        onToggleTask={actions.toggleTask}
        onStartEditTask={actions.startEditTask}
        setEditingTaskText={actions.setEditingTaskText}
        setEditingTaskDueDate={actions.setEditingTaskDueDate}
        onSaveEditTask={actions.saveEditTask}
        onCancelEditTask={actions.cancelEditTask}
      />
    </MantineProvider>
  );
}
