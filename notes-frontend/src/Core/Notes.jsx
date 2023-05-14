import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from 'react-bootstrap';
import axios from 'axios';

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  // Fetch notes on load
  useEffect(() => {
    getAllNotes();
  }, []);

  // Function to fetch notes from the server
  const getAllNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-note');
      const { data } = response;
      setNotes(data);
    } catch (error) {
      console.log('Error fetching notes:', error);
    }
  };

  // Function to save a note to the server
  const saveNote = async (note) => {
    try {
      await axios.post('http://localhost:5000/api/add-note', note);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  // Function to update a note to the server
  const updateNote = async (note) => {
    try {
      console.log(note);
      await axios.put(`http://localhost:5000/api/update-note/${note.id}`, note);
    } catch (error) {
      console.log('Error saving note:', error);
    } 
  }

  // Function to delete a note from the server
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-note/${id}`);
    } catch (error) {
      console.log('Error deleting note:', error);
    }
  };

  // Function to handle note creation or update
  const handleNoteSave = async () => {
    const note = {
      id: editNoteId,
      title,
      content,
    };

    if (editMode && editNoteId) {
      // Editing existing note
      const updatedNotes = notes.map((note) =>
        note.id === editNoteId ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);
      await updateNote(note);
    } else {
      // Creating new note
      const newNote = {
        ...note,
        id: Date.now(),
      };
      setNotes([...notes, newNote]);
      await saveNote(newNote);
    }

    // Reset form fields
    setTitle('');
    setContent('');
    setEditNoteId(null);
    setEditMode(false);
    setShowModal(false);
  };

  // Function to handle note deletion
  const handleDeleteNote = async (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    await deleteNote(id);
  };

  // Function to enable editing mode for a note
  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setEditNoteId(id);
      setEditMode(true);
      setShowModal(true);
    }
  };

  // Function to handle canceling note creation or editing
  const handleCancelNote = () => {
    setTitle('');
    setContent('');
    setEditNoteId(null);
    setEditMode(false);
    setShowModal(false);
  };

  // Function to format the note ID as date and time
  const formatDateTime = (id) => {
    const date = new Date(parseInt(id));
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h2>Note App</h2>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Create Note
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {notes.map((note) => (
            <Card key={note.id} className="mb-3">
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <Card.Subtitle>{formatDateTime(note.id)}</Card.Subtitle>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleEditNote(note.id)}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCancelNote}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Note' : 'Create Note'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="noteTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="noteContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelNote}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleNoteSave}>
            {editMode ? 'Save Changes' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default NoteApp;
