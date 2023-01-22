<script setup lang="ts">
	import { ref, onBeforeMount, defineAsyncComponent } from "vue";
	import Products from "./Home/components/ProductsComponent.vue";
	import type { IList } from "./Home/interfaces/list.interfaces";

	//Components
	const NewList = defineAsyncComponent(() => import(`./Home/components/NewListComponent.vue`));

	//Data
	const listId = ref<string>();
	const lists = ref<IList[]>();
	const showNewlist = ref<boolean>(false);
	const showProducts = ref<string>();

	//Mounted
	onBeforeMount(async () => {
		await _getLists();
		if(lists.value && lists.value[0]) {
			showProducts.value = lists.value[0]._id;
		}
	});

	//Methods
	const _getLists = async (): Promise<void> => {
		const { getLists } = await import("./Home/composables/useCRUDList.composable");
		lists.value = await getLists();
	};
	const _addList = (display: boolean): void => {
		showNewlist.value = display;
	};
	const _updateList = async (id: string, name: string): Promise<void> => {
		const { updateList } = await import("./Home/composables/useCRUDList.composable");
		await updateList(id, name);
		listId.value = "";
		await _getLists();
	};
	const _deleteLists = async (id: string): Promise<void> => {
		const { deleteList } = await import("./Home/composables/useCRUDList.composable");
		await deleteList(id);
		await _getLists();
	};
	const vFocus = {
		mounted: (el: HTMLElement) => el.focus(),
	};
</script>
<template>
	<div class="home">
		<div class="content">
			<h2>Lists</h2>
			<div v-for="(l, i) in lists" class="list-group" :key="i">
				<div class="list">
					<input v-if="listId == l._id" v-model="l.name" class="name" v-focus />
					<div class="name" v-else>
						{{ l.name }}
					</div>
					<div class="buttons">
						<button v-if="listId == l._id" class="update" @click="_updateList(l._id, l.name)"> Update </button>
						<button @click="_deleteLists(l._id)">
							<font-awesome-icon icon="trash" />
						</button>
						<button @click="listId = listId != l._id ? l._id : ''">
							<font-awesome-icon icon="pencil" />
						</button>
						<button @click="showProducts = showProducts != l._id ? l._id : ''">
							<font-awesome-icon :icon="showProducts == l._id ? 'chevron-up' : 'chevron-down'" />
						</button>
					</div>
				</div>
				<Products v-if="showProducts == l._id" :listId="l._id" />
			</div>
		</div>
		<div class="sidebar">
			<h2>Tools</h2>
			<button @click="_addList(!showNewlist)">
				<font-awesome-icon icon="plus" />
				<span>New List </span>
			</button>
			<NewList v-if="showNewlist" @getLists="_getLists" />
		</div>
	</div>
</template>
<style lang="postcss" scoped>
	.home {
		@apply grid grid-cols-1 gap-0 lg:grid-cols-12;
	}
	.content {
		@apply p-5 lg:col-span-8 lg:border-r lg:border-black/5  lg:p-10 xl:col-span-9;
	}
	.sidebar {
		@apply flex flex-col lg:col-span-4 xl:col-span-3;
	}
	h2 {
		@apply mb-10 text-2xl font-semibold text-gray-800 antialiased;
	}

	.sidebar > h2 {
		@apply m-10;
	}
	.sidebar > button {
		@apply mx-10 flex flex-nowrap items-center justify-between space-x-3 rounded-md bg-blue-600 px-5 py-3 text-white hover:bg-blue-500;
	}
	.sidebar > button > span {
		@apply text-lg font-semibold tracking-wide antialiased;
	}

	.list-group {
		@apply mb-5 flex flex-col;
	}
	.list-group > .list {
		@apply flex flex-nowrap justify-between rounded-md border border-black/5 bg-gray-100 drop-shadow-sm;
	}
	.list-group > .list > * {
		@apply py-2.5 first:pl-5 last:pr-5;
	}
	.list-group > .list > .name {
		@apply flex flex-nowrap items-center space-x-3 bg-transparent;
	}

	.buttons {
		@apply flex flex-nowrap space-x-5 border-l border-black/5 pl-5;
	}
	.buttons > * {
		@apply text-gray-500 hover:text-gray-400;
	}
	.buttons > .update {
		@apply rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-500;
	}
</style>
