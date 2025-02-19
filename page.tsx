"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Volume2, VolumeX } from "lucide-react"

interface Link {
  id: string
  icon: string
  title: string
  url: string
}

export default function BioLink() {
  const [profileImage, setProfileImage] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d3731f7c-8e50-4a6a-b319-79fb40d3bcb9-csU9el71IcvQnR5zxAkhwfxbWyFdLF.jpeg",
  )
  const [name, setName] = useState("vertaica")
  const [title, setTitle] = useState("discord : vertaica")
  const [backgroundColor] = useState("#000000")
  const [customCursor] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [links] = useState<Link[]>([
    { id: "1", icon: "globe", title: "Roblox", url: "https://www.roblox.com/users/4906769832/profile" },
    { id: "2", icon: "twitter", title: "Youtube", url: "https://www.youtube.com/@%E7%87%83%E7%87%83%E7%87%83" },
    { id: "3", icon: "instagram", title: "Instagram", url: "https://www.instagram.com/v3rtaica/#" },
    { id: "4", icon: "linkedin", title: "Spotify", url: "http://open.spotify.com/user/31rej7grddugi4h7nfande2y3qpu" },
    { id: "5", icon: "music2", title: "SoundCloud", url: "https://soundcloud.com/vertaica" },
  ])

  useEffect(() => {
    // Auto-play music when component mounts
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handle any autoplay restrictions
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMuted, isPlaying])

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div
      className={`min-h-screen text-white flex flex-col items-center px-4 py-8 relative`}
      style={{
        backgroundColor,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: customCursor
          ? `url(${encodeURI("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d5b47e34-b7bd-4ffd-b32d-77130746d1df.png-lp8kb7IfWi38aUAVJCbytbVULm0kx6.webp")}), auto`
          : "default",
      }}
    >
      {/* Sound Controls */}
      <div
        className="fixed bottom-4 right-4 flex items-center gap-2"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <div
          className={`
            bg-neutral-900/80 rounded-lg overflow-hidden transition-all duration-300 ease-in-out
            ${showVolume ? "w-24 opacity-100 visible" : "w-0 opacity-0 invisible"}
          `}
        >
          <Button variant="ghost" onClick={toggleMute} className="w-full h-full px-3 py-2 text-xs font-mono">
            {isMuted ? "Unmute" : "Mute"}
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMusic}
          className="bg-neutral-900/80 hover:bg-neutral-800/80 border-0"
        >
          {isPlaying ? (
            isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-neutral-700">
            <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="text-neutral-400">{title}</p>
        </div>

        {/* Links Section */}
        <div className="space-y-1.5">
          {links.map((link) => (
            <Button
              key={link.id}
              variant="outline"
              className="w-full bg-neutral-900/80 hover:bg-neutral-800/80 border-0 text-neutral-300 justify-center h-12 font-mono text-sm tracking-wider transition-colors"
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {link.title}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Background Music Player */}
      <audio
        ref={audioRef}
        src="https://cdn.discordapp.com/attachments/1141606098097422358/1341532062779441273/Break.mp3?ex=67b65698&is=67b50518&hm=8641e6bbeca70f93664cc8e505b681276e6473e81b05c5392b434e651d89d595&"
        loop
        className="hidden"
      />
    </div>
  )
}

