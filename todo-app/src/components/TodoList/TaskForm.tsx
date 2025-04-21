import { TextInput, Button, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

type Props = {
  input: string;
  dueDate: Date | null;
  priority: "high" | "medium" | "low";
  onInputChange: (value: string) => void;
  onAddTask: () => void;
  setPriority: (priority: "high" | "medium" | "low") => void;
  setDueDate: (date: Date | null) => void;
};

export const TaskForm = ({
  input,
  priority,
  dueDate,
  onInputChange,
  onAddTask,
  setPriority,
  setDueDate,
}: Props) => (
  <>
    <TextInput
      w="100%"
      placeholder="タスクを入力"
      value={input}
      onChange={(e) => onInputChange(e.currentTarget.value)}
      onKeyDown={(e) => e.key === "Enter" && onAddTask()}
    />
    <DatePickerInput
      label="期限"
      placeholder="日付を選択"
      value={dueDate}
      onChange={setDueDate}
      clearable
      w="100%"
    />
    <Select
      label="優先度"
      data={[
        { value: "high", label: "高" },
        { value: "medium", label: "中" },
        { value: "low", label: "低" },
      ]}
      value={priority}
      onChange={(value) => setPriority(value as "high" | "medium" | "low")}
    />
    <Button onClick={onAddTask} color="blue" w="100%">
      追加
    </Button>
  </>
);
