import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";
const state = reactive({
	// reactive store initialisieren
	calendarWeekData,
});

const getters = {};
const mutations = {};

export default {
	state: readonly(state), // nur lesen nicht schreiben
	getters,
	mutations, // mutations handeln die änderungen und geben jedem component die änderungen mit (ähnlich wie Redux)
};
