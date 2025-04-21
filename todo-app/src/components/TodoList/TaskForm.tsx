import { TextInput, Button, Select, Group, Paper, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";

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
  <Paper p="md" withBorder>
    <Stack gap="md">
      <TextInput
        w="100%"
        placeholder="新しいタスクを入力"
        value={input}
        onChange={(e) => onInputChange(e.currentTarget.value)}
        onKeyDown={(e) => e.key === "Enter" && onAddTask()}
        size="md"
        styles={{
          input: {
            "&:focus": {
              borderColor: "var(--mantine-color-blue-6)",
            },
          },
        }}
      />
      <Group grow wrap="wrap" gap="md">
        <DatePickerInput
          label="期限"
          placeholder="日付を選択"
          value={dueDate}
          onChange={setDueDate}
          clearable
          w={{ base: "100%", sm: "auto" }}
          size="md"
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
          w={{ base: "100%", sm: "auto" }}
          size="md"
        />
      </Group>
      <Button
        onClick={onAddTask}
        color="blue"
        w="100%"
        size="md"
        leftSection={<IconPlus size={16} />}
        styles={{
          root: {
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
        }}
      >
        タスクを追加
      </Button>
    </Stack>
  </Paper>
);
