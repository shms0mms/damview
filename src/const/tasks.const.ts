import { Difficulty, type Task } from "@/types/task"

export const MOCK_TASKS = new Array<Task>(12)
  .fill({
    id: 0,
    task: "asdfaadsfljkhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhhsdf",
    name: "asdfasdfasfd",
    dificalty: Difficulty.EASY,
  })
  .map(task => ({ ...task, id: Math.random() }))

export const MOCK_TASK: Task = {
  id: 1,
  task: "Даны два числа A и B. Вам нужно вычислить их сумму A+B. В этой задаче для работы с входными и выходными данными вы можете использовать и файлы и потоки на ваше усмотрение.",
  name: "A+B 1",
  dificalty: Difficulty.EASY,
  examples: [
    {
      id: 1,
      enter: "2 2",
      out: "4",
    },
  ],
}
