import { calendarWeekData } from './seed'
import { reactive, readonly } from 'vue'
const state = reactive({
	// reactive store initialisieren
	calendarWeekData,
	activeView: "CalendarWeek",
	activeOrdering: "title"
})

const getters = {
	activeDay: () => state.calendarWeekData.find((day) => day.active),
	activeView: () => state.activeView,
	activeOrdering: () => state.activeOrdering,
	events: (dayId) => {
		const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
		const AsyncComp = defineAsyncComponent({
			// The factory function
			loader: () => import('')
			// A component to use while the async component is loading
			loadingComponent: loadingComponent,
			// A component to use if the load fails
			errorComponent: errorComponent,
			// Delay before showing the loading component. Default: 200ms.
			delay: 200,
			// The error component will be displayed if a timeout is
			// provided and exceeded. Default: Infinity.
			timeout: 3000,
			// Defining if component is suspensible. Default: true.
			suspensible: false,
			onError(error, retry, fail, attempts) {
				if (error.message.match(/fetch/) && attempts <= 3) {
					// retry on fetch errors, 3 max attempts
					retry()
				} else {
					// Note that retry/fail are like resolve/reject of a promise:
					// one of them must be called for the error handling to continue.
					fail()
				}
			},
		})
	}
}
const mutations = {
	deleteEvent(dayId, eventTitle) {
		const dayObj = state.calendarWeekData.find((day) => day.id === dayId)
		const eventIndex = dayObj.events.findIndex(
			(event) => event.title === eventTitle
		)
		dayObj.events.splice(eventIndex, 1)
	},
	setActiveView(view) {
		state.activeView = view;
	},
	setActiveOrdering(ordering) {
		state.activeOrdering = ordering;
	},
	storeEvent(eventDO) {
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
