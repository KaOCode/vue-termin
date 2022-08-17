<template>
	<div id="calendar-event">
		<div class="alert text-center" :class="alertColor">
			<!-- If template -->
			<transition>
				<div>
					<template v-if="!event.edit">
						<div>
							<!-- <strong>{{ priorityDisplayName }}</strong> -->
							<slot
								name="eventPriority"
								:priorityDisplayName="priorityDisplayName"
							>
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
							<i
								class="fas fa-edit me-2"
								role="button"
								@click="editEvent()"
							></i>
							<i
								class="far fa-trash-alt"
								role="button"
								@click="deleteEvent()"
							></i>
						</div>
					</template>
					<!-- v-if und else oder elseif müssen direkt untereinander sein  -->
					<template v-else>
						<input
							type="text"
							class="form-control"
							:placeholder="event.title"
							@input="setNewEventTitle($event)"
							ref="newEventTitleInput"
						/>
						<div>
							<select class="form-select mt-2" v-model="newEventPriority">
								<option value="-1">Hoch</option>
								<option value="0">Mittel</option>
								<option value="1">Tief</option>
							</select>
						</div>
						<hr />
						<i class="fas fa-check" role="button" @click="updateEvent()"></i>
					</template>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import Store from '../store'
	export default {
		name: 'CalendarEvent',
		props: {
			event: Object,
			day: Object,
		},
		data() {
			return {
				newEventTitle: '',
				newEventPriority: this.event.priority,
			}
		},
		computed: {
			priorityDisplayName() {
				switch (this.event.priority) {
					case 1:
						return 'Tief'
					case 0:
						return 'Mittel'
					case -1:
						return 'Hoch'
				}
				return 'Unknown Priority'
			},
			alertColor() {
				return 'alert-' + this.event.color
			},
		},
		methods: {
			deleteEvent() {
				Store.mutations.deleteEvent(this.day.id, this.event.title)
			},
			editEvent() {
				Store.mutations.editEvent(this.day.id, this.event.title)
				this.$nextTick(() => {
					this.$refs.newEventTitleInput.focus()
				})
			},
			setNewEventTitle(event) {
				this.newEventTitle = event.target.value
			},
			updateEvent() {
				Store.mutations.updateEvent(this.day.id, this.event.title, {
					title: this.newEventTitle,
					priority: this.newEventPriority,
				})
			},
		},
	}
</script>
<style scoped></style>
