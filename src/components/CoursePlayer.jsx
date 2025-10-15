import React, { useEffect, useRef } from 'react';

const loadYouTubeAPI = (() => {
  let promise = null;
  return () => {
    if (promise) return promise;
    promise = new Promise((resolve) => {
      if (window.YT && window.YT.Player) return resolve(window.YT);
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    });
    return promise;
  };
})();

const CoursePlayer = ({ videoId, onEnded, width = '100%', height = '360' }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let player;
    let mounted = true;
    if (!videoId) return;

    loadYouTubeAPI().then((YT) => {
      if (!mounted) return;
      player = new YT.Player(containerRef.current, {
        height,
        width,
        videoId,
        events: {
          onStateChange: (e) => {
            // 0 = ended
            if (e.data === 0 && typeof onEnded === 'function') {
              onEnded(videoId);
            }
          },
        },
        playerVars: {
          modestbranding: 1,
          rel: 0,
        },
      });
      playerRef.current = player;
    });

    return () => {
      mounted = false;
      if (playerRef.current && playerRef.current.destroy) {
        try { playerRef.current.destroy(); } catch (e) { /* ignore */ }
      }
    };
  }, [videoId, height, width, onEnded]);

  return <div ref={containerRef} />;
};

export default CoursePlayer;
