import { useState, useEffect } from "react";
import { Task } from "../types/task";

const STORAGE_KEY = "todo-tasks";

export const useTodoList = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data
      ? JSON.parse(data).map((task: any) => ({
          ...task,
          priority: task.priority || "medium",
        }))
      : [];
  });

  // 新規作成用の状態
  const [newTask, setNewTask] = useState({
    input: "",
    priority: "medium" as "high" | "medium" | "low",
    dueDate: null as Date | null,
  });

  // 編集用の状態
  const [editingTask, setEditingTask] = useState({
    id: null as string | null,
    text: "",
    dueDate: null as Date | null,
  });

  // tasksが変化するたびにlocalStorageへ保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addTask = () => {
    if (newTask.input.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: newTask.input,
        done: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate ? formatDateLocal(newTask.dueDate) : null,
      },
    ]);
    setNewTask({
      input: "",
      priority: "medium",
      dueDate: null,
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const startEditTask = (
    id: string,
    currentTitle: string,
    currentDueDate: string | null
  ) => {
    setEditingTask({
      id,
      text: currentTitle,
      dueDate: currentDueDate
        ? (() => {
            const [year, month, day] = currentDueDate.split("-").map(Number);
            const date = new Date(year, month - 1, day);
            date.setHours(12, 0, 0, 0);
            return date;
          })()
        : null,
    });
  };

  const saveEditTask = () => {
    if (!editingTask.id || editingTask.text.trim() === "") return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: editingTask.text,
              dueDate: editingTask.dueDate
                ? formatDateLocal(editingTask.dueDate)
                : null,
            }
          : task
      )
    );
    setEditingTask({
      id: null,
      text: "",
      dueDate: null,
    });
  };

  const cancelEditTask = () => {
    setEditingTask({
      id: null,
      text: "",
      dueDate: null,
    });
  };

  const getPriorityValue = (priority: string) => {
    switch (priority) {
      case "high":
        return 3;
      case "medium":
        return 2;
      case "low":
        return 1;
      default:
        return 0;
    }
  };

  const sortedTasks = tasks.sort(
    (a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority)
  );

  return {
    state: {
      tasks: sortedTasks,
      newTask,
      editingTask,
    },
    actions: {
      setNewTaskInput: (input: string) =>
        setNewTask((prev) => ({ ...prev, input })),
      setNewTaskPriority: (priority: "high" | "medium" | "low") =>
        setNewTask((prev) => ({ ...prev, priority })),
      setNewTaskDueDate: (dueDate: Date | null) =>
        setNewTask((prev) => ({ ...prev, dueDate })),
      setEditingTaskText: (text: string) =>
        setEditingTask((prev) => ({ ...prev, text })),
      setEditingTaskDueDate: (dueDate: Date | null) =>
        setEditingTask((prev) => ({ ...prev, dueDate })),
      addTask,
      deleteTask,
      toggleTask,
      startEditTask,
      saveEditTask,
      cancelEditTask,
    },
  };
};
