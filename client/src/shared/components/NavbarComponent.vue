<script setup lang="ts"></script>
<template>
	<nav>
		<div class="logo"> mercadlo </div>
		<div></div>
	</nav>
</template>
<style lang="postcss" scoped>
	nav {
		@apply sticky top-0 flex h-16 flex-nowrap justify-between border-b border-black/5 bg-white py-3 px-5 drop-shadow-sm lg:px-10;
	}
	.logo {
		@apply select-none text-3xl font-bold text-blue-600 antialiased drop-shadow-md;
	}
</style>
