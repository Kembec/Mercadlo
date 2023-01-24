<script setup lang="ts">
	import { ref } from "vue";

	import NiceInput from "@/shared/components/NiceInputComponent.vue";
	import { InputTypes } from "@/shared/data/InputTypes";

	import { register } from "../composables/useRegister.composable";
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
		<NiceInput id="name" v-model:model="newUser.name" class="mb-5" icon="user" placeholder="Name" :required="true" />
		<NiceInput id="email" v-model:model="newUser.email" class="mb-5" icon="at" placeholder="E-mail" :type="InputTypes.EMAIL" :required="true" />
		<NiceInput
			id="password"
			v-model:model="newUser.password"
			class="mb-5"
			icon="key"
			placeholder="Password"
			:type="InputTypes.PASSWORD"
			:required="true"
		/>
		<button type="submit" class="base-submit">Send</button>
	</form>
</template>
<style lang="postcss" scoped></style>
