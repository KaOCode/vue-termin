<template>
	<div id="calendar-event">
		<div class="alert text-center" :class="alertColor">
			<div>
				<!-- <strong>{{ priorityDisplayName }}</strong> -->
				<slot name="eventPriority" :priorityDisplayName="priorityDisplayName">
                <!-- Fallback -->
                {{ priorityDisplayName }}
                </slot>
			</div>

			<!-- <div>{{ event.title }}</div> -->
			<slot name="eventTitle" :event="event">
				<!-- Fallback -->
				{{ event.title }}
			</slot>

			<div>
				<i class="fas fa-edit me-2" role="button"></i>
				<i class="far fa-trash-alt" role="button" @click="deleteEvent()"></i>
			</div>
		</div>
	</div>
</template>

<script>
import Store from "../store"
	export default {
		name: "CalendarEvent",
		props: {
			event: Object,
            day: Object
		},
		computed: {
			priorityDisplayName() {
				switch (this.event.priority) {
					case 1:
						return "Tief";
					case 0:
						return "Mittel";
					case -1:
						return "Hoch";
				}
				return "Unknown Priority";
			},
			alertColor() {
				return "alert-" + this.event.color;
			},
		},
        methods: {
            deleteEvent() {
                Store.mutations.deleteEvent(this.day.id, this.event.title)
            }
        }
	};
</script>
<style scoped></style>
