<script setup lang="ts">
	import { ref } from "vue";

	import router from "@/router";
	import NiceInput from "@/shared/components/NiceInputComponent.vue";
	import { InputTypes } from "@/shared/data/InputTypes";

	import { login } from "../composables/useLogin.composable";

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
		if (l) {
			router.push({ name: "home" });
		}
	};
</script>
<template>
	<form @submit.prevent="newLogin">
		<slot />
		<NiceInput id="email" v-model:model="email" class="mb-5" icon="at" placeholder="E-mail" :type="InputTypes.EMAIL" :required="true" />
		<NiceInput
			id="password"
			v-model:model="password"
			class="mb-5"
			icon="key"
			placeholder="Password"
			:type="InputTypes.PASSWORD"
			:required="true"
		/>
		<button type="submit" class="base-submit">Login</button>
		<div class="bottom">
			<button class="register" @click.prevent="emit('changeView', 'Register')"> Register now </button>
			<button class="forgot" @click.prevent="emit('changeView', 'Forgot')"> Forgot password? </button>
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
