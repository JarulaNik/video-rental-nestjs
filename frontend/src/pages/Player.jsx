// frontend/src/pages/Player.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Player = () => {
  // Сейчас мы не используем ID фильма, но он может понадобиться,
  // если ты планируешь показывать разные фильмы в плеере
  // const { movieId } = useParams();

  useEffect(() => {
    // Загрузка YouTube Player API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    // Создание плеера
    window.onYouTubeIframeAPIReady = () => {
      new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'dQw4w9WgXcQ', //  ID видео
        events: {
          'onReady': (event) => {
            event.target.playVideo();
          }
        }
      });
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'  // Занимаем всю высоту экрана
    }}>
      <div id="player"></div>
    </div>
  );
};

export default Player;