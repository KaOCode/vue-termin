import { calendarWeekData } from './seed'
import { reactive, readonly } from 'vue'
const state = reactive({
	// reactive store initialisieren
	calendarWeekData,
})

const getters = {
	activeDay: () => state.calendarWeekData.find((day) => day.active),
}
const mutations = {
	deleteEvent(dayId, eventTitle) {
		const dayObj = state.calendarWeekData.find((day) => day.id === dayId)
		const eventIndex = dayObj.events.findIndex(
			(event) => event.title === eventTitle
		)
		dayObj.events.splice(eventIndex, 1)
	},
	storEvent(eventDO) {
		const activeDay = getters.activeDay()
		activeDay.events.push({
			title: eventDO.title,
			edit: false,
			color: eventDO.color,
			priority: Number(eventDO.priority),
		})
	},
	editEvent(dayId, eventTitle) {
		// Alle auf fals setzen
		state.calendarWeekData.map((dayObj) => {
			dayObj.events.map((event) => (event.edit = false))
		})

		const dayObj = state.calendarWeekData.find((day) => day.id === dayId)
		const eventObj = dayObj.events.find((event) => event.title === eventTitle)
		eventObj.edit = true
	},

	updateEvent(dayId, oldEventTitle, newEvent) {
		newEvent.title = newEvent.title !== '' ? newEvent.title : oldEventTitle
		const dayObj = state.calendarWeekData.find((day) => day.id === dayId)
		const eventObj = dayObj.events.find(
			(event) => event.title === oldEventTitle
		)
		eventObj.title = newEvent.title
		eventObj.priority = Number(newEvent.priority)
		eventObj.edit = false
	},

	setActiveDay(dayId) {
		state.calendarWeekData.map((dayObj) => {
			dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false)
		})
	},
}

export default {
	state: readonly(state), // nur lesen nicht schreiben
	getters,
	mutations, // mutations handeln die änderungen und geben jedem component die änderungen mit (ähnlich wie Redux)
}
