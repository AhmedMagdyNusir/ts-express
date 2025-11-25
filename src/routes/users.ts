import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "@/controllers/users";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
