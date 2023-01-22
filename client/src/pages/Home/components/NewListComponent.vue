<script setup lang="ts">
	import { ref } from "vue";
	import { addList } from "../composables/useCRUDList.composable";

	//Interfaces
	export interface Emits {
		(event: "getLists"): void;
	}

	//Emits
	const emit = defineEmits<Emits>();

	//Data
	const name = ref<string>();

	//Methods
	const newList = async (): Promise<void> => {
		const list = await addList(name.value);
		if (list) {
			name.value = "";
			emit("getLists");
			return;
		}
	};
</script>
<template>
	<form class="new-list" @submit.prevent="newList()">
		<h2>New List</h2>
		<input type="text" v-model="name" placeholder="Name of list" />
		<button>Add</button>
	</form>
</template>
<style lang="postcss" scoped>
	.new-list {
		@apply mt-10 flex h-full flex-col border-t border-black/5 bg-gray-50 p-10;
	}
	h2 {
		@apply text-xl font-semibold text-gray-700 antialiased;
	}
	input {
		@apply mt-5 mb-10 border-b-2 border-black/50 bg-transparent p-2;
	}
	button {
		@apply rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600;
	}
</style>
