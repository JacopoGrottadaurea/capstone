// AddGameForm.jsx
import React, { useState } from 'react';
import '../style/gameform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddGameForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [url, setUrl] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genres, setGenres] = useState([]);
  const [galleryFields, setGalleryFields] = useState([0]);

  const indieGameGenres = ['Action', 'Adventure', 'Casual', 'Card Game', 'Horror', 'Multiplayer', 'Racing', 'RPG', 'Simulation', 'Sports', 'Strategy'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    let isValid = true;
    let errorMessage = 'Per favore, compila i seguenti campi obbligatori:';
    if (!title) {
      document.getElementById('title').classList.add('invalid');
      errorMessage += '\n- Titolo';
      isValid = false;
    }
    if (!description) {
      document.getElementById('description').classList.add('invalid');
      errorMessage += '\n- Descrizione';
      isValid = false;
    }
    if (!image) {
      document.getElementById('image').classList.add('invalid');
      errorMessage += '\n- Immagine';
      isValid = false;
    }
    if (!isValid) {
      alert(errorMessage);
      return;
    }
    try {
      const response = await fetch('http://localhost:5020/addgames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, image, gallery, videoId, url, releaseDate, genres })
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        // Mostra un messaggio di errore se il gioco esiste già
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveGalleryField = () => {
    // Rimuovi l'ultimo campo dalla galleria
    setGalleryFields(galleryFields.slice(0, -1));
  };


  const handleAddGalleryField = () => {
    setGalleryFields([...galleryFields, galleryFields.length]);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titolo:</label>
        <input type="text" id="title" value={title} onChange={event => setTitle(event.target.value)} required />
        <br />
        <label htmlFor="description">Descrizione:</label>
        <textarea id="description" value={description} onChange={event => setDescription(event.target.value)} required />
        <br />
        <label htmlFor="image">Immagine:</label>
        <input type="text" id="image" value={image} onChange={event => setImage(event.target.value)} required />
        <br />
        <div>Galleria:</div>
        {galleryFields.map((field, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              id={`gallery-${index}`}
              value={gallery[index]}
              onChange={event => {
                let newGallery = [...gallery];
                newGallery[index] = event.target.value;
                setGallery(newGallery);
              }}
            />
            <br />
          </React.Fragment>
        ))}
        <div className="gallery-buttons">
          <button type="button" onClick={handleAddGalleryField}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button type="button" onClick={handleRemoveGalleryField}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <br />
        <label htmlFor="videoId">Indirizzo ID del video:</label>
        <input type="text" id="videoId" value={videoId} onChange={event => setVideoId(event.target.value)} />
        <br />
        <label htmlFor="url">URL:</label>
        <input type="text" id="url" value={url} onChange={event => setUrl(event.target.value)} />
        <br />
        <label htmlFor="releaseDate">Data di rilascio:</label>
        <input type="date" id="releaseDate" value={releaseDate} onChange={event => setReleaseDate(event.target.value)} />
        <br />
        <div>Generi:</div>
        <div className="genres-container">
          {indieGameGenres.map(genre => (
            <div key={genre}>
              <label htmlFor={`genre-${genre}`}>{genre}</label>
              <input
                type="checkbox"
                id={`genre-${genre}`}
                value={genre}
                checked={genres.includes(genre)}
                onChange={event => {
                  if (event.target.checked) {
                    setGenres([...genres, genre]);
                  } else {
                    setGenres(genres.filter(g => g !== genre));
                  }
                }}
              />
            </div>
          ))}
        </div>
        <br />
        <button type="submit">Aggiungi gioco</button>
      </form>
    </div>
  );
};

export default AddGameForm;
