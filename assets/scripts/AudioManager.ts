import {
  _decorator,
  AudioClip,
  AudioSource,
  Component,
  director,
  Node
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
  private static _instance: AudioManager = null;
  public static get instance(): AudioManager {
    return AudioManager._instance;
  }

  // 所有音檔
  @property([AudioClip])
  public musicClips: AudioClip[] = [];
  // 所有音效
  @property([AudioClip])
  public soundClips: AudioClip[] = [];
  // 音樂播放器
  @property(AudioSource)
  public musicSource: AudioSource = null;
  // 音效播放器
  @property(AudioSource)
  public soundSource: AudioSource = null;

  protected onLoad(): void {
    // 設為常駐節點
    director.addPersistRootNode(this.node);
    // 單例模式
    if (!AudioManager._instance) {
      AudioManager._instance = this;
    } else {
      this.destroy();
    }
  }

  protected onDestroy(): void {
    if (AudioManager._instance === this) {
      AudioManager._instance = null;
    }
  }

  playMusic(index: number) {
    if (this.soundSource && this.musicClips[index]) {
      this.musicSource.clip = this.musicClips[index];
      this.musicSource.play();
    } else {
      console.error('AudioManager: Music source or clip not found');
    }
  }

  stopMusic(index: number) {
    if (this.soundSource && this.musicClips[index]) {
      this.musicSource.clip = this.musicClips[index];
      this.musicSource.stop();
    } else {
      console.error('AudioManager: Music source or clip not found');
    }
  }

  playSound(index: number) {
    if (this.soundSource && this.soundClips[index]) {
      this.soundSource.playOneShot(this.soundClips[index]);
    } else {
      console.error('AudioManager: Sound source or clip not found');
    }
  }

  playSoundWithSource(sound: AudioClip) {
    // 可由外部的腳本傳入音效
    if (AudioClip) {
      this.soundSource.playOneShot(sound);
    } else {
      console.error('AudioManager: Sound source or clip not found');
    }
  }
}
