<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { useNotification } from "@/stores/notification.store";

	//Pinia
	const notificationStore = useNotification();
	const { getNotification } = storeToRefs(notificationStore);
</script>
<template>
	<div v-if="getNotification" id="notification">
		<font-awesome-icon icon="bell" />
		<span>
			{{ getNotification }}
		</span>
	</div>
</template>
<style lang="postcss" scoped>
	#notification {
		@apply fixed bottom-5 right-5 flex flex-nowrap space-x-5 rounded-lg border border-black/5 bg-white p-5 drop-shadow-md;
	}
	#notification > * {
		@apply my-auto;
	}
</style>
