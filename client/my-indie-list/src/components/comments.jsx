import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEllipsisV, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Comments = ({ gameId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('/comments')
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    fetch('http://localhost:5020/comments/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: 'Nome autore',
        text: newComment,
        post: gameId
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data.payload]);
        setNewComment('');
        inputRef.current.blur();
      });
  };

  const handleDeleteComment = (id) => {
    // Mostra un popup di conferma
    if (window.confirm('Sei sicuro di voler eliminare questo commento?')) {
      fetch(`http://localhost:5020/comments/delete/${id}`, { method: 'DELETE' }).then(() => {
        setComments(comments.filter((comment) => comment._id !== id));
      });
    }
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <h3>Commenti</h3>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id} style={{ backgroundColor: '#343a40', border: "none", color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>{comment.text}</div>
              <Dropdown style={{ marginLeft: "10px" }}>
                <Dropdown.Toggle as="div" variant="none" id="dropdown-basic">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDeleteComment(comment._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Elimina
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Form.Control
          ref={inputRef}
          className="textbar"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Scrivi un commento..."
        />
        <Button onClick={handleAddComment}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </div>
    </div>
  );
};

export default Comments;
