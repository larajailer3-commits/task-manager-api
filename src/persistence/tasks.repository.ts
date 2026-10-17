
import pool from "../db";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  due_date: string | null;
  status: "pendiente" | "en curso" | "completada";
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  due_date?: string | null;
  status?: "pendiente" | "en curso" | "completada";
}

export async function findAllByUser(userId: number): Promise<Task[]> {
  const result = await pool.query(
    `SELECT id, title, description, due_date, status, user_id, created_at, updated_at
     FROM tasks
     WHERE user_id = $1
     ORDER BY id DESC`,
    [userId]
  );

  return result.rows;
}

export async function createTask(
  userId: number,
  data: CreateTaskData
): Promise<Task> {
  const result = await pool.query(
    `INSERT INTO tasks (title, description, due_date, status, user_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, title, description, due_date, status, user_id, created_at, updated_at`,
    [
      data.title,
      data.description ?? null,
      data.due_date ?? null,
      data.status ?? "pendiente",
      userId,
    ]
  );

  return result.rows[0];
}

export async function findByIdAndUser(
  taskId: number,
  userId: number
): Promise<Task | null> {
  const result = await pool.query(
    `SELECT id, title, description, due_date, status, user_id, created_at, updated_at
     FROM tasks
     WHERE id = $1 AND user_id = $2`,
    [taskId, userId]
  );

  return result.rows[0] ?? null;
}

export async function updateTask(
  taskId: number,
  userId: number,
  data: CreateTaskData
): Promise<Task | null> {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1,
         description = $2,
         due_date = $3,
         status = $4,
         updated_at = NOW()
     WHERE id = $5 AND user_id = $6
     RETURNING id, title, description, due_date, status, user_id, created_at, updated_at`,
    [
      data.title,
      data.description ?? null,
      data.due_date ?? null,
      data.status ?? "pendiente",
      taskId,
      userId,
    ]
  );

  return result.rows[0] ?? null;
}

export async function deleteTask(
  taskId: number,
  userId: number
): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM tasks
     WHERE id = $1 AND user_id = $2
     RETURNING id`,
    [taskId, userId]
  );

  return result.rowCount !== null && result.rowCount > 0;
}
