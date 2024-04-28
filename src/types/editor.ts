export interface Answer {
	answer_test: number
	work: boolean
	your_answer_test: number
}
export interface ResultFromTest {
	allTests: number // Всего тестов
	passTests: number // Сколько прошли тестов
	result: Answer[] // Результат
	error?: {}
}
