import { Request, Response, NextFunction } from "express";
import ApiError from "@/utils/classes/ApiError";

interface User {
  id: number;
  name: string;
  email: string;
}

// In-memory storage
let users: User[] = [];
let nextId = 1;

export function createUser(req: Request, res: Response) {
  const { name, email } = req.body;
  const newUser: User = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
}

export function getUsers(req: Request, res: Response) {
  res.json(users);
}

export function getUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);
  if (!user) return next(new ApiError(404, "User not found."));
  res.json(user);
}

export function updateUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return next(new ApiError(404, "User not found."));
  const { name, email } = req.body;
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  res.json(users[userIndex]);
}

export function deleteUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return next(new ApiError(404, "User not found."));
  users.splice(userIndex, 1)[0];
  res.sendStatus(204);
}
