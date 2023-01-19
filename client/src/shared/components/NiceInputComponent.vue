<script setup lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
	import { ref } from "vue";
	import { InputTypes } from "@/shared/data/InputTypes";
	import type { IconName } from "@fortawesome/fontawesome-common-types";

	//Interfaces
	export interface Props {
		icon: IconName;
		model: string;
		placeholder: string;
		type?: InputTypes;
		required?: boolean;
	}

	//Prop
	const props = defineProps<Props>();

	//Emits
	const emits = defineEmits(["update:model"]);

	//Data
	const model = ref(props.model);
	const DEFAULT_TYPE = InputTypes.TEXT;
	const type = ref<InputTypes | undefined>(props.type ?? DEFAULT_TYPE);

	//Methods
	const onInput = (): void => {
		emits("update:model", model.value);
	};
	const changeVisibilityPassword = (): void => {
		if (type.value == InputTypes.PASSWORD) {
			type.value = InputTypes.TEXT;
			return;
		}
		type.value = InputTypes.PASSWORD;
	};
</script>
<template>
	<div class="nice-input">
		<label>
			<font-awesome-icon :icon="props.icon" />
		</label>
		<input v-model="model" @input="onInput" :type="type" :placeholder="props.placeholder" :required="props.required" />
		<button v-if="props.type == InputTypes.PASSWORD" @click.prevent="changeVisibilityPassword" class="visibility-password">
			<font-awesome-icon :icon="type == InputTypes.PASSWORD ? 'eye' : 'eye-slash'" />
		</button>
	</div>
</template>
<style lang="postcss" scoped>
	.nice-input {
		@apply mb-5 flex flex-nowrap rounded-md border border-black/5 text-gray-500;
	}
	.nice-input > * {
		@apply p-3;
	}
	.nice-input > label {
		@apply border-r border-black/5;
	}
	.nice-input > input {
		@apply flex w-full rounded-r-md;
	}
	.visibility-password {
		@apply flex min-w-[3rem] max-w-[3rem] items-center justify-center text-gray-400;
	}
</style>
