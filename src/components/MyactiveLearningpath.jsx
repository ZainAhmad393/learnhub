import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "AIzaSyCpzIPK4GPMH5G3XnV9yz2UWydcn6THgRs";

const MyLearningPath = ({ playlistId, course, onProgressUpdate }) => {
  const [videos, setVideos] = useState([]);
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem(`${course.id}_completed`)) || []
  );
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Fetch videos from YouTube API
  useEffect(() => {
    const fetchVideos = async () => {
      if (!playlistId) {
        setErrorMsg("No playlist ID provided.");
        return;
      }

      console.log("Fetching playlist:", playlistId);

      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet",
              maxResults: 10,
              playlistId: playlistId,
              key: API_KEY,
            },
          }
        );

        if (res.data.items && res.data.items.length > 0) {
          setVideos(res.data.items);
          setErrorMsg("");
        } else {
          setVideos([]);
          setErrorMsg("Playlist is accessible but no videos returned.");
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setErrorMsg(
          "Could not fetch playlist. It may be private or not allowed by API."
        );
        setVideos([]);
      }
    };

    fetchVideos();
  }, [playlistId]);

  // ✅ Mark video complete & update progress
  const toggleComplete = (videoId) => {
    const updated = completed.includes(videoId)
      ? completed.filter((id) => id !== videoId)
      : [...completed, videoId];
    setCompleted(updated);
    localStorage.setItem(`${course.id}_completed`, JSON.stringify(updated));

    const progress = Math.round((updated.length / (videos.length || 1)) * 100);

    // ✅ Update progress in localStorage enrolledCourses
    const enrolledCourses =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const updatedCourses = enrolledCourses.map((c) =>
      c.id === course.id ? { ...c, progress } : c
    );
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));

    onProgressUpdate({ ...course, progress });
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold text-primary mb-3">
        🎓 {course.title} — Learning Progress
      </h3>

      {errorMsg && <div className="alert alert-warning">{errorMsg}</div>}

      <div className="progress mb-4" style={{ height: "20px" }}>
        <div
          className="progress-bar bg-success"
          style={{ width: `${course.progress}%` }}
        >
          {course.progress}%
        </div>
      </div>

      <div className="row g-3">
        {videos.map((v) => {
          const videoId = v.snippet?.resourceId?.videoId;
          const isDone = completed.includes(videoId);
          return (
            <div key={videoId} className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <img
                  src={v.snippet?.thumbnails?.medium?.url}
                  alt={v.snippet?.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h6 className="fw-bold small">{v.snippet?.title}</h6>
                  <div className="d-flex align-items-center">
                    <button
                      className={`btn btn-sm ${
                        isDone ? "btn-success" : "btn-outline-primary"
                      }`}
                      onClick={() => toggleComplete(videoId)}
                    >
                      {isDone ? "Completed" : "Mark Done"}
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm ms-2"
                    >
                      Watch →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyLearningPath;
