<script setup lang="ts">
	import { computed, defineProps, onBeforeMount, ref } from "vue";

	import NiceInput from "@/shared/components/NiceInputComponent.vue";

	import type { IProduct } from "../interfaces/product.interface";

	//Interfaces
	export interface Props {
		listId: string;
	}

	//Props
	const props = defineProps<Props>();
	const products = ref<IProduct[]>();

	//Data
	const newProduct = ref<{ name: string; price: number }>({ name: "", price: 0 });
	const updateId = ref<string>();

	//Computed
	const totalProduct = computed((): number => {
		if (!products.value) {
			return 0;
		}
		return products.value.reduce((acc, val) => {
			return acc + val.price;
		}, 0);
	});

	//BeforeMount
	onBeforeMount(async () => {
		await _getProducts();
	});

	//Methods
	const _addProduct = async (): Promise<void> => {
		const { addProduct } = await import("../composables/useCRUDProduct.composable");
		await addProduct(props.listId, newProduct.value.name, newProduct.value.price);
		await _getProducts();
	};
	const _getProducts = async (): Promise<void> => {
		const { getProducts } = await import("../composables/useCRUDProduct.composable");
		products.value = await getProducts(props.listId);
	};
	const _updateProduct = async (id: string, name: string, price: number): Promise<void> => {
		const { updateProduct } = await import("../composables/useCRUDProduct.composable");
		await updateProduct(props.listId, id, name, price);
		updateId.value = "";
		await _getProducts();
	};
	const _deleteProduct = async (id: string): Promise<void> => {
		const { deleteProduct } = await import("../composables/useCRUDProduct.composable");
		await deleteProduct(props.listId, id);
		await _getProducts();
	};
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
</script>
<template>
	<div class="products">
		<div class="item">
			<b class="responsive">#</b>
			<b class="col-span-4">Name</b>
			<b class="col-span-4">Price</b>
			<b class="col-span-2">Actions</b>
		</div>
		<div v-for="(item, n) in products" id="product" :key="n" class="item">
			<div class="responsive">
				{{ n + 1 }}
			</div>
			<input v-if="updateId == item._id" id="name" v-model="item.name" class="col-span-4" />
			<div v-else class="col-span-4">
				{{ item.name }}
			</div>
			<input v-if="updateId == item._id" id="price" v-model.number="item.price" class="col-span-4" />
			<div v-else class="col-span-4">
				{{ formatter.format(item.price) }}
			</div>
			<div class="buttons">
				<button v-if="updateId == item._id" id="update-product" class="update" @click="_updateProduct(item._id, item.name, item.price)">
					Update
				</button>
				<button id="delete-product" @click="_deleteProduct(item._id)">
					<font-awesome-icon icon="trash" />
				</button>
				<button id="show-update" @click="updateId = updateId != item._id ? item._id : ''">
					<font-awesome-icon icon="pencil" />
				</button>
			</div>
		</div>
		<div class="item">
			<b class="col-span-4 lg:col-span-5">Total</b>
			<b class="col-span-4">{{ formatter.format(totalProduct) }}</b>
		</div>
		<form class="add-product" @submit.prevent="_addProduct()">
			<NiceInput id="new-product-name" v-model:model="newProduct.name" icon="box" placeholder="Name" :required="true" />
			<NiceInput id="new-product-price" v-model:model="newProduct.price" icon="dollar" placeholder="Price" :required="true" />
			<button type="submit">Add Product</button>
		</form>
	</div>
</template>
<style lang="postcss" scoped>
	.products {
		@apply flex flex-col py-5 lg:px-5;
	}
	.buttons {
		@apply col-span-2 flex flex-nowrap space-x-3 px-5 lg:space-x-5;
	}
	.buttons > * {
		@apply text-gray-500 hover:text-gray-400;
	}
	.buttons > .update {
		@apply rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-500;
	}

	.add-product {
		@apply mt-10 flex flex-col justify-end space-y-5 lg:flex-row lg:flex-nowrap lg:space-y-0 lg:space-x-5;
	}
	.add-product > button {
		@apply rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500;
	}

	.item {
		@apply grid grid-cols-11 gap-0 border-b border-black/5 py-2.5 text-gray-600;
	}
	.item > * {
		@apply flex justify-center text-center;
	}

	.responsive {
		@apply hidden lg:flex;
	}
</style>
