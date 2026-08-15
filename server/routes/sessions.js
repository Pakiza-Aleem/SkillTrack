import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

// GET all sessions
router.get("/", async (req, res) => {
  const sessions = await Session.find();
  res.status(200).json(sessions);
});

// GET one session
router.get("/:id", async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return res.status(404).json({
      message: "Session not found"
    });
  }

  res.status(200).json(session);
});

// POST new session
router.post("/", async (req, res) => {
  const session = await Session.create(req.body);

  res.status(201).json(session);
});

// PUT update session
router.put("/:id", async (req, res) => {
  const session = await Session.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!session) {
    return res.status(404).json({
      message: "Session not found"
    });
  }

  res.status(200).json(session);
});

// DELETE session
router.delete("/:id", async (req, res) => {
  const session = await Session.findByIdAndDelete(req.params.id);

  if (!session) {
    return res.status(404).json({
      message: "Session not found"
    });
  }

  res.status(200).json({
    message: "Session deleted successfully"
  });
});

export default router;