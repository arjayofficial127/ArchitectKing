"use client";

import { useEffect, useRef, useState } from 'react';

type VolumePreset = 'ultra-low' | 'mid' | 'full';

const AUDIO_SRC = '/architectking/Tonos_Jitara_256KBPS.mp3';
const ORIGINAL_SOURCE_URL = 'https://www.youtube.com/shorts/TuWGrqkJ7gw';

const VOLUME_LEVELS: Record<VolumePreset, number> = {
  'ultra-low': 0.12,
  mid: 0.45,
  full: 1,
};

const VOLUME_LABELS: Record<VolumePreset, string> = {
  'ultra-low': 'Ultra low',
  mid: 'Mid',
  full: 'Full',
};

export function FloatingAudioPlayer() {
  const [selectedVolume, setSelectedVolume] = useState<VolumePreset>('mid');
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectedVolumeRef = useRef<VolumePreset>('mid');
  const soundUnlockedRef = useRef(false);
  const userPausedRef = useRef(false);

  useEffect(() => {
    selectedVolumeRef.current = selectedVolume;

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = VOLUME_LEVELS[selectedVolume];
  }, [selectedVolume]);

  useEffect(() => {
    soundUnlockedRef.current = soundUnlocked;

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.muted = !soundUnlocked;
  }, [soundUnlocked]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.loop = true;
    audio.volume = VOLUME_LEVELS[selectedVolumeRef.current];
    audio.muted = !soundUnlockedRef.current;

    const unlockAudio = () => {
      if (!soundUnlockedRef.current) {
        soundUnlockedRef.current = true;
        setSoundUnlocked(true);
      }

      audio.muted = false;
      audio.volume = VOLUME_LEVELS[selectedVolumeRef.current];
    };

    const attemptPlay = () => {
      if (userPausedRef.current) {
        return;
      }

      const playPromise = audio.play();

      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise
          .then(() => {
            setAutoplayBlocked(false);
          })
          .catch(() => {
            setAutoplayBlocked(true);
          });
      }
    };

    const syncProgress = () => {
      if (!audio.duration || Number.isNaN(audio.duration)) {
        setPlaybackProgress(0);
        return;
      }

      setPlaybackProgress(audio.currentTime / audio.duration);
    };

    const markPlaying = () => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
    };
    const markPaused = () => setIsPlaying(false);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && audio.paused) {
        attemptPlay();
      }
    };
    const resumeAfterInteraction = (event?: Event) => {
      const target = event?.target;

      if (
        target instanceof Node &&
        containerRef.current?.contains(target)
      ) {
        return;
      }

      userPausedRef.current = false;
      unlockAudio();
      attemptPlay();
    };

    audio.addEventListener('canplay', attemptPlay);
    audio.addEventListener('canplaythrough', attemptPlay);
    audio.addEventListener('loadeddata', attemptPlay);
    audio.addEventListener('play', markPlaying);
    audio.addEventListener('pause', markPaused);
    audio.addEventListener('timeupdate', syncProgress);
    audio.addEventListener('ended', () => setPlaybackProgress(0));
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('click', resumeAfterInteraction);
    window.addEventListener('mousedown', resumeAfterInteraction);
    window.addEventListener('pointerdown', resumeAfterInteraction);
    window.addEventListener('pointerup', resumeAfterInteraction);
    window.addEventListener('keydown', resumeAfterInteraction);
    window.addEventListener('scroll', resumeAfterInteraction, { passive: true });
    window.addEventListener('touchstart', resumeAfterInteraction);
    window.addEventListener('touchend', resumeAfterInteraction);
    window.addEventListener('wheel', resumeAfterInteraction, { passive: true });

    const retryTimers = [0, 250, 900, 1800].map((delay) =>
      window.setTimeout(() => {
        if (audio.paused) {
          attemptPlay();
        }
      }, delay)
    );

    attemptPlay();

    return () => {
      for (const timer of retryTimers) {
        window.clearTimeout(timer);
      }

      audio.removeEventListener('canplay', attemptPlay);
      audio.removeEventListener('canplaythrough', attemptPlay);
      audio.removeEventListener('loadeddata', attemptPlay);
      audio.removeEventListener('play', markPlaying);
      audio.removeEventListener('pause', markPaused);
      audio.removeEventListener('timeupdate', syncProgress);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('click', resumeAfterInteraction);
      window.removeEventListener('mousedown', resumeAfterInteraction);
      window.removeEventListener('pointerdown', resumeAfterInteraction);
      window.removeEventListener('pointerup', resumeAfterInteraction);
      window.removeEventListener('keydown', resumeAfterInteraction);
      window.removeEventListener('scroll', resumeAfterInteraction);
      window.removeEventListener('touchstart', resumeAfterInteraction);
      window.removeEventListener('touchend', resumeAfterInteraction);
      window.removeEventListener('wheel', resumeAfterInteraction);
    };
  }, []);

  const applySelectedVolume = (preset: VolumePreset) => {
    setSelectedVolume(preset);
    selectedVolumeRef.current = preset;

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!soundUnlockedRef.current) {
      soundUnlockedRef.current = true;
      setSoundUnlocked(true);
      audio.muted = false;
    }

    audio.volume = VOLUME_LEVELS[preset];
    userPausedRef.current = false;
    setIsPlaying(true);
    void audio.play().catch(() => {
      setIsPlaying(false);
      setAutoplayBlocked(true);
    });
  };

  const togglePlayback = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused || !soundUnlockedRef.current) {
      userPausedRef.current = false;

      if (!soundUnlockedRef.current) {
        soundUnlockedRef.current = true;
        setSoundUnlocked(true);
      }

      audio.muted = false;
      audio.volume = VOLUME_LEVELS[selectedVolumeRef.current];
      setIsPlaying(true);
      void audio.play().catch(() => {
        setIsPlaying(false);
        setAutoplayBlocked(true);
      });
      return;
    }

    userPausedRef.current = true;
    setIsPlaying(false);
    audio.pause();
  };

  return (
    <aside className="fixed bottom-3 right-3 z-50 w-[188px] rounded-[18px] border border-slate-200 bg-white p-2 shadow-[0_12px_30px_rgba(15,23,42,0.12)] md:bottom-5 md:right-5 md:w-[204px]" ref={containerRef}>
      <audio autoPlay loop muted={!soundUnlocked} playsInline preload="auto" ref={audioRef} src={AUDIO_SRC} />

      <div className="rounded-[14px] border border-slate-200 bg-slate-50 px-2.5 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              className="relative flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-[1.02]"
              onClick={togglePlayback}
              style={{
                background: autoplayBlocked
                  ? 'conic-gradient(#e2e8f0 360deg, rgba(148, 163, 184, 0.2) 0deg)'
                  : `conic-gradient(#f59e0b ${playbackProgress * 360}deg, rgba(148, 163, 184, 0.2) 0deg)`,
              }}
              type="button"
            >
              <div className="absolute inset-[2px] rounded-full bg-white" />
              <div className="relative text-slate-600">
                {isPlaying ? (
                  <div className="flex items-center gap-[3px]">
                    <span className="h-3 w-[3px] rounded-full bg-current" />
                    <span className="h-3 w-[3px] rounded-full bg-current" />
                  </div>
                ) : (
                  <div className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-slate-600 pl-[2px]" />
                )}
              </div>
            </button>
            <div className="flex items-center gap-1.5">
              {(['ultra-low', 'mid', 'full'] as VolumePreset[]).map((preset) => {
                const isActive = preset === selectedVolume;

                return (
                  <button
                    key={preset}
                    aria-label={VOLUME_LABELS[preset]}
                    aria-pressed={isActive}
                    className={`h-3 w-3 rounded-full border transition ${
                      isActive
                        ? 'border-amber-400 bg-amber-300'
                        : 'border-slate-300 bg-white hover:border-slate-400'
                    }`}
                    onClick={() => applySelectedVolume(preset)}
                    type="button"
                  />
                );
              })}
            </div>
          </div>
          <a
            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition hover:text-slate-900"
            href={ORIGINAL_SOURCE_URL}
            rel="noreferrer"
            target="_blank"
          >
            Source
          </a>
        </div>
      </div>
    </aside>
  );
}