<template>
    <div class="card">
      <div class="card-header text-center" role="button">
        <strong>Montag</strong>
      </div>
      <div class="card-body">
        <calendar-event></calendar-event>
      </div>
    </div>
</template>
<script>
import CalendarEvent from "./CalendarEvent";
export default {
  name: "CalendarDay",
  components: {
    CalendarEvent,
  },
};
</script>
<style scoped></style>
