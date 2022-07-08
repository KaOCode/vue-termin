import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";
const state = reactive({
	// reactive store initialisieren
	calendarWeekData,
});

const getters = {
	activeDay: () => state.calendarWeekData.find((day) => day.active),
};
const mutations = {
	deleteEvent(dayId, eventTitle) {
		const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
		const eventIndex = dayObj.events.findIndex(
			(event) => event.title === eventTitle
		);
		dayObj.events.splice(eventIndex, 1);
	},
	editEvent(dayId, eventTitle) {
		// Alle auf fals setzen
		state.calendarWeekData.map((dayObj) => {
			dayObj.events.map((event) => (event.edit = false));
		});

		const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
		const eventObj = dayObj.events.find((event) => event.title === eventTitle);
		eventObj.edit = true;
	},
};

export default {
	state: readonly(state), // nur lesen nicht schreiben
	getters,
	mutations, // mutations handeln die änderungen und geben jedem component die änderungen mit (ähnlich wie Redux)
};
