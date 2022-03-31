<style lang="less">
	.main-position-h {
		max-height: 300px;
		background-color: #1c1d21;
		color: #ffffff;

		.title_span {
			display: flex;
			justify-content: space-between;

			.title {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				background-color: #323337;
				border-bottom: 1px solid #797979;
				font-size: 11px;

				span {
					padding: 4px 10px;
					color: #ffffff;
					background-color: #525b68;
				}
			}

			.span {}
		}

		.el-table td,
		.el-table th {
			padding: 5px 0;
		}

		.el-scrollbar__bar {
			opacity: 1;
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

		.history_col {
			overflow-x: scroll;
			overflow-y: hidden;
			white-space: nowrap;

			.el-form--inline .el-form-item {
				margin: 0 15px 20px 15px;
			}

			.el-button {
				padding: 6px 20px;
			}

			.el-form-item__label {
				color: #fff !important;
			}

			.el-input--suffix .el-input__inner {
				padding-right: 0px;
				background-color: #1c1d21;
				color: #fff !important;
				height: 30px;
				border: 1px solid #797979 !important;
			}
		}

	}
</style>

<template>
	<div class="main-position-h">
		<div class="title_span">
			<div class="title">
				<span>成交记录</span>
			</div>
			<span @click="check_more" style="cursor: pointer;">查看更多</span>
		</div>

		<el-table height="250" row-key="id" :data="tableData"
			style="width:100%; background-color: #1c1d21; color: #fff;" :header-cell-style="cellStyle"
			:cell-style="rowStyle">

			<el-table-column label="合约" prop="swap" width="150">
			</el-table-column>
			<el-table-column label="方向" prop="side" width="150">
			</el-table-column>
			<el-table-column label="开平标志" prop="openFlag" width="150">
			</el-table-column>
			<el-table-column label="成交手数" prop="head" width="150">
			</el-table-column>
			<el-table-column label="成交价格" prop="price" width="150">
			</el-table-column>
			<el-table-column label="投保标志" prop="hedgeFlag" width="150">
			</el-table-column>
			<el-table-column label="报单编号" prop="id" width="150">
			</el-table-column>
			<el-table-column label="交易员" prop="member" width="150">
			</el-table-column>
			<el-table-column label="成交时间(本地时间)" prop="timestamp" width="200">
			</el-table-column>
		</el-table>

		<!-- 查看更多 -->
		<el-dialog title="查看更多" :visible.sync="history_v" width="1200px" v-dialogDrag>
			<template>
				<div class="history_main">
					<div class="history_col">
						<el-form :inline="true" :model="form" :rules="rules" ref="form">
							<el-form-item label="账户" prop="user">
								<el-select v-model="form.user" placeholder="选择账户" style="width: 115px;">
									<el-option v-for="item in users" :key="item" :label="item" :value="item">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="查询类型" prop="type">
								<el-select v-model="form.type" placeholder="选择类型" style="width: 115px;">
									<el-option v-for="item in types" :key="item" :label="item" :value="item">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="开始时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="form.startTime"
									style="width: 120px;"></el-date-picker>
								<span v-if="form.type == '交易时间'">
									<span style="color: #fff"> - </span>
									<el-time-picker placeholder="选择时间" v-model="startStamp" style="width: 120px;">
									</el-time-picker>
								</span>
							</el-form-item>
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="form.endTime"
									style="width: 120px;"></el-date-picker>
								<span v-if="form.type == '交易时间'">
									<span style="color: #fff"> - </span>
									<el-time-picker placeholder="选择时间" v-model="endStamp" style="width: 120px;">
									</el-time-picker>
								</span>
							</el-form-item>
							<el-form-item>
								<el-button @click="onYesterday">昨天</el-button>
								<el-button @click="onThree">近三天</el-button>
								<el-button @click="onWeek">近一周</el-button>
								<el-button type="primary" @click="onSubmit">查询</el-button>
							</el-form-item>
						</el-form>
					</div>

					<el-table height="250" row-key="id" :data="searchData"
						style="width:100%; background-color: #1c1d21; color: #fff;" :header-cell-style="cellStyle"
						:cell-style="rowStyle">

						<el-table-column label="编号" prop="id" width="150">
						</el-table-column>
						<el-table-column label="合约" prop="swap" width="150">
						</el-table-column>
						<el-table-column label="方向" prop="side" width="150">
						</el-table-column>
						<el-table-column label="开平标志" prop="openFlag" width="150">
						</el-table-column>
						<el-table-column label="成交手数" prop="head" width="150">
						</el-table-column>
						<el-table-column label="成交价格" prop="price" width="150">
						</el-table-column>
						<el-table-column label="投保标志" prop="hedgeFlag" width="150">
						</el-table-column>
						<el-table-column label="报单编号" prop="id" width="150">
						</el-table-column>
						<el-table-column label="交易员" prop="member" width="150">
						</el-table-column>
						<el-table-column label="交易日" prop="day" width="150">
						</el-table-column>
						<el-table-column label="成交时间(本地时间)" prop="timestamp" width="200">
						</el-table-column>
					</el-table>
				</div>
			</template>
		</el-dialog>

	</div>
</template>

<script>
	import {
		ShowToast
	} from "@/utils/utils.js";
	import {
		getSomeTimeArrTimeStamp
	} from "@/utils/time_helper.js";
	import moment from 'moment'

	export default {
		data() {
			let self = this;
			return {
				history_v: false,
				users: ['123', '456'],
				types: ['交易日', '交易时间'],
				form: {
					user: '',
					type: '',
					startTime: '',
					endTime: '',
				},
				startStamp: '',
				endStamp: '',
				tableData: [{
					swap: '1',
					side: '一',
					openFlag: 'one',
					head: '壹',
					price: 'yi',
					hedgeFlag: 'first',
					member: 'x',
					id: 1,
					timestamp: 1648605035
				}],
				searchData: [{
					swap: '1',
					side: '一',
					openFlag: 'one',
					head: '壹',
					price: 'yi',
					hedgeFlag: 'first',
					member: 'x',
					id: 1,
					timestamp: 1648605035
				}],
				rules: {
					user: [{
						required: true,
						message: '请选择查询账户',
						trigger: 'blur'
					}, ],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
				}
			};
		},
		created() {
			this.form.user = this.users[0];
			this.form.type = this.types[0];
		},
		methods: {
			//查看更多
			check_more() {
				this.history_v = true;
			},
			
			//数组返回 0--开始时间 1--结束时间
			onYesterday() {
				var yes = getSomeTimeArrTimeStamp(1);
				console.log(yes);
			},

			onThree() {
				var thr = getSomeTimeArrTimeStamp(3);
				console.log(thr);
			},

			onWeek() {
				var week = getSomeTimeArrTimeStamp(7);
				console.log(week);
			},

			onSubmit() {
				// 表单验证
				this.$refs['form'].validate((valid) => {
					if (valid) {
						var day_time_stamp_s = 0;
						var day_time_stamp_e = 86399; //表示23:59:59

						//取小时时间戳
						if (this.form.type == '交易时间') {
							var start_moment = moment(this.startStamp);
							day_time_stamp_s = (start_moment.hours() * 60 * 60) + (start_moment.minutes() *
								60) + (start_moment.seconds());

							var end_moment = moment(this.endStamp);
							day_time_stamp_e = (end_moment.hours() * 60 * 60) + (end_moment.minutes() *
								60) + (end_moment.seconds());
						}

						var start_time_stamp = (moment(this.form.startTime).valueOf() / 1000) + day_time_stamp_s;
						var end_time_stamp = (moment(this.form.endTime).valueOf() / 1000) + day_time_stamp_e;

						console.log(start_time_stamp);
						console.log(end_time_stamp);
					} else {
						return false;
					}
				});
			},

			cellStyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
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
