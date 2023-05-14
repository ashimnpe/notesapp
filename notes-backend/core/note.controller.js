const Note = require("./note.model");

const addNote = async (req, res, next) => {
  const { title, content, id } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const newNote = await Note.create({ title, content, id });
    res.status(200).json(newNote);
  } catch (error) {
    console.log("Error creating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll();
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error fetching notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title;
    note.content = content;
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    console.log("Error updating note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNote = async (req, res, next) => {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.destroy();

    res.sendStatus(204);
  } catch (error) {
    console.log("Error deleting note:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addNote, getAllNotes, updateNote, deleteNote };
