import React, { useState } from 'react';

const AddGameForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [videoId, setVideoId] = useState('');
  const [url, setUrl] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genres, setGenres] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5020/addgames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, image, gallery, videoId, url, releaseDate, genres })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titolo:</label>
      <input type="text" id="title" value={title} onChange={event => setTitle(event.target.value)} />
      <br />
      <label htmlFor="description">Descrizione:</label>
      <textarea id="description" value={description} onChange={event => setDescription(event.target.value)} />
      <br />
      <label htmlFor="image">Immagine:</label>
      <input type="text" id="image" value={image} onChange={event => setImage(event.target.value)} />
      <br />
      <label htmlFor="gallery">Galleria:</label>
      <input type="text" id="gallery" value={gallery} onChange={event => setGallery(event.target.value.split(','))} />
      <br />
      <label htmlFor="videoId">Indirizzo IP del video:</label>
      <input type="text" id="videoId" value={videoId} onChange={event => setVideoId(event.target.value)} />
      <br />
      <label htmlFor="url">URL:</label>
      <input type="text" id="url" value={url} onChange={event => setUrl(event.target.value)} />
      <br />
      <label htmlFor="releaseDate">Data di rilascio:</label>
      <input type="date" id="releaseDate" value={releaseDate} onChange={event => setReleaseDate(event.target.value)} />
      <br />
      <label htmlFor="genres">Generi:</label>
      <input type="text" id="genres" value={genres} onChange={event => setGenres(event.target.value.split(','))} />
      <br />
      <button type="submit">Aggiungi gioco</button>
    </form>
  );  
};

export default AddGameForm;
