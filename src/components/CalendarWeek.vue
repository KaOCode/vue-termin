<template>
	<div id="calender-week">
		<div class="card-group">
			<calendar-day
				v-for="day in calendarWeekData"
				:key="day.id"
        :day="day"
			></calendar-day>
		</div>
	</div>
</template>

<script>
	import CalendarDay from "./CalendarDay";
	import Store from "../store";

	export default {
		name: "CalendarWeek",
		components: {
			CalendarDay,
		},
		data() {
			return {
				calendarWeekData: Store.state.calendarWeekData,
			};
		},
	};
</script>

<style scoped></style>
