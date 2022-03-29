<style lang="less">
	// @import "../../style/col";
	
	.main-entrust {
		max-height: 300px;
		background-color: #1c1d21;
		color: #ffffff;

		.el-table td,
		.el-table th {
			padding: 5px 0;
		}

		.tlite_ckb {
			display: flex;
			justify-content: space-between;

			.title {
				display: flex;
				flex-side: row;
				justify-content: space-between;
				background-color: #323337;
				border-bottom: 1px solid #797979;
				font-size: 11px;
				position: sticky;
				z-index: 10;
				top: 0;

				span {
					padding: 4px 10px;
					color: #ffffff;
					background-color: #525b68;
				}
			}

			.title_ckb_list {

				.el-checkbox__label {
					color: #fff;
					padding-top: 3px;
				}
			}
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

		.main-entrust-btn {
			.main-entrust-btn-item {
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

		.menu {
			position: absolute;
			background-color: #fff;
			/*height: 106px;*/
			font-size: 12px;
			color: #444040;
			border-radius: 4px;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			border-radius: 3px;
			border: 1px solid rgba(0, 0, 0, 0.15);
			box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
			white-space: nowrap;
			z-index: 1000;
		}

		.el-cascader-menu__wrap {
			height: auto;
		}

		//改单
		.change-order {
			
			.change-order-footer {
				text-align: right;
			}

			.co-form {
				padding-bottom: 20px;

				.co-form-row {
					display: flex;
					justify-content: space-between;

					.co-form-row-span {
						width: 56px;
						color: #ffffff;
						line-height: 28px;
					}

					.co-form-row-item {
						display: flex;
						padding: 5px 0;
					}

					.el-input .el-input__inner {
						background-color: #1c1d21;
						color: #fff !important;
						border: 1px solid #797979 !important;
						text-align: left;
					}
					
					.el-input {
						width: auto;
					}

					.el-input__inner {
						height: 28px;
						line-height: 28px;
						width: 120px;
					}
					
					.el-input-number {
						height: 28px;
						line-height: 28px;
						width: 120px;
					}
					
					.el-input-number.is-controls-right .el-input-number__increase {
					    height: auto;
					    line-height: 14px;
					}
					
					.el-input-number.is-controls-right .el-input-number__decrease {
						background-color: #1c1d21;
						color: #fff !important;
						border: none;
					}
					
					.el-input-number.is-controls-right .el-input-number__increase {
						background-color: #1c1d21;
						color: #fff !important;
						border: none;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="main-entrust" @click="foo">
		<div class="tlite_ckb">
			<div class="title">
				<span>委托</span>
			</div>
			<div class="title_ckb_list">
				<el-checkbox-group v-model="checkList">
					<el-checkbox label='全部'></el-checkbox>
					<el-checkbox label='挂单'></el-checkbox>
					<el-checkbox label='成交'></el-checkbox>
					<el-checkbox label='已撤/废单'></el-checkbox>
				</el-checkbox-group>
			</div>
		</div>

		<el-table height="250" row-key="id" :data="tableData"
			style="width:100%; background-color: #1c1d21; color: #fff;" :header-cell-style="cellStyle"
			:cell-style="rowStyle" @row-contextmenu="rightClick">

			<el-table-column label="报单编号" prop="time" width="150">
			</el-table-column>
			<el-table-column label="合约" prop="swap" width="150">
			</el-table-column>
			<el-table-column label="买卖" prop="ordType" width="150">
			</el-table-column>
			<el-table-column label="开平" prop="side" width="150">
			</el-table-column>
			<el-table-column label="报单手数" prop="price" width="150">
			</el-table-column>
			<el-table-column label="报单价格" prop="head" width="150">
			</el-table-column>
			<el-table-column label="未成交手数" prop="openFlag" width="150">
			</el-table-column>
			<el-table-column label="卖量成交手数" prop="hedgeFlag" width="150">
			</el-table-column>
			<el-table-column label="卖量成交手数" prop="hedgeFlag" width="150">
			</el-table-column>
			<el-table-column label="卖量成交手数" prop="hedgeFlag" width="150">
			</el-table-column>
			<el-table-column label="卖量成交手数" prop="hedgeFlag" width="150">
			</el-table-column>
			<el-table-column label="卖量成交手数" prop="hedgeFlag" width="150">
			</el-table-column>
			<el-table-column label="详细状态" prop="operate" width="150"> </el-table-column>
		</el-table>

		<div id="entrust_menu" v-show="menuVisible" class="menu">
			<el-cascader-panel v-model="cascaderValue" :options="options" ref="cascaderRef" @change="onChange"
				:props="{ expandTrigger: 'hover' }" clearable></el-cascader-panel>
		</div>

		<!-- 改单 -->
		<el-dialog title="编辑改单" :visible.sync="change_o_v" width="445px" v-dialogDrag>
			<template>
				<div class="change-order">
					<div class="co-form">
						<div class="co-form-row">
							<div class="co-form-row-item">
								<div class="co-form-row-span">合约：</div>
								<el-input :disabled='true' v-model="order.swap"></el-input>
							</div>
							<div class="co-form-row-item">
								<div class="co-form-row-span">方向：</div>
								<el-input :disabled='true' v-model="order.side"></el-input>
							</div>
						</div>
						<div class="co-form-row">
							<div class="co-form-row-item">
								<div class="co-form-row-span">投保：</div>
								<el-input :disabled='true' v-model="order.operate"></el-input>
							</div>
							<div class="co-form-row-item">
								<div class="co-form-row-span">开平：</div>
								<el-input :disabled='true' v-model="order.hedgeFlag"></el-input>
							</div>
						</div>
						<div class="co-form-row">
							<div class="co-form-row-item">
								<div class="co-form-row-span">类型：</div>
								<el-input :disabled='true' v-model="order.ordType"></el-input>
							</div>
							<div class="co-form-row-item">
								<div class="co-form-row-span">价格：</div>
								<el-input-number controls-position="right" :step="1" :min="1"
									:max="1000000" v-model="order.price"></el-input-number>
							</div>
						</div>
						<div class="co-form-row">
							<div class="co-form-row-item">
								<div class="co-form-row-span">TIF：</div>
								<el-input :disabled='true' v-model="order.openFlag"></el-input>
							</div>
							<div class="co-form-row-item">
								<div class="co-form-row-span">手数：</div>
								<el-input-number controls-position="right" :step="1" :min="1"
									:max="1000000" v-model="order.head"></el-input-number>
							</div>
						</div>
					</div>
					<div class="change-order-footer">
						<el-button type="primary" size="mini" @click="onChangeSubmit()">确定</el-button>
						<el-button size="mini" @click="onClose()">取消</el-button>
					</div>
				</div>
			</template>
		</el-dialog>
		
		
		<!-- 改单确认 -->
		<el-dialog title="操作确认" :visible.sync="change_o_submit" width="350px" v-dialogDrag>
			<template>
				<div class="col_submit">
					<p class="col_title">确定改单 <span class="col_tip">{{order.swap}}</span> 吗？</p>
					<div class="col_list" style="padding-bottom: 10px;">
						<span>撤单</span>
						<span class="col_child">{{last_order.openFlag}}</span>
						<span class="col_child">{{last_order.price}}</span>
						<span class="col_child">{{last_order.side}}</span>
						<span class="col_child">{{last_order.head}}手</span>
						<span class="col_child">{{last_order.hedgeFlag}}</span>
						<span class="col_child">{{last_order.ordordType}}</span>
					</div>
					<div class="col_list" style="padding-top: 10px;">
						<span>下单</span>
						<span class="col_child">{{order.openFlag}}</span>
						<span class="col_child">{{order.price}}</span>
						<span class="col_child">{{order.side}}</span>
						<span class="col_child">{{order.head}}手</span>
						<span class="col_child">{{order.hedgeFlag}}</span>
						<span class="col_child">{{order.ordordType}}</span>
					</div>
					<div class="col_btn">
						<el-checkbox v-model="checked" class="col_btn_ckb">不再提醒</el-checkbox>
						<div class="col_btn_s">
							<el-button type="primary" size="mini" @click="onChooseSubmit()">确定</el-button>
							<el-button size="mini" @click="onSumbitClose()">取消</el-button>
						</div>
					</div>
				</div>
			</template>
		</el-dialog>
		
		
		<!-- 撤单确认 -->
		<el-dialog title="操作确认" :visible.sync="delete_order" width="350px" v-dialogDrag>
			<template>
				<div class="col_submit">
					<p class="col_title">确定撤单 <span class="col_tip">{{order.swap}}</span> 吗？</p>
					<div class="col_list">
						<span class="col_child">{{order.openFlag}}</span>
						<span class="col_child">{{order.price}}</span>
						<span class="col_child">{{order.side}}</span>
						<span class="col_child">{{order.head}}手</span>
						<span class="col_child">{{order.hedgeFlag}}</span>
						<span class="col_child">{{order.ordordType}}</span>
					</div>
					<div class="col_btn">
						<el-checkbox v-model="checked" class="col_btn_ckb">不再提醒</el-checkbox>
						<div class="col_btn_s">
							<el-button type="primary" size="mini" @click="onDeleteSubmit()">确定</el-button>
							<el-button size="mini" @click="onDeleteClose()">取消</el-button>
						</div>
					</div>
				</div>
			</template>
		</el-dialog>
		
		<!-- 全撤操作 -->
		<el-dialog title="操作确认" :visible.sync="all_delete_order" width="350px" v-dialogDrag>
			<template>
				<div class="col_submit">
					<p class="col_title">确定撤回以下挂单吗？</p>
					<div class="col_list">
						<span class="col_child">{{order.openFlag}}</span>
						<span class="col_child">{{order.price}}</span>
						<span class="col_child">{{order.side}}</span>
						<span class="col_child">{{order.head}}手</span>
						<span class="col_child">{{order.hedgeFlag}}</span>
						<span class="col_child">{{order.ordordType}}</span>
					</div>
					<div class="col_btn">
						<el-checkbox v-model="checked" class="col_btn_ckb">不再提醒</el-checkbox>
						<div class="col_btn_s">
							<el-button type="primary" size="mini" @click="onDeleteSubmit()">确定</el-button>
							<el-button size="mini" @click="onDeleteClose()">取消</el-button>
						</div>
					</div>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: ["user"],
		data() {
			return {
				subscription: {
					topic: "topic/test2",
					qos: 0,
				},
				receiveNews: "",
				menuVisible: false, //鼠标右键菜单栏
				change_o_v: false, //修改订单
				change_o_submit: false, //修改订单 -- 确认订单
				delete_order: false, //撤除订单
				all_delete_order: false, //全撤订单
				checked: false,
				cascaderValue: '',
				currentRowIndex: '',
				options: [],
				checkList: [],
				order: {
					id: "1",
					time: "1",
					swap: "1",
					ordType: "1",
					side: "1",
					price: "1",
					head: "1",
					openFlag: "1",
					hedgeFlag: "1",
					operate: "1",
				},
				last_order: {
					
				},
				tableData: [{
						id: "1",
						time: "1",
						swap: "1",
						ordType: "1",
						side: "1",
						price: "1",
						head: "1",
						openFlag: "1",
						hedgeFlag: "1",
						operate: "1",
					},
					{
						id: "2",
						time: "2",
						swap: "2",
						ordType: "s",
						side: "2",
						price: "2",
						head: "2",
						hedgeFlag: "2",
						openFlag: "2",
						operate: "2",
					},
					{
						id: "3",
						time: "3",
						swap: "3",
						ordType: "3",
						side: "3",
						price: "3",
						head: "3",
						hedgeFlag: "3",
						openFlag: "3",
						operate: "3",
					},
					{
						id: "4",
						time: "4",
						swap: "4",
						ordType: "4",
						side: "4",
						price: "4",
						head: "4",
						hedgeFlag: "4",
						openFlag: "4",
						operate: "4",
					},
					{
						id: "5",
						time: "5",
						swap: "5",
						ordType: "5",
						side: "5",
						price: "5",
						head: "5",
						hedgeFlag: "5",
						openFlag: "5",
						operate: "5",
					},
					{
						id: "6",
						time: "6",
						swap: "6",
						ordType: "6",
						side: "6",
						price: "6",
						head: "6",
						hedgeFlag: "6",
						openFlag: "6",
						operate: "6",
					},
					{
						id: "7",
						time: "6",
						swap: "6",
						ordType: "6",
						side: "6",
						price: "6",
						head: "6",
						hedgeFlag: "6",
						openFlag: "6",
						operate: "6",
					},
					{
						id: "8",
						time: "6",
						swap: "6",
						ordType: "6",
						side: "6",
						price: "6",
						head: "6",
						hedgeFlag: "6",
						openFlag: "6",
						operate: "6",
					},
				],
			};
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				console.log(this.user);
				this.doSubscribe();
				this.setOptions();
			},

			//设置右键菜单
			setOptions() {
				this.options = [{
						value: "change",
						label: "改单",
					},
					{
						value: "delete",
						label: "撤单",
					},
					{
						value: "delete_all",
						label: "全撤",
					},
				];
			},

			//右键
			onChange(value) {
				this.cascaderValue = [];
				if (value == "change") {
					this.onChangeOrder();
				} else if (value == "delete") {
					this.onDelete();
				} else if (value == "delete_all") {
					console.log('delete_all');
				}
			},

			// table的右键点击当前行事件
			rightClick(row, column, event) {
				this.menuVisible = false;
				this.menuVisible = true;
				var menu = document.querySelector("#entrust_menu");
				event.preventDefault();
				//获取我们自定义的右键菜单

				// 根据事件对象中鼠标点击的位置，进行定位
				menu.style.left = event.clientX + "px";
				menu.style.top = (event.clientY - 460 + window.pageYOffset) + "px";
				// 改变自定义菜单的隐藏与显示
				menu.style.display = "block";
				// 获取当前右键点击table下标
				this.rightClickRow = row;
				this.tableData.forEach((item, index) => {
					if (item.id === row.id) {
						this.currentRowIndex = index;
						return false;
					}
				});
			},

			//改单
			onChangeOrder() {
				/// 使用深拷贝，不然会影响原数据
				this.order = JSON.parse(JSON.stringify(this.tableData[this.currentRowIndex]));
				this.last_order = this.tableData[this.currentRowIndex];
				this.change_o_v = true;
			},
			
			//撤单
			onDelete() {
				/// 使用深拷贝，不然会影响原数据
				this.order = JSON.parse(JSON.stringify(this.tableData[this.currentRowIndex]));
				this.delete_order = true;
			},
			
			//取消改单
			onClose() {
				this.change_o_v = false;
			},
			
			//取消改单
			onSumbitClose() {
				this.change_o_submit = false;
			},
			
			onChangeSubmit() {
				this.change_o_submit = true;
			},

			foo() {
				// 取消鼠标监听事件 菜单栏
				this.menuVisible = false;
				document.removeEventListener("click", this.foo); // 关掉监听，
			},

			doSubscribe() {
				const {
					topic,
					qos
				} = this.subscription;
				if (this.$client == null) {
					this.$router.push("/");
					return;
				}
				this.$client.subscribe(topic, qos, (error, res) => {
					if (error) {
						console.log("Subscribe to topics error", error);
						return;
					}
					this.subscribeSuccess = true;
					console.log("Subscribe to topics res", res);
				});
				this.$client.on("message", (messageTopic, message) => {
					if (messageTopic == topic) {
						const y = JSON.parse(message);
						this.tableData.unshift(y);
					}
					console.log(`Received message ${message} from topic ${messageTopic}`);
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
