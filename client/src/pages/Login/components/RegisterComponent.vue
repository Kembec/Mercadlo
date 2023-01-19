<script setup lang="ts">
	import { InputTypes } from "@/shared/data/InputTypes";
	import { ref } from "vue";
	import { register } from "../composables/useRegister.composable";
	import NiceInput from "@/shared/components/NiceInputComponent.vue";
	import type { INewUser } from "../interfaces/newUser.interface";

	//Interfaces
	export interface EmitChangeView {
		(event: "changeView", view: string): void;
	}

	//Emits
	const emit = defineEmits<EmitChangeView>();

	//Data
	const newUser = ref<INewUser>({
		name: "",
		email: "",
		password: "",
	});

	//Methods
	const newRegister = async (): Promise<void> => {
		const user = newUser.value;
		const r = await register(user.name, user.email, user.password);
		if (r) {
			emit("changeView", "Base");
		}
	};
</script>
<template>
	<form @submit.prevent="newRegister">
		<slot />
		<NiceInput class="mb-5" icon="user" v-model:model="newUser.name" placeholder="Name" :required="true" />
		<NiceInput class="mb-5" icon="at" v-model:model="newUser.email" placeholder="E-mail" :type="InputTypes.EMAIL" :required="true" />
		<NiceInput class="mb-5" icon="key" v-model:model="newUser.password" placeholder="Password" :type="InputTypes.PASSWORD" :required="true" />
		<button type="submit" class="base-submit">Send</button>
	</form>
</template>
<style lang="postcss" scoped></style>
