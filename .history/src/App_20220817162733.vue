<template>
	<div class="container-fluid mt-5">
		<div class="row">
			<div class="col-12">
				<!-- Anfang: Template für die Calendar-Week-Component -->
				<!-- <calendar-week-as-list></calendar-week-as-list>
				<calendar-week></calendar-week> -->
				<keep-alive>
				<transition name="fade" mode="out-in" appear>
					<component :is="activeView" />
				</transition>
				</keep-alive>
				<!-- Ende: Template für die Calendar-Week-Component -->
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-4 offset-4">
				<!-- Anfang: Template für die Calendar-Entry-Component -->
				<calendar-entry></calendar-entry>
				<!-- Ende: Template für die Calendar-Day-Component -->
			</div>
			<div class="col-2 offset-2">
				<div class="float-end">
					<!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
					<button
						class="btn btn-lg mb-2"
						:class="buttonSettingsClasses"
						@click="toggleDisplaySettings()"
					>
						<i class="fas fa-cogs"></i>
					</button>
				</div>
				<!-- Anfang: Template für die Calendar-Settings-Component -->
				<transition name="fade">
					<calendar-settings v-if="displaySettings"></calendar-settings>
				</transition>
				<!-- Ende: Template für die Calendar-Day-Component -->
			</div>
		</div>
	</div>
</template>

<script>
	import Store from './store'
	import { defineAsyncComponent } from 'vue'
	import CalendarWeek from './components/CalendarWeek'
	import CalendarWeekAsList from './components/CalendarWeekAsList.vue'
	import CalendarEntry from './components/CalendarEntry'
	export default {
		name: 'App',
		components: {
			CalendarWeek,
			CalendarWeekAsList,
			CalendarEntry,
			CalendarSettings: defineAsyncComponent(() => {
				return import(
					/*webpackChunkName: 'CalendarSettingsComponent'*/ './components/CalendarSettings.vue'
				)
			}),
		},
		data() {
			return {
				displaySettings: false,
			}
		},
		computed: {
			buttonSettingsClasses() {
				return this.displaySettings ? ['btn-success'] : ['btn-outline-success']
			},
			activeView() {
				return Store.getters.activeView()
			},
		},
		methods: {
			toggleDisplaySettings() {
				this.displaySettings = !this.displaySettings
			},
		},
	}
</script>

<style>
	@import '~bootstrap/dist/css/bootstrap.min.css';
	@import '~@fortawesome/fontawesome-free/css/all.min.css';

	.square {
		width: 40px;
		height: 40px;
	}
	/*Transition Fade default v-enter-from*/
	.fade-enter-from, .fade-leave-to {
		opacity: 0;
	}

	.fade-enter-to, .fade-leave-from {
		opacity: 1;
	}

	.fade-enter-active, .fade-leave-active {
		transition: all 0.25s ease-out;
	}

</style>
