import {
  Checkbox,
  Button,
  Group,
  TextInput,
  Badge,
  Text,
  Paper,
  Stack,
} from "@mantine/core";
import { Task } from "../../types/task";
import { DatePickerInput } from "@mantine/dates";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons-react";

type EditModeProps = {
  editingText: string;
  editingDueDate: Date | null;
  onEditTaskText: (text: string) => void;
  onEditTaskDueDate: (date: Date | null) => void;
  onSaveEditTask: () => void;
  onCancelEditTask: () => void;
};

const EditMode = ({
  editingText,
  editingDueDate,
  onEditTaskText,
  onEditTaskDueDate,
  onSaveEditTask,
  onCancelEditTask,
}: EditModeProps) => (
  <Paper p="sm" withBorder style={{ width: "100%" }}>
    <Stack gap="sm">
      <TextInput
        value={editingText}
        onChange={(e) => onEditTaskText(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSaveEditTask();
          if (e.key === "Escape") onCancelEditTask();
        }}
        autoFocus
        size="sm"
      />
      <Group wrap="wrap" gap="sm">
        <DatePickerInput
          value={editingDueDate}
          onChange={onEditTaskDueDate}
          clearable
          placeholder="期限"
          w={{ base: "100%", sm: 200 }}
          size="sm"
        />
        <Group gap="sm" style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button
            size="sm"
            color="green"
            onClick={onSaveEditTask}
            leftSection={<IconCheck size={16} />}
          >
            保存
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onCancelEditTask}
            leftSection={<IconX size={16} />}
          >
            キャンセル
          </Button>
        </Group>
      </Group>
    </Stack>
  </Paper>
);

type ViewModeProps = {
  task: Task;
  onToggleTask: (id: string) => void;
  onStartEditTask: (
    id: string,
    currentTitle: string,
    currentDueDate: string | null
  ) => void;
  onDeleteTask: (id: string) => void;
};

const ViewMode = ({
  task,
  onToggleTask,
  onStartEditTask,
  onDeleteTask,
}: ViewModeProps) => {
  const priorityColor = {
    high: "red",
    medium: "yellow",
    low: "gray",
  }[task.priority];

  const priorityLabel = {
    high: "高",
    medium: "中",
    low: "低",
  }[task.priority];

  const isOverdue =
    !task.done && task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Paper
      p="sm"
      withBorder
      style={{
        width: "100%",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "var(--mantine-shadow-md)",
        },
      }}
    >
      <Stack gap="sm">
        <Group wrap="nowrap" gap="sm">
          <Checkbox
            checked={task.done}
            label={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {task.title}
                </span>
                <Badge size="sm" color={priorityColor} variant="light">
                  {priorityLabel}
                </Badge>
              </div>
            }
            onChange={() => onToggleTask(task.id)}
            styles={{
              label: {
                textDecoration: task.done ? "line-through" : "none",
                flex: 1,
                minWidth: 0,
                fontSize: "14px",
                color: task.done ? "var(--mantine-color-gray-6)" : "inherit",
              },
            }}
          />
        </Group>
        <Group wrap="wrap" gap="sm" justify="space-between">
          {task.dueDate && (
            <Text
              size="sm"
              c={isOverdue ? "red" : "dimmed"}
              style={{ whiteSpace: "nowrap" }}
            >
              期限: {new Date(task.dueDate).toLocaleDateString("ja-JP")}
            </Text>
          )}
          <Group gap="sm" style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button
              size="sm"
              variant="subtle"
              onClick={() => onStartEditTask(task.id, task.title, task.dueDate)}
              leftSection={<IconEdit size={16} />}
            >
              編集
            </Button>
            <Button
              color="red"
              variant="subtle"
              size="sm"
              onClick={() => onDeleteTask(task.id)}
              leftSection={<IconTrash size={16} />}
            >
              削除
            </Button>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
};

type Props = {
  task: Task;
  editing: boolean;
  editingText: string;
  editingDueDate: Date | null;
  onEditTaskText: (text: string) => void;
  onEditTaskDueDate: (date: Date | null) => void;
  onSaveEditTask: () => void;
  onCancelEditTask: () => void;
  onStartEditTask: (
    id: string,
    currentTitle: string,
    currentDueDate: string | null
  ) => void;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
};

export const TaskItem = ({
  task,
  editing,
  editingText,
  editingDueDate,
  onEditTaskText,
  onEditTaskDueDate,
  onSaveEditTask,
  onCancelEditTask,
  onStartEditTask,
  onDeleteTask,
  onToggleTask,
}: Props) => (
  <div style={{ width: "100%" }}>
    {editing ? (
      <EditMode
        editingText={editingText}
        editingDueDate={editingDueDate}
        onEditTaskText={onEditTaskText}
        onEditTaskDueDate={onEditTaskDueDate}
        onSaveEditTask={onSaveEditTask}
        onCancelEditTask={onCancelEditTask}
      />
    ) : (
      <ViewMode
        task={task}
        onToggleTask={onToggleTask}
        onStartEditTask={onStartEditTask}
        onDeleteTask={onDeleteTask}
      />
    )}
  </div>
);
