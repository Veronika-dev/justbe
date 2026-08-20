'use client'
import {useEffect, useRef, useState} from "react";
import {Pause, Play, SkipBack, SkipForward, Volume2, VolumeX} from "lucide-react";

const isYT: boolean = false;

const youtubeVideos = [
  '4CmzL-cv-MI',
  'zHEpbuKrW6w'
]

const rutubeVideos = [
  'https://rutube.ru/play/embed/c78727b527bf53cb59c4b278b585b5a3/',
  'https://rutube.ru/play/embed/1118e7e105efbf42b3104252d755bb57/',
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

type RutubeMessage = {
  type?: string;
  data?: unknown;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function ExercisesVideo() {
  const playerRef = useRef<YouTubePlayer | null>(null)
  const rutubeFrameRef = useRef<HTMLIFrameElement | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videos = isYT ? youtubeVideos : rutubeVideos

  const sendRutubeCommand = (type: string, data: Record<string, unknown> = {}) => {
    rutubeFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ type, data }),
      'https://rutube.ru',
    )
  }

  useEffect(() => {
    if (!isYT) return

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
        videoId: youtubeVideos[0],
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: youtubeVideos[0],
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
    if (isYT) return

    const handleRutubeMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://rutube.ru') return

      const message = parseRutubeMessage(event.data)
      if (message?.type !== 'player:ready') return

      setIsReady(true)
      sendRutubeCommand(isPlaying ? 'player:play' : 'player:pause')
      if (isMuted) {
        sendRutubeCommand('player:mute')
      }
    }

    window.addEventListener('message', handleRutubeMessage)
    return () => window.removeEventListener('message', handleRutubeMessage)
  }, [isMuted, isPlaying])

  useEffect(() => {
    if (!isYT) return

    if (isReady && playerRef.current) {
      playerRef.current.loadVideoById({
        videoId: youtubeVideos[currentVideoIndex],
        startSeconds: 0,
      })
    }
  }, [currentVideoIndex, isReady])

  const togglePlay = () => {
    if (isYT && playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
      setIsPlaying(!isPlaying)
    }

    if (!isYT) {
      sendRutubeCommand(isPlaying ? 'player:pause' : 'player:play')
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (isYT && playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute()
      } else {
        playerRef.current.mute()
      }
      setIsMuted(!isMuted)
    }

    if (!isYT) {
      sendRutubeCommand(isMuted ? 'player:unMute' : 'player:mute')
      setIsMuted(!isMuted)
    }
  }

  const nextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length
    setCurrentVideoIndex(nextIndex)
    setIsPlaying(true)
    if (!isYT) setIsReady(false)
  }

  const prevVideo = () => {
    const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length
    setCurrentVideoIndex(prevIndex)
    setIsPlaying(true)
    if (!isYT) setIsReady(false)
  }

  return (
    <>
      <div className="rounded-xl overflow-hidden relative">
        {isYT ? (
          <>
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
          </>
        ) : (
          <iframe
            ref={rutubeFrameRef}
            className="aspect-video w-full"
            src={videos[currentVideoIndex]}
            title="Rutube video player"
            allow="clipboard-write; autoplay"
            allowFullScreen
            onLoad={() => setIsReady(true)}
          />
        )}
      </div>
      <div className="card-background mt-4 flex justify-center items-center gap-3 sm:gap-4 px-4 py-4 md:px-8 md:py-8">
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
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-40"
          disabled={!isReady}
        >
          {isPlaying ? <Pause size={24}/> : <Play size={24}/>}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-40"
          disabled={!isReady}
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

function parseRutubeMessage(data: unknown): RutubeMessage | null {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as RutubeMessage
    } catch {
      return null
    }
  }

  if (data && typeof data === 'object') {
    return data as RutubeMessage
  }

  return null
}
