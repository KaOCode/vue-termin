<template>
	<div class="card border-start" :class="cardClasses">
		<div
			class="card-header text-center"
			:class="classHeaderClasses"
			role="button"
			@click="setActiveDay"
		>
			<strong>{{ day.fullName }}</strong>
		</div>
		<div class="card-body">
			<transition name="fade" mode="out-in">
				<div v-if="day.events.length">
					<transition-group name="list">
						<calendar-event
							v-for="event in events"
							:key="event.title"
							:event="event"
							:day="day"
						>
							<template #eventPriority="slotProps">
								<h5>{{ slotProps.priorityDisplayName }}</h5>
							</template>
							<template #eventTitle="{ event: entry }">
								<i>{{ entry.title }}</i>
							</template>
						</calendar-event>
					</transition-group>
				</div>
				<div v-else>
					<div class="alert alert-light text-center">
						<i>Keine Termine</i>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
	import CalendarEvent from './CalendarEvent'
	import Store from '../store'
	export default {
		name: 'CalendarDay',
		components: {
			CalendarEvent,
		},
		// Array schreibweiße nicht zuEmpfehlen
		// props: ["day"],
		// Object
		props: {
			// Typisieren
			// Mehrere Typen [Object, String] usw.
			day: {
				type: Object,
				required: true,
				default: function () {
					return {
						id: -1,
						fullName: 'Wochentag nicht gefunden',
						events: [],
					}
				},
				validator: function (value) {
					if (Object.keys(value).includes('id')) {
						return true
					}
				},
			},
		},
		methods: {
			setActiveDay() {
				Store.mutations.setActiveDay(this.day.id)
			},
		},
		computed: {
			cardClasses() {
				return this.day.id === Store.getters.activeDay().id
					? ['border-primary']
					: null
			},
			classHeaderClasses() {
				return this.day.id === Store.getters.activeDay().id
					? ['bg-primary', 'text-white']
					: null
			},
			events() {
				return Store.getters.events(this.day.id)
			},
		},
	}
</script>
<style scoped>
	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateY(30px);
	}

	.list-enter-to,
	.list-leave-from {
		opacity: 1;
		transform: translateY(0);
	}

	.list-enter-active,
	.list-leave-active {
		transition: all 1s ease;
	}

	.list-move {
		trans
	}
</style>
