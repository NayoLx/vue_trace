<style lang="less">
	.main-position {
		overflow-x: hidden;
		max-height: 300px;
		background-color: #1c1d21;
		color: #ffffff;

		.swap_o .el-tabs__nav-scroll {}

		.setting {
			position: absolute;
			top: 4px;
			z-index: 10;
			left: 47%;
		}

		.main-position-table {
			// height: 300px;
		}

		.el-table td,
		.el-table th {
			padding: 5px 0;
		}

		.el-table--border,
		.el-table--group {
			border: 0px;
		}

		.el-table--border th,
		.el-table__fixed-right-patch {
			border-bottom: 0px;
		}

		.el-table td,
		.el-table th.is-leaf {
			border: 1px solid #797979;
		}

		.el-table--enable-row-transition .el-table__body td {
			border: 1px solid #797979;
		}

		.el-table--border::after,
		.el-table--group::after,
		.el-table::before {
			background-color: #797979;
		}

		.main-position-button {
			text-align: right;

			.main-position-btn-item {
				width: 60px;
				height: 25px;
			}

			.el-button {
				background-color: #ffffff1a;
				color: #ffffff;
				border: 1px solid #797979;
			}

			.el-button--mini,
			.el-button--mini.is-round {
				padding: 4px 15px;
				margin: 10px 5px;
			}
		}
	}
</style>

<template>
	<div class="main-position">
		<el-tabs v-model="selectedPos" @tab-click="changePos">
			<span class="setting">合并</span>
			<el-tab-pane label="持仓" name="Pos">
				<div class="main-position-table">
					<el-table height="250" :data="tableData"
						style="border-top: 1px solid #797979; width: 100%; background-color: #1c1d21; color: #fff"
						:header-cell-style="cellStyle" :cell-style="rowStyle">
						<el-table-column label="品种" prop="time" width="150">
						</el-table-column>
						<el-table-column label="净持仓" width="150">
							<el-table-column prop="symbol"></el-table-column>
							<el-table-column prop="symbol"></el-table-column>
						</el-table-column>
						<el-table-column label="今买" width="150">
							<el-table-column prop="type"></el-table-column>
							<el-table-column prop="type"></el-table-column>
						</el-table-column>
						<el-table-column label="今卖" width="150">
							<el-table-column prop="type"></el-table-column>
							<el-table-column prop="type"></el-table-column>
						</el-table-column>
						<el-table-column label="最后成交价" prop="direction" width="150">
						</el-table-column>
						<el-table-column label="盈亏" prop="price" width="150">
						</el-table-column>
						<el-table-column label="持仓盈亏" prop="amount" width="150">
						</el-table-column>
						<el-table-column label="平仓盈亏" prop="turnover" width="150">
						</el-table-column>
					</el-table>
				</div>
			</el-tab-pane>
			<el-tab-pane label="详细持仓" name="Pos_d">
				<el-table height="250" :data="tableData"
					style="border-top: 1px solid #797979; width: 100%; background-color: #1c1d21; color: #fff"
					:header-cell-style="cellStyle" :cell-style="rowStyle">
					<el-table-column label="品种" prop="time" width="150">
					</el-table-column>
					<el-table-column label="净持仓" width="150">
						<el-table-column prop="symbol"></el-table-column>
						<el-table-column prop="symbol"></el-table-column>
					</el-table-column>
					<el-table-column label="今买" width="150">
						<el-table-column prop="type"></el-table-column>
						<el-table-column prop="type"></el-table-column>
					</el-table-column>
					<el-table-column label="今卖" width="150">
						<el-table-column prop="type"></el-table-column>
						<el-table-column prop="type"></el-table-column>
					</el-table-column>
					<el-table-column label="最后成交价" prop="direction" width="150">
					</el-table-column>
					<el-table-column label="盈亏" prop="price" width="150">
					</el-table-column>
					<el-table-column label="持仓盈亏" prop="amount" width="150">
					</el-table-column>
					<el-table-column label="平仓盈亏" prop="turnover" width="150">
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			let self = this;
			return {
				selectedPos: "Pos",
				tableData: [{
					name: "1",
					time: "2",
					symbol: "3",
					type: "4",
					direction: "5",
					price: "6",
					amount: "7",
					turnover: "8",
					operate: "9",
				}, ],
			};
		},
		created() {},
		methods: {
			changePos(tab, event) {
				this.selectedPos = tab.$options.propsData.name;
			},
			cellStyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (rowIndex === 1) {
					return {
						display: "none"
					};
				}
				return "background-color: #2d2d31; color: #fff; height: 20px";
			},

			rowStyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				return "background-color: #1c1d21";
			},
		},
	};
</script>
