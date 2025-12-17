import type { ExtractByType } from './types'
import type { NormalizedElement as Element } from './onebot'

function createSegment<T extends string, D>(type: T, data: D) {
  return { type, ...data }
}

/**
 * 消息片段构造器
 */
export const segment = {
  /** 创建一个文本消息片段 */
  text: (text: string): Element => createSegment('text', { text }),
  /** 创建一个艾特消息片段 */
  at: (qq: 'all' | (string & {})): Element => createSegment('at', { qq }),
  /** 创建一个 QQ 表情消息片段 */
  face: (id: number): Element => createSegment('face', { id }),
  /** 创建一个回复消息片段 */
  reply: (id: string): Element => createSegment('reply', { id }),
  /** 创建一个图片消息片段 */
  image: (file: string, options?: Omit<ExtractByType<Element, 'image'>, 'type' | 'file'>): Element =>
    createSegment('image', { file, ...options }),
  /** 创建一个语音消息片段 */
  record: (file: string, options?: Omit<ExtractByType<Element, 'record'>, 'type' | 'file'>): Element =>
    createSegment('record', { file, ...options }),
  /** 创建一个视频消息片段 */
  video: (file: string, options?: Omit<ExtractByType<Element, 'video'>, 'type' | 'file'>): Element =>
    createSegment('video', { file, ...options }),
  /** 创建一个动态表情消息片段 */
  mface: (options: Omit<ExtractByType<Element, 'mface'>, 'type'>): Element => createSegment('mface', { ...options }),
  /** 创建一个大表情消息片段 */
  bface: (id: number): Element => createSegment('bface', { id }),
  /** 创建一个 联系人/群 分享消息片段 */
  contact: (type: 'qq' | 'group', id: string): Element => createSegment('contact', { id, sub_type: type }),
  /** 创建一个戳一戳消息片段 */
  poke: (): Element => createSegment('poke', {}),
  /** 创建一个音乐消息片段 */
  music: (platform: 'qq' | '163' | 'kugou' | 'migu' | 'kuwo', id: string): Element =>
    createSegment('music', { platform, id }),
  /** 创建一个自定义音乐消息片段 */
  musicCustom: (
    title: string,
    audio: string,
    url: string,
    options?: Omit<ExtractByType<Element, 'music'>, 'type' | 'platform' | 'url' | 'audio' | 'title'>,
  ): Element => createSegment('music', { platform: 'custom', url, audio, title, ...options }),
  /** 创建一个合并转发消息片段 */
  forward: (id: string): Element => createSegment('forward', { id }),
  /** 创建一个 JSON 消息片段 */
  json: (data: string): Element => createSegment('json', { data }),
  /** 创建一个文件消息片段 */
  file: (file: string, options?: Omit<ExtractByType<Element, 'file'>, 'type' | 'file'>): Element =>
    createSegment('file', { file, ...options }),
  /** 创建一个 Markdown 消息片段 */
  markdown: (): Element => createSegment('markdown', {}),
  /** 创建一个轻应用消息片段 */
  lightapp: (): Element => createSegment('lightapp', {}),
}
