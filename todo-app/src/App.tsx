// App.tsx
import { MantineProvider, createTheme } from "@mantine/core";
import { useTodoList } from "./hooks/useTodoList";
import { TodoList } from "./components/TodoList/TodoList";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const theme = createTheme({
  primaryColor: "blue",
  primaryShade: 6,
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
        shadow: "md",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Select: {
      defaultProps: {
        radius: "md",
      },
    },
    DatePickerInput: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});

// App.tsx
export default function App() {
  const { state, actions } = useTodoList();

  return (
    <MantineProvider theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      </div>
    </MantineProvider>
  );
}
