import React, { useEffect, useState } from 'react';
import Pagination from './pagination'; // Ensure correct import path

const Play = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  async function handlePlay(link, img, songId) {
    if (currentSongId === songId) {
      setAudioSrc(null);
      setImageSrc(null);
      setCurrentSongId(null);
    } else {
      setAudioSrc(`http://localhost:8000/uploads/${link}`);
      setImageSrc(img);
      setCurrentSongId(songId);
    }
  }

  async function getData() {
    try {
      const response = await fetch('http://localhost:8000/Play');
      const result = await response.json();
      if (!response.ok) {
        setError(result.error);
      } else {
        setData(result);
        setError(null);
      }
    } catch (error) {
      setError('Error fetching data');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container my-2">
      <h2>MyPlaylist</h2>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Artist</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((ele) => (
            <tr key={ele._id}>
              <td>
                <img src={ele.image} width="50px" height="50px" alt={ele.name} />
              </td>
              <td>{ele.name}</td>
              <td>{ele.artist}</td>
              <td>
                <span
                  className="card-link"
                  onClick={() => handlePlay(ele.link, ele.image, ele._id)}
                >
                  {currentSongId === ele._id ? (
                    <i className="far fa-pause-circle playbtn"></i>
                  ) : (
                    <i className="far fa-play-circle pausebtn"></i>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        itemsCount={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <br /><br /><br /><br />
      <h2>AudioPlayer</h2>
      {imageSrc && <img src={imageSrc} width="200px" height="200px" alt="Song Cover" />}
      <br />
      {audioSrc && (
        <audio controls onEnded={() => setCurrentSongId(null)} onPause={() => setCurrentSongId(null)}>
          <source src={audioSrc} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default Play;
