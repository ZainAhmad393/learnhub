import React, { useEffect, useState } from "react";
import axios from "axios";
import config from '../config';
import { useAuth } from "../context/AuthContext";

const API_KEY = "AIzaSyCpzIPK4GPMH5G3XnV9yz2UWydcn6THgRs";

const MyLearningPath = ({ playlistId, course, onProgressUpdate }) => {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [progress, setProgress] = useState(0);
  const [lastWatched, setLastWatched] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  
const BACKEND_URL = `${config.API_BASE_URL}/enrollments`;
  // ✅ Fetch YouTube Playlist
  useEffect(() => {
    const fetchVideos = async () => {
      if (!playlistId) {
        setErrorMsg("Playlist ID missing for this course.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet",
              maxResults: 50,
              playlistId,
              key: API_KEY,
            },
          }
        );

        if (res.data.items?.length > 0) {
          const videoList = res.data.items.map((item, index) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            position: index + 1,
            duration: "10:00"
          }));
          setVideos(videoList);
        } else {
          setErrorMsg("No videos found in this playlist.");
        }
      } catch (err) {
        console.error("YouTube API error:", err);
        setErrorMsg("Failed to fetch playlist videos.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [playlistId]);

  // ✅ Fetch user progress from backend
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?._id || !course?._id) {
        console.warn("User ID or Course ID missing");
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/${user._id}/${course._id}`);
        const data = res.data;
        
        setCompletedVideos(data.completedVideos || []);
        setProgress(data.progress || 0);
        setLastWatched(data.lastWatchedVideo || "");

        // Check if course is completed
        if (data.progress === 100) {
          setShowCompletion(true);
        }
        
        console.log("✅ Progress loaded from backend:", data.progress + "%");
        console.log("📹 Completed videos:", data.completedVideos || []);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };
    fetchProgress();
  }, [user, course]);

  // ✅ FIXED: Enhanced progress update - ALWAYS notify parent
  const updateProgress = async (videoId, markAsCompleted = false) => {
    if (!user?._id || !course?._id || videos.length === 0) return;

    let updatedCompleted = [...completedVideos];
    
    if (markAsCompleted) {
      if (!updatedCompleted.includes(videoId)) {
        updatedCompleted.push(videoId);
        console.log("✅ Marking video as completed:", videoId);
      }
    } else {
      updatedCompleted = updatedCompleted.filter(id => id !== videoId);
      console.log("❌ Marking video as incomplete:", videoId);
    }

    const newProgress = Math.round((updatedCompleted.length / videos.length) * 100);
    
    setCompletedVideos(updatedCompleted);
    setProgress(newProgress);
    setLastWatched(videoId);

    try {
      const response = await axios.put(`${BACKEND_URL}/progress`, {
        userId: user._id,
        courseId: course._id,
        progress: newProgress,
        completedVideos: updatedCompleted,
        lastWatchedVideo: videoId,
      });

      console.log("📈 Progress updated in backend:", newProgress + "%");
      console.log("📦 Backend response:", response.data);

      // ✅ CRITICAL FIX: ALWAYS notify parent component
      if (onProgressUpdate) {
        console.log("🔄 Notifying parent component about progress update");
        onProgressUpdate();
      }

      // Check if course completed
      if (newProgress === 100) {
        setShowCompletion(true);
        console.log("🎉 Course completed! Showing congratulations modal");
      }
    } catch (err) {
      console.error("❌ Progress update error:", err);
      console.error("Error details:", err.response?.data);
    }
  };

  // ✅ FIXED: Mark video as completed - with proper notification
  const markVideoCompleted = (videoId) => {
    console.log("🎯 Marking video completed:", videoId);
    updateProgress(videoId, true);
  };

  // ✅ FIXED: Mark video as incomplete - with proper notification
  const markVideoIncomplete = (videoId) => {
    console.log("🎯 Marking video incomplete:", videoId);
    updateProgress(videoId, false);
  };

  // ✅ FIXED: Watch video and update progress
  const watchVideo = (videoId) => {
    console.log("▶️ Watching video:", videoId);
    setCurrentVideo(videoId);
    updateProgress(videoId, true);
  };

  // ✅ Calculate time spent (estimated)
  const calculateTimeSpent = () => {
    const averageVideoTime = 10;
    return completedVideos.length * averageVideoTime;
  };

  // ✅ Get next video to watch
  const getNextVideo = () => {
    const firstIncomplete = videos.find(video => !completedVideos.includes(video.id));
    return firstIncomplete || videos[0];
  };

  // ✅ FIXED: Reset course progress - with proper notification
  const resetProgress = async () => {
    try {
      console.log("🔄 Resetting course progress");
      await axios.put(`${BACKEND_URL}/progress`, {
        userId: user._id,
        courseId: course._id,
        progress: 0,
        completedVideos: [],
        lastWatchedVideo: "",
      });
      
      setCompletedVideos([]);
      setProgress(0);
      setLastWatched("");
      setShowCompletion(false);
      
      // ✅ CRITICAL: Notify parent after reset
      if (onProgressUpdate) {
        console.log("🔄 Notifying parent after progress reset");
        onProgressUpdate();
      }
      
      console.log("✅ Progress reset successfully");
    } catch (err) {
      console.error("❌ Reset progress error:", err);
    }
  };

  // ✅ NEW: Get video status with clear indicators
  const getVideoStatus = (videoId) => {
    const isCompleted = completedVideos.includes(videoId);
    return {
      isCompleted,
      statusText: isCompleted ? "Completed" : "Not Started",
      statusColor: isCompleted ? "success" : "secondary",
      statusIcon: isCompleted ? "fa-check-circle" : "fa-circle",
      buttonText: isCompleted ? "Mark Incomplete" : "Mark Complete",
      badgeClass: isCompleted ? "bg-success" : "bg-secondary"
    };
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-2">Loading course content...</span>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Course Completion Modal */}
      {showCompletion && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 bg-success text-white">
                <h5 className="modal-title">🎉 Congratulations!</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowCompletion(false)}
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <div className="mb-3">
                  <i className="fas fa-trophy fa-4x text-warning"></i>
                </div>
                <h4 className="text-success mb-3">Course Completed Successfully!</h4>
                <p className="text-muted">
                  You have completed <strong>{course.title}</strong> with {progress}% progress.
                </p>
                <div className="row text-center mt-4">
                  <div className="col-md-4">
                    <div className="border rounded p-3">
                      <h6 className="text-primary">{completedVideos.length}</h6>
                      <small>Videos Watched</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded p-3">
                      <h6 className="text-primary">{calculateTimeSpent()} min</h6>
                      <small>Time Spent</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="border rounded p-3">
                      <h6 className="text-primary">{progress}%</h6>
                      <small>Overall Progress</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowCompletion(false)}
                >
                  Close
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowCompletion(false);
                    if (onProgressUpdate) onProgressUpdate();
                  }}
                >
                  Share Achievement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Header with Progress */}
      <div className="row align-items-center mb-4">
        <div className="col-md-8">
          <h3 className="fw-bold text-primary mb-2">
            🎓 {course?.title || "Learning Path"}
          </h3>
          <p className="text-muted mb-0">
            Master your skills with this comprehensive course
          </p>
        </div>
        <div className="col-md-4 text-end">
          <div className="d-flex align-items-center justify-content-end">
            <div className="me-3">
              <small className="text-muted d-block">Overall Progress</small>
              <strong className="text-primary">{progress}%</strong>
            </div>
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={resetProgress}
              title="Reset Progress"
            >
              <i className="fas fa-redo"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress mb-4" style={{ height: "12px" }}>
        <div
          className="progress-bar bg-success progress-bar-striped progress-bar-animated"
          style={{ width: `${progress}%` }}
        >
          <span className="visually-hidden">{progress}% Complete</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body text-center py-3">
              <h5 className="text-primary mb-1">{completedVideos.length}/{videos.length}</h5>
              <small className="text-muted">Videos Completed</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body text-center py-3">
              <h5 className="text-warning mb-1">{calculateTimeSpent()} min</h5>
              <small className="text-muted">Time Spent</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body text-center py-3">
              <h5 className="text-info mb-1">{videos.length - completedVideos.length}</h5>
              <small className="text-muted">Videos Remaining</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body text-center py-3">
              <h5 className="text-success mb-1">{Math.round(progress)}%</h5>
              <small className="text-muted">Course Progress</small>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="alert alert-light border mb-4">
        <div className="row text-center">
          <div className="col-md-4 border-end">
            <div className="d-flex align-items-center justify-content-center">
              <i className="fas fa-check-circle text-success me-2"></i>
              <div>
                <div className="fw-bold">{completedVideos.length}</div>
                <small className="text-muted">Completed</small>
              </div>
            </div>
          </div>
          <div className="col-md-4 border-end">
            <div className="d-flex align-items-center justify-content-center">
              <i className="fas fa-play-circle text-warning me-2"></i>
              <div>
                <div className="fw-bold">{videos.length - completedVideos.length}</div>
                <small className="text-muted">Remaining</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-center justify-content-center">
              <i className="fas fa-chart-line text-primary me-2"></i>
              <div>
                <div className="fw-bold">{progress}%</div>
                <small className="text-muted">Progress</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Watching Section */}
      {lastWatched && progress < 100 && (
        <div className="alert alert-info d-flex justify-content-between align-items-center mb-4">
          <div>
            <strong>⏩ Continue Learning</strong>
            <p className="mb-0 small">Pick up where you left off</p>
          </div>
          <button 
            onClick={() => watchVideo(lastWatched)} 
            className="btn btn-primary btn-sm"
          >
            Continue Watching ▶
          </button>
        </div>
      )}

      {/* Next Video Suggestion */}
      {progress < 100 && (
        <div className="alert alert-warning mb-4">
          <strong>📚 Suggested Next:</strong> 
          <span className="ms-2">
            {getNextVideo()?.title || "Start with the first video"}
          </span>
        </div>
      )}

      {/* Videos List with Clear Status Indicators */}
      <div className="row g-3">
        {videos.map((video, index) => {
          const isCompleted = completedVideos.includes(video.id);
          const isLastWatched = lastWatched === video.id;
          const isCurrentlyPlaying = currentVideo === video.id;
          const videoStatus = getVideoStatus(video.id);

          return (
            <div key={video.id} className="col-lg-6">
              <div className={`card h-100 shadow-sm border-0 ${
                isLastWatched ? 'border-warning border-2' : 
                isCurrentlyPlaying ? 'border-primary border-2' : 
                isCompleted ? 'border-success' : 'border-light'
              }`}>
                <div className="row g-0 h-100">
                  <div className="col-md-4 position-relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="card-img h-100"
                      style={{ 
                        objectFit: 'cover',
                        filter: isCompleted ? 'grayscale(30%)' : 'none',
                        opacity: isCompleted ? 0.8 : 1
                      }}
                    />
                    
                    {/* ✅ Completion Status Badge */}
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className={`badge ${videoStatus.badgeClass}`}>
                        <i className={`fas ${videoStatus.statusIcon} me-1`}></i>
                        {videoStatus.statusText}
                      </span>
                    </div>

                    {/* Video Position */}
                    <div className="position-absolute bottom-0 start-0 m-2">
                      <span className="badge bg-dark bg-opacity-75">
                        #{video.position}
                      </span>
                    </div>

                    {/* Completion Overlay */}
                    {isCompleted && (
                      <div className="position-absolute top-0 start-0 w-100 h-100 bg-success bg-opacity-10 d-flex align-items-center justify-content-center">
                        <i className="fas fa-check-circle text-success fa-2x"></i>
                      </div>
                    )}
                  </div>

                  <div className="col-md-8">
                    <div className="card-body d-flex flex-column h-100">
                      <div>
                        <h6 className="card-title fw-bold small mb-2">
                          {isCompleted ? (
                            <span className="text-success">
                              <i className="fas fa-check-circle me-1"></i>
                              {video.title}
                            </span>
                          ) : (
                            video.title
                          )}
                        </h6>
                        
                        {/* Progress Indicator for individual video */}
                        <div className="mb-2">
                          <div className="d-flex align-items-center">
                            <small className="text-muted me-2">Status:</small>
                            <span className={`badge ${isCompleted ? 'bg-success' : 'bg-warning'}`}>
                              {isCompleted ? 'Completed' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group btn-group-sm">
                            <button
                              className={`btn ${
                                isCompleted ? 'btn-outline-danger' : 'btn-outline-success'
                              }`}
                              onClick={() => 
                                isCompleted ? markVideoIncomplete(video.id) : markVideoCompleted(video.id)
                              }
                              title={isCompleted ? "Mark as incomplete" : "Mark as completed"}
                            >
                              <i className={`fas ${
                                isCompleted ? 'fa-times-circle' : 'fa-check-circle'
                              }`}></i>
                              {isCompleted ? 'uncomplete' : ' Done'}
                            </button>
                            
                            <a
                              href={`https://www.youtube.com/watch?v=${video.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`}
                              onClick={() => watchVideo(video.id)}
                              title={isCompleted ? "Watch again" : "Watch video"}
                            >
                              <i className={`fas ${isCompleted ? 'fa-redo' : 'fa-play'}`}></i>
                              {isCompleted ? ' Rewatch' : ' Watch'}
                            </a>
                          </div>
                          
                          <small className="text-muted">
                            {video.duration}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Summary */}
      {completedVideos.length > 0 && (
        <div className="alert alert-success mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">🎯 Learning Progress</h6>
              <p className="mb-0">
                You've completed <strong>{completedVideos.length}</strong> out of <strong>{videos.length}</strong> videos 
                ({progress}% of the course)
              </p>
            </div>
            <div className="text-end">
              <small className="text-muted">
                Last watched: {lastWatched ? videos.find(v => v.id === lastWatched)?.title : 'Not started'}
              </small>
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="alert alert-warning text-center mt-4">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errorMsg}
        </div>
      )}

      {/* Course Completion Message */}
      {progress === 100 && (
        <div className="alert alert-success text-center mt-4">
          <h5>🎉 Course Completed!</h5>
          <p className="mb-2">You've successfully completed all videos in this course.</p>
          <button 
            className="btn btn-outline-success btn-sm"
            onClick={() => setShowCompletion(true)}
          >
            View Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default MyLearningPath;