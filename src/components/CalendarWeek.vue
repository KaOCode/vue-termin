<template>
  <div id="calender-week">
    <div class="card-group">
      <calendar-day v-for="i in 7" :key="i"></calendar-day>
    </div>
  </div>
</template>

<script>
import CalendarDay from "./CalendarDay";

export default {
  name: "CalendarWeek",
  components: {
    CalendarDay,
  },
};
</script>

<style scoped></style>
