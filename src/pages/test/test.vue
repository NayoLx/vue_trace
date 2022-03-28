<!-- <template>
	<div class="main-center">
		<p>111</p>
		<p>{{result}}</p>
		<p>{{add}}</p>
		<p>{{strL}}</p>
	</div>
</template>

<script>
	// import { ipcRenderer } from 'electron';
	const ffi = require('ffi-napi');
	// const path = require('path');

	export default {
		data() {
			return {
				result: 0,
				add: 0,
				strL: 0
			};
		},
		mounted() {
			// ipcRenderer.send("resize-window", 1280, 900);
			this.getVersion();
		},
		computed: {},
		methods: {
			getVersion() {
				const version = ffi.Library('../../public/dll/MyDLL.dll', {
					  Add: ['float', ['float', 'float']],
					  Hello: ['string', []],
					  StrLength: ['int', ['string']]
				});
				this.result = version.Hello();
				this.add = version.Add(2,8);
				this.strL = version.StrLength('Hello World');
			}
		},
	};
</script>

<style>
	.main-center {
		width: 100%;
		height: auto;
	}
</style>
 -->