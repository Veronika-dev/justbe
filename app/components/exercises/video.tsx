'use client'
import {useEffect, useRef, useState} from "react";
import {Pause, Play, SkipBack, SkipForward, Volume2, VolumeX} from "lucide-react";

// YouTube video IDs
const videos = [
  '4CmzL-cv-MI',
  'zHEpbuKrW6w'
]

type YouTubePlayer = {
  destroy: () => void;
  loadVideoById: (options: { videoId: string; startSeconds: number }) => void;
  mute: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
  unMute: () => void;
};

type YouTubeApi = {
  Player: new (
    elementId: string,
    options: {
      videoId: string;
      height: string;
      width: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady: () => void;
      };
    },
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function ExercisesVideo() {
  const playerRef = useRef<YouTubePlayer | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    window.onYouTubeIframeAPIReady = () => {
      const youtubeApi = window.YT;
      if (!youtubeApi) return;

      playerRef.current = new youtubeApi.Player('youtube-player', {
        videoId: videos[0],
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: videos[0],
          controls: 0,
          modestbranding: 1,
          rel: 0,
          mute: 1,
          showinfo: 0,
          fs: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: () => setIsReady(true),
        },
      })
    }

    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady()
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (isReady && playerRef.current) {
      playerRef.current.loadVideoById({
        videoId: videos[currentVideoIndex],
        startSeconds: 0,
      })
    }
  }, [currentVideoIndex, isReady])

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute()
      } else {
        playerRef.current.mute()
      }
      setIsMuted(!isMuted)
    }
  }

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length
    setCurrentVideoIndex(nextIndex)
    setIsPlaying(true)
  }

  const prevVideo = () => {
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length
    setCurrentVideoIndex(prevIndex)
    setIsPlaying(true)
  }

  return (
    <>
      <div className="rounded-xl overflow-hidden relative">
        <div id="youtube-player" />
        <style jsx global>{`
          #youtube-player {
            aspect-ratio: 16 / 9;
          }
          .ytp-chrome-top,
          .ytp-show-cards-title,
          .ytp-watermark,
          .ytp-gradient-top {
            display: none !important;
          }
        `}</style>
      </div>
      <div className="card-background mt-4 flex justify-center items-center gap-4 py-4">
        {videos.length > 1 && (
          <button
            onClick={prevVideo}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipBack size={24}/>
          </button>
        )}
        <button
          onClick={togglePlay}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isPlaying ? <Pause size={24}/> : <Play size={24}/>}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isMuted ? <VolumeX size={24}/> : <Volume2 size={24}/>}
        </button>
        {videos.length > 1 && (
          <button
            onClick={nextVideo}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <SkipForward size={24}/>
          </button>
        )}
      </div>
    </>
  )
}
