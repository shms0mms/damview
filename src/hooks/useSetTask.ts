"use client"
import { ROOM_ID, USER_ID } from "@/const/app.const"
import { env } from "@/env"
import { TaskContext, type TTaskContext } from "@/providers/TaskProvider"
import { Context, useContext, useEffect } from "react"
import useWebSocket from "react-use-websocket"

export const useSetTask = (userId: number, roomId: string) => {
  const {
    sendMessage: sendMessageToSocket,
    getWebSocket,
    lastJsonMessage,
  } = useWebSocket(
    `${env.NEXT_PUBLIC_WEBSOCKET_URL}/interview/room/tasks/${userId}/${roomId}`
  )
  const { setTask: setTaskContext } = useContext(
    TaskContext as Context<TTaskContext>
  )
  const socket = getWebSocket()
  const setTask = (taskId: number) => {
    sendMessageToSocket(taskId.toString())
  }
  const connect = () => {}
  const disconnect = () => {
    socket?.close()
  }
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [])

  const taskId = JSON.parse(JSON.stringify(lastJsonMessage))

  return { setTask, connect, disconnect, taskId }
}
