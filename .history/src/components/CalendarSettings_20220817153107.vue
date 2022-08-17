<template>
	<div id="calendar-settings">
		<div class="card">
			<div class="card-header text-center bg-success text-white">
				<strong>Einstellungen</strong>
			</div>
			<div class="card-body">
				<ul class="nav nav-pills nav-fill">
					<li
						v-for="(icon, componentName) in views"
						:key="componentName"
						class="nav-item"
						role="button"
					>
						<a class="nav-link" @click="changeActiveView(componentName)"
							><i class="text-success" :class="icon"></i
						></a>
					</li>
				</ul>
				<hr />
				<ul class="nav nav-pills nav-fill">
					<li class="nav-item" role="button">
						<a class="nav-link"
							><i class="fas fa-sort-numeric-down-alt text-success"></i
						></a>
					</li>
					<li class="nav-item" role="button">
						<a class="nav-link"
							><i class="fas fa-sort-alpha-down text-success"></i
						></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Store from '../store'
	export default {
		name: 'CalendarSettings',
		data() {
			return {
				views: {
					CalendarWeek: 'fas fa-table',
					CalendarWeekAsList: 'fa fa-list',
				},
			}
		},
	}
</script>

<style scoped></style>
