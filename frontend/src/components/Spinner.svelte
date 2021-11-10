<div class="w-20 h-20 center border-4 border-indigo-600 rounded-full loader"></div>

<style>
	@keyframes loader-rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.loader {
		border-right-color: transparent;
		animation: loader-rotate 1s linear infinite;
	}
</style>
