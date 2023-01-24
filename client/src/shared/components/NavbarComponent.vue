<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { ref } from "vue";

	import { useUser } from "@/stores/user.store";

	//Pinia
	const userStore = useUser();
	const { getUser } = storeToRefs(userStore);

	//Data
	const showDropDown = ref<boolean>(false);

	//Methods
	const newLogout = async () => {
		const { logout } = await import("../composables/useLogout.composable");
		const l = await logout();
		if (l) {
			location.reload();
		}
	};
</script>
<template>
	<nav>
		<div class="logo"> mercadlo </div>
		<div>
			<div v-if="getUser" class="user">
				<div>
					<span>
						{{ getUser.name }}
					</span>
					<button @click="showDropDown = !showDropDown">
						<font-awesome-icon icon="user" />
					</button>
				</div>
				<ul v-if="showDropDown">
					<li @click="newLogout">Log out</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<style lang="postcss" scoped>
	nav {
		@apply sticky top-0 flex h-16 flex-nowrap justify-between border-b border-black/5 bg-white py-3 px-5 drop-shadow-sm lg:px-10;
	}
	.logo {
		@apply select-none text-3xl font-bold text-blue-600 antialiased drop-shadow-md;
	}
	.user {
		@apply relative my-auto flex flex-col;
	}
	.user > div {
		@apply flex flex-nowrap items-center space-x-3;
	}
	.user > div > button {
		@apply relative h-10 w-10 rounded-full border border-black/5 bg-gray-50 text-gray-800 drop-shadow-sm;
	}
	.user > div > button > svg {
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
	}
	.user > ul {
		@apply absolute top-[110%] left-1/2 -translate-x-1/2 flex-col drop-shadow-md;
	}
	.user > ul > li {
		@apply flex w-full min-w-max cursor-pointer border-t  border-black/5 bg-white py-2 px-4 last:rounded-b-md hover:bg-gray-50;
	}
</style>
