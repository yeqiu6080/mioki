import type { Logger } from './logger'
import type { OneBotEventMap } from './onebot'

export interface MiokiOptions {
  /** NapCat 访问令牌 */
  token: string
  /** NapCat 服务器协议，默认为 ws */
  protocol?: 'ws' | 'wss'
  /** NapCat 服务器主机，默认为 localhost */
  host?: string
  /** NapCat 服务器端口，默认为 3333 */
  port?: number
  /** 日志记录器，默认为控制台日志记录器 */
  logger?: Logger
}

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]

export type OptionalProps<T> = Pick<T, OptionalKeys<T>>

export type ExtractByType<T, K> = T extends { type: K } ? T : never

export interface EventMap extends OneBotEventMap {
  /** WebSocket 连接已打开 */
  'ws.open': void
  /** WebSocket 连接已关闭 */
  'ws.close': void
  /** WebSocket 连接发生错误 */
  'ws.error': Event
  /** 收到 WebSocket 消息 */
  'ws.message': any
}
