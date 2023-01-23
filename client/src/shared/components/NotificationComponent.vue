<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { useNotification } from "@/stores/notification.store";

	//Pinia
	const notificationStore = useNotification();
	const { getNotification } = storeToRefs(notificationStore);
</script>
<template>
	<div v-if="getNotification" id="notification">
		{{ getNotification }}
	</div>
</template>
<style lang="postcss" scoped>
	#notification {
		@apply fixed bottom-5 right-5 bg-white rounded-lg border border-black/5 drop-shadow-md;
	}
</style>
