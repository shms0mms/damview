import type { Task } from "@/types/task"

export const MOCK_TASKS = new Array<Task>(12)
  .fill({
    id: 0,
    description:
      "asdfaadsfljkhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhhsdf",
    name: "asdfasdfasfd",
  })
  .map(task => ({ ...task, id: Math.random() }))
