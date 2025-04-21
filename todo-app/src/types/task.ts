export type Task = {
  id: string;
  title: string;
  done: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string | null;
};
