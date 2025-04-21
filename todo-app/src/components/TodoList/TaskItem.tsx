import { Checkbox, Button, Group, TextInput, Badge, Text } from "@mantine/core";
import { Task } from "../../types/task";
import { DatePickerInput } from "@mantine/dates";

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
  <>
    <TextInput
      value={editingText}
      onChange={(e) => onEditTaskText(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSaveEditTask();
        if (e.key === "Escape") onCancelEditTask();
      }}
      autoFocus
      style={{ flex: 1, minWidth: 0 }}
      size="xs"
    />
    <DatePickerInput
      value={editingDueDate}
      onChange={onEditTaskDueDate}
      clearable
      placeholder="期限"
      w={{ base: 90, sm: 120 }}
      size="xs"
    />
    <Button size="xs" color="green" onClick={onSaveEditTask}>
      保存
    </Button>
    <Button size="xs" variant="outline" onClick={onCancelEditTask}>
      キャンセル
    </Button>
  </>
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
    <>
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
            <Badge size="xs" color={priorityColor}>
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
          },
        }}
      />
      {task.dueDate && (
        <Text
          size="xs"
          c={isOverdue ? "red" : "dimmed"}
          ml={4}
          style={{ whiteSpace: "nowrap" }}
        >
          期限: {new Date(task.dueDate).toLocaleDateString("ja-JP")}
        </Text>
      )}
      <Button
        size="xs"
        onClick={() => onStartEditTask(task.id, task.title, task.dueDate)}
      >
        編集
      </Button>
      <Button
        color="red"
        variant="outline"
        size="xs"
        onClick={() => onDeleteTask(task.id)}
      >
        削除
      </Button>
    </>
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
  <Group justify="space-between" w="100%" wrap="nowrap" gap={4}>
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
  </Group>
);
