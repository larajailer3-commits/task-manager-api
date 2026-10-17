
import {
  findAllByUser,
  createTask,
  findByIdAndUser,
  updateTask,
  deleteTask,
  type CreateTaskData,
} from "../persistence/tasks.repository";

export async function getTasks(userId: number) {
  return findAllByUser(userId);
}

export async function getTaskById(
  taskId: number,
  userId: number
) {
  return findByIdAndUser(taskId, userId);
}

export async function createNewTask(
  userId: number,
  data: CreateTaskData
) {
  return createTask(userId, data);
}

export async function updateExistingTask(
  taskId: number,
  userId: number,
  data: CreateTaskData
) {
  return updateTask(taskId, userId, data);
}

export async function removeTask(
  taskId: number,
  userId: number
) {
  return deleteTask(taskId, userId);
}
