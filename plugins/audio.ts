import Vue from 'vue'
import { Plugin, Context } from '@nuxt/types'
import { Track } from '~/apollo/model/generated'

type State = {
  play: boolean
  track: Track | null
  audio: HTMLAudioElement | null
  currentTime: number
  duration: number
  timeoutID: NodeJS.Timeout | null
}

class AudioComponet {
  private readonly ctx: Context
  private readonly state: State

  constructor(ctx: Context) {
    this.ctx = ctx
    this.state = Vue.observable({
      play: false,
      track: null,
      audio: null,
      currentTime: 0,
      duration: 0,
      timeoutID: null,
    } as State)
  }

  get track() {
    return this.state.track
  }

  get playing() {
    return this.state.play
  }

  get duration() {
    return this.state.duration
  }

  get currentTime() {
    return this.state.currentTime
  }

  init(track: Track) {
    this.stop()
    this.remove()
    this.state.track = track
    this.state.audio = new Audio(track.audioUrl)
  }

  set(track: Track) {
    if (this.state.track !== track) {
      this.init(track)
    }
    this.play()
  }
  remove() {
    this.state.track = null
    this.state.audio = null
    this.state.currentTime = 0
    this.state.duration = 0
  }

  play() {
    if (this.state.audio) {
      this.state.audio.play()
      this.state.play = true
      this.state.audio.addEventListener('loadedmetadata', () => {
        if (this.state.audio) {
          this.state.duration = this.state.audio.duration
        }
      })
      this.state.timeoutID = setInterval(this.setCurrentTime.bind(this), 200)
    }
  }

  stop() {
    if (this.state.play && this.state.audio) {
      this.state.audio.pause()
      this.state.play = false
      this.clearCurrentTime()
    }
  }

  setCurrentTime() {
    if (this.state.audio) {
      this.state.currentTime = this.state.audio.currentTime
    }
  }

  clearCurrentTime() {
    if (this.state.timeoutID) {
      clearInterval(this.state.timeoutID)
    }
  }

  timeOperation(time: number) {
    if (this.state.audio) {
      this.state.audio.currentTime = time
      if (this.state.timeoutID) {
        clearInterval(this.state.timeoutID)
      }
      this.play()
    }
  }
}

const AudioPlugin: Plugin = async (ctx, inject) => {
  inject('audio', new AudioComponet(ctx))
}

export default AudioPlugin