import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import Logo from "@/components/ui/logo"
import { Check, Radio, Users } from "lucide-react"

export default function Home() {
  return (
    <main className='max-w-[1440px] w-full h-full'>
      <div className='flex flex-col gap-12 items-center text-lg pt-40'>
        <div className='flex gap-4 flex-col items-center'>
          <h1>
            <Logo className='text-8xl' />
          </h1>
          <h3 className='text-xl opacity-65 max-w-96 text-center'>
            Создавать конференции для собеседований еще никогда не было так
            просто.
          </h3>
        </div>
        <div className='text-2xl flex flex-col justify-center gap-2'>
          <span>Готовы начать?</span>
          <Button>Начать</Button>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <p>Почему мы?</p>
          <div className='grid grid-cols-3 gap-4 justify-center'>
            <Card>
              <CardHeader>
                <div className='font-bold flex gap-2 items-center'>
                  <Check />
                  Простота использования
                </div>
                <CardDescription>
                  Если раньше надо было использовать средство для общения во
                  время интервью и другие сервисы с лайв-кодингом, то сейчас это
                  можно делать в одном удобном и понятном интерфейсе.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className='font-bold flex gap-2 items-center'>
                  <Radio />
                  Лайв-кодинг
                </div>
                <CardDescription>
                  Мы поддерживаем режим лайв-кодинга, где можно увидеть
                  результаты задачи здесь и сейчас.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className='font-bold flex gap-2 items-center'>
                  <Radio /> Лайв конференция
                </div>
                <CardDescription>
                  Мы также предлагаем лайв конференцию, где вместе с собеседущим
                  вы можете разговаривать и общаться по веб-камере.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
