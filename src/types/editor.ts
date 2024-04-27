export interface Answer {
	answer: string
	yourAnswer: string
}
export interface ResultFromTest {
	allTests: number // Всего тестов
	passTests: number // Сколько прошли тестов
	result: Answer[] // Результат
}
