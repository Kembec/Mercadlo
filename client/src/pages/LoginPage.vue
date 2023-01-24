<script setup lang="ts">
	import { computed, defineAsyncComponent, ref } from "vue";

	import type { ILoginComponent } from "./Login/interfaces/loginComponent.interface";

	//Data
	const view = ref<string>("Base");
	const components: ILoginComponent = {
		Base: {
			title: "Sign in",
			component: defineAsyncComponent(() => import(`./Login/components/BaseComponent.vue`)),
		},
		Register: {
			title: "Sign up",
			component: defineAsyncComponent(() => import(`./Login/components/RegisterComponent.vue`)),
		},
		Forgot: {
			title: "Recovery Password",
			component: defineAsyncComponent(() => import(`./Login/components/ForgotComponent.vue`)),
		},
	};

	//Computed
	const activeComponent = computed(() => components[view.value]);

	//Methods
	const changeView = (newView: string): void => {
		view.value = newView;
	};
</script>
<template>
	<div id="login">
		<div class="content">
			<component :is="activeComponent.component" class="form" @change-view="changeView">
				<div class="head">
					<button v-if="view != 'Base'" class="to-base" @click="view = 'Base'">
						<font-awesome-icon icon="chevron-left" />
					</button>
					<h1>{{ activeComponent.title }}</h1>
				</div>
			</component>
			<div class="image">
				<img src="/images/login_image.jpg" />
			</div>
		</div>
	</div>
</template>
<style lang="postcss" scoped>
	#login {
		@apply flex w-screen flex-col bg-blue-600;
	}
	.head {
		@apply relative mb-10 flex w-full justify-center;
	}
	.head > h1 {
		@apply text-center text-4xl font-semibold tracking-wider text-gray-700;
	}
	.head > .to-base {
		@apply mr-4 flex items-center text-xl text-gray-600 hover:text-gray-500;
	}
	.form {
		@apply flex w-full flex-col justify-center bg-white p-7 lg:w-auto lg:max-w-[30vw] lg:p-10 xl:max-w-[20vw];
	}
	.content {
		@apply absolute left-1/2 top-1/2 flex w-[90vw] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 flex-nowrap justify-center overflow-auto drop-shadow-md lg:w-[80vw] xl:w-[70vw];
	}
	.content > * {
		@apply first:rounded-l-lg first:rounded-r-lg last:hidden last:rounded-r-lg lg:first:rounded-r-none lg:last:flex;
	}
	.image,
	.image > img {
		@apply rounded-r-lg;
	}
</style>
