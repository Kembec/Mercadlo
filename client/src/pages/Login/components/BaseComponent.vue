<script setup lang="ts">
	import { InputTypes } from "@/shared/data/InputTypes";
	import { login } from "../composables/useLogin.composable";
	import { ref } from "vue";
	import NiceInput from "@/shared/components/NiceInputComponent.vue";
	import router from "@/router";

	//Interfaces
	export interface EmitChangeView {
		(event: "changeView", view: string): void;
	}

	//Emits
	const emit = defineEmits<EmitChangeView>();

	//Data
	const email = ref<string>("");
	const password = ref<string>("");

	//Methods
	const newLogin = async (): Promise<void> => {
		const l = await login(email.value, password.value);
		console.log(l);
		if(l) {
			router.push({ name: 'home' })
		}
	};
</script>
<template>
	<form @submit.prevent="newLogin">
		<slot />
		<NiceInput class="mb-5" icon="at" v-model:model="email" placeholder="E-mail" :type="InputTypes.EMAIL" :required="true" />
		<NiceInput class="mb-5" icon="key" v-model:model="password" placeholder="Password" :type="InputTypes.PASSWORD" :required="true" />
		<button type="submit" class="base-submit">Login</button>
		<div class="bottom">
			<button @click.prevent="emit('changeView', 'Register')" class="register"> Register now </button>
			<button @click.prevent="emit('changeView', 'Forgot')" class="forgot"> Forgot password? </button>
		</div>
	</form>
</template>
<style lang="postcss" scoped>
	.image > img {
		@apply rounded-r-lg object-cover;
	}
	.bottom {
		@apply mt-10 flex flex-nowrap justify-between text-sm;
	}
	.bottom > .register {
		@apply text-blue-500 hover:text-blue-400;
	}
	.bottom > .forgot {
		@apply text-gray-500 hover:text-gray-400;
	}
</style>
