<template>
	<div class="swap_o">
		<div class="swap_o_tabs">
			<el-tabs v-model="selectedOrder" @tab-click="changeOrder">
				<el-tab-pane label="报价表" name="self">
					<SelfSwap :user="account"></SelfSwap>
				</el-tab-pane>
				<!-- <el-tab-pane label="期权报价表" name="s_self">
					<SelfSwapM :user="account"></SelfSwapM>
				</el-tab-pane> -->
			</el-tabs>
		</div>
		<div class="row">
			<div class="row-left">
				<Dropdown trigger="click" style="margin: 0 20px">
					{{ account.account }}
					<Icon type="ios-arrow-down"></Icon>
					<DropdownMenu slot="list">
						<DropdownItem v-for="item in myAccount" v-bind:key="item.id"
							@click.native="changeAccount(item)">{{ item.account }}</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<div class="row-item">
					{{ $t("common.staticEquity") }}:
					<span v-if="showDetail == true">100000</span><span v-else>******</span>
				</div>
				<div class="row-line"></div>
				<div class="row-item">
					{{ $t("common.occupationDeposit") }}:
					<span v-if="showDetail == true">100000</span><span v-else>******</span>
				</div>
				<div class="row-line"></div>
				<div class="row-item">
					{{ $t("common.availableFunds") }}:
					<span v-if="showDetail == true">100000</span><span v-else>******</span>
				</div>
				<div>
					<Icon v-if="showDetail == true" type="ios-eye" @click="hideAccount()" />
					<Icon v-else type="ios-eye-outline" @click="hideAccount()" />
				</div>
			</div>
			<div class="row-right">
				<i class="el-icon-wallet" @click="onShowUser()"></i>
				<i class="el-icon-s-tools" @click="setVisible = true"></i>
			</div>
		</div>
		<el-row :gutter="5">
			<el-col :xs="4" :sm="4" :md="3" :lg="3" :xl="3">
				<DiskPort :user="account"></DiskPort>
			</el-col>
			<el-col :xs="9" :sm="9" :md="7" :lg="6" :xl="5">
				<Order :user="account"></Order>
			</el-col>
			<el-col :xs="11" :sm="11" :md="14" :lg="15" :xl="16">
				<Entrust :user="account"></Entrust>
			</el-col>
		</el-row>
		<el-row :gutter="5" style="border-top: 1px solid #797979">
			<el-col :span="12">
				<Position></Position>
			</el-col>
			<el-col :span="12">
				<PositionH></PositionH>
			</el-col>
		</el-row>

		<!-- 交易设置 -->
		<el-dialog title="交易设置" :visible.sync="setVisible" width="60%" v-dialogDrag>
			<template>
				<div class="template_main">
					<el-tabs tab-position="left" style="height: 200px">
						<el-tab-pane label="基本">
							<div class="setting-main">
								<div class="setting-main-title">
									<p>下单板</p>
									<div class="line"></div>
								</div>
								<el-row style="margin-bottom: 20px">
									<el-col :span="12">
										<div class="setting-panel">
											<p>默认下单价格</p>
											<div>
												<el-select v-model="defaultList.price" placeholder=" ">
													<el-option v-for="item in price" :key="item" :label="item"
														:value="item">
													</el-option>
												</el-select>
											</div>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="setting-panel">
											<p>默认有效时间（TIF）</p>
											<el-select v-model="defaultList.tif" placeholder=" ">
												<el-option v-for="item in price" :key="item" :label="item"
													:value="item">
												</el-option>
											</el-select>
										</div>
									</el-col>
								</el-row>
								<el-row style="margin-bottom: 20px">
									<el-col :span="12">
										<div class="setting-panel">
											<p>默认下单类型</p>
											<el-select v-model="defaultList.type" placeholder=" ">
												<el-option v-for="item in price" :key="item" :label="item"
													:value="item">
												</el-option>
											</el-select>
										</div>
									</el-col>
								</el-row>
								<div class="setting-main-title">
									<p>持仓</p>
									<div class="line"></div>
								</div>
								<el-row style="margin-bottom: 20px">
									<el-col :span="12">
										<div class="setting-panel">
											<p>比例平仓下单方式</p>
											<div>
												<el-select v-model="defaultList.orderType" placeholder=" ">
													<el-option v-for="item in price" :key="item" :label="item"
														:value="item">
													</el-option>
												</el-select>
											</div>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="setting-panel">
											<p>反手平仓下单方式</p>
											<el-select v-model="defaultList.reOrderType" placeholder=" ">
												<el-option v-for="item in price" :key="item" :label="item"
													:value="item">
												</el-option>
											</el-select>
										</div>
									</el-col>
								</el-row>
							</div>
						</el-tab-pane>
						<el-tab-pane label="默认手数">默认手数</el-tab-pane>
						<el-tab-pane label="超价">超价</el-tab-pane>
					</el-tabs>
				</div>
			</template>
		</el-dialog>


		<!-- 资金明细 -->
		<el-dialog title="账户资金明细" :visible.sync="userVisible" width="75%" v-dialogDrag>
			<template>
				<div class="template_main" style="margin: 0 30px;">
					<div class="user_btns">
						<el-form :inline="true" :model="form">
							<el-form-item label="账户:">
								<el-select v-model="form.account" placeholder="选择账户" style="width: 115px;">
									<el-option v-for="item in myAccount" :key="item.id" :label="item.id"
										:value="item.account">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="账户名称:">
								<el-input v-model="form.name" style="width: 115px;" disabled />
							</el-form-item>
							<el-form-item label="代表币种:">
								<el-select v-model="form.type" placeholder="选择类型" style="width: 115px;">
									<el-option v-for="item in coinType" :key="item" :label="item" :value="item">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="币种组:">
								<el-select v-model="form.group" placeholder="选择类型" style="width: 115px;">
									<el-option v-for="item in coinGroup" :key="item" :label="item" :value="item">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary">查询</el-button>
								<el-button type="primary">导出</el-button>
							</el-form-item>
						</el-form>
					</div>
					<el-descriptions border>
						<el-descriptions-item label='可用资金'>10000000</el-descriptions-item>
						<el-descriptions-item label='风险度'>10000000</el-descriptions-item>
						<el-descriptions-item label='期初现金'>10000000</el-descriptions-item>
						<el-descriptions-item label='权益'>10000000</el-descriptions-item>
						<el-descriptions-item label='持仓盈亏'>10000000</el-descriptions-item>
						<el-descriptions-item label='额度'>10000000</el-descriptions-item>
						<el-descriptions-item label='账户市值'>10000000</el-descriptions-item>
						<el-descriptions-item label='平仓盈亏'>10000000</el-descriptions-item>
						<el-descriptions-item label='押金'>10000000</el-descriptions-item>
						<el-descriptions-item label='出入金'>10000000</el-descriptions-item>
						<el-descriptions-item label='平仓未到期盈亏'>10000000</el-descriptions-item>
						<el-descriptions-item label='特殊保证金'>10000000</el-descriptions-item>
						<el-descriptions-item label='权利金'>10000000</el-descriptions-item>
						<el-descriptions-item label='挂单权利金'>0</el-descriptions-item>
						<el-descriptions-item label='追加保证金'>0</el-descriptions-item>
						<el-descriptions-item label='初始保证金'>0</el-descriptions-item>
						<el-descriptions-item label='挂单保证金'>0</el-descriptions-item>
						<el-descriptions-item label='持仓保证金'>0</el-descriptions-item>
						<el-descriptions-item label='维持保证金'>0</el-descriptions-item>
						<el-descriptions-item label='挂单维持保证金'>0</el-descriptions-item>
						<el-descriptions-item label='持仓维持保证金'>0</el-descriptions-item>
						<el-descriptions-item label='期权持仓市值'>0</el-descriptions-item>
						<el-descriptions-item label='期权多头持仓市值'>0</el-descriptions-item>
						<el-descriptions-item label='期权空头持仓市值'>0</el-descriptions-item>
						<el-descriptions-item label='手续费'>0</el-descriptions-item>
						<el-descriptions-item label='挂单手续费'>0</el-descriptions-item>
						<el-descriptions-item label='兑基币汇率'>0</el-descriptions-item>
					</el-descriptions>
					<div class="user_m_tip">
						<div class="tip">
							<span>资金栏相关展示数据【代表币种：USD(Base)，币种组：All】</span>
							<el-button type="primary" @click='setUserDataVisible = true'>设置</el-button>
						</div>
						<div class="tip_list">
							<div class="tip_group_item" v-for="item in default_show" v-bind:key="item">
								{{ item }}
							</div>
						</div>
					</div>
				</div>
			</template>
		</el-dialog>

		<!-- 设置资金栏数据 -->
		<el-dialog title="设置资金栏数据" :visible.sync="setUserDataVisible" width="626px" v-dialogDrag>
			<template>
				<div class="template_main">
					<el-checkbox-group v-model="checkList" :max="5" :min="1">
						<el-row>
							<el-col :span="8"><el-checkbox label='期初现金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='持仓保证金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='手续费'></el-checkbox></el-col>
						</el-row>
						<el-row>
							<el-col :span="8"><el-checkbox label='额度'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='挂单维持保证金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='挂单手续费'></el-checkbox></el-col>
						</el-row>
						<el-row>
							<el-col :span="8"><el-checkbox label='权益'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='持仓维持保证金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='兑基币汇率'></el-checkbox></el-col>
						</el-row>
						<el-row>
							<el-col :span="8"><el-checkbox label='可用资金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='追加保证金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='初始保证金'></el-checkbox></el-col>
						</el-row>
						<el-row>
							<el-col :span="8"><el-checkbox label='出入金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='维持保证金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='风险度'></el-checkbox></el-col>
						</el-row>
						<el-row>
							<el-col :span="8"><el-checkbox label='挂单保证金'></el-checkbox></el-col>
							<el-col :span="8"><el-checkbox label='盈亏'></el-checkbox></el-col>
							<el-col :span="8"></el-col>
						</el-row>
					</el-checkbox-group>
					<div class="sud_tip">
						提示：最多只能选择五个数据
					</div>
					<div class="sud_btn">
						<el-button type="primary" @click="setUserDataSubmit()">确定</el-button>
						<el-button>取消</el-button>
					</div>
				</div>
			</template>
		</el-dialog>

	</div>
</template>

<script>
	import Sortable from "sortablejs";
	import SelfSwap from "@/components/swap/self_swap";
	import Order from "@/components/swap/order";
	import DiskPort from "@/components/swap/disk_port";
	import Position from "@/components/swap/position";
	import PositionH from "@/components/swap/position_history";
	import Entrust from "@/components/swap/entrust";
	import web from "@/config/web";
	import {
		getData
	} from "@/utils/utils";

	export default {
		components: {
			SelfSwap,
			Order,
			PositionH,
			Position,
			Entrust,
			DiskPort,
		},
		data() {
			return {
				defaultList: {
					price: "",
					tif: "",
					type: "",
					orderType: "",
					reOrderType: "",
				},
				form: {
					account: '',
					type: '',
					group: '',
					name: '',
				},
				default_show: ['权益', '保证金', '可用资金'],
				checkList: [], //最多五项
				price: [100, 200, 300],
				setVisible: false,
				userVisible: false,
				setUserDataVisible: false,
				split1: 0.5,
				selectedOrder: "self",
				showDetail: true,
				account: '',
				myAccount: [],
				coinType: ['1'],
				coinGroup: ['2'],
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			//拖拽方法
			updated() {
				setTimeout(function() {
					const tbody = document.querySelector(".tip_list");
					const that = this;
					Sortable.create(tbody, {
						onEnd({
							newIndex,
							oldIndex
						}) {
							if (newIndex != oldIndex) {
								const currRow = that.default_show.splice(oldIndex, 1)[0];
								that.default_show.splice(newIndex, 0, currRow);
							}
						},
					});
				}, 500);
			},

			onShowUser() {
				this.userVisible = true;
				this.updated();
			},
			
			//设置资金栏数据
			setUserDataSubmit() {
				console.log(this.checkList);
			},

			init() {
				this.account = this.$store.state.user.account;
				this.myAccount = this.$store.state.user.accounts;
				// var params = this.$route.params.pair;
				// console.log(params);
				// this.getAccount();
				// this.getTradTimeInfo();
				// this.getExchangeSettleParam();
				// this.getExchangeTradeParam();
			},
			handleDragDrop(name, newName, a, b, names) {
				this.tabList.splice(b, 1, ...this.tabList.splice(a, 1, this.tabList[b]));
			},
			//用户所有交易账户查询
			getAccount() {
				web.request({
						url: this.api.common.tradeAccount,
						method: "get",
					})
					.then((res) => {
						this.$session.set("account", res.data.data, 60);
						this.myAccount = res.data.data;
						this.account = this.myAccount[0];
					});
			},
			//所有交易时间
			getTradTimeInfo() {
				web
					.request({
						url: this.api.common.tradeTimeInfo,
						method: "get",
					})
					.then((res) => {
						console.log("getTradTimeInfo");
						console.log(res.data.data);
					});
			},
			//所有交易所结算参数
			getExchangeSettleParam() {
				web
					.request({
						url: this.api.common.exchangeSettleParam,
						method: "get",
					})
					.then((res) => {
						console.log("exchangeSettleParam");
						console.log(res.data.data);
					});
			},
			//所有交易所交易参数
			getExchangeTradeParam() {
				web
					.request({
						url: this.api.common.exchangeTradeParam,
						method: "get",
					})
					.then((res) => {
						console.log("getExchangeTradeParam");
						console.log(res.data.data);
					});
			},
			changeOrder(tab, event) {
				console.log(tab.$options.propsData.name);
				this.selectedOrder = tab.$options.propsData.name;
			},
			changeAccount(str) {
				console.log(str);
				this.account = str;
				this.$store.dispatch("changeAccount", this.account);
			},
			hideAccount() {
				this.showDetail = !this.showDetail;
			},
		},
	};
</script>

<style>
	@import url("//unpkg.com/view-design/dist/styles/iview.css");
</style>

<style lang="less">
	@import "../../style/col";

	html body .swap_o {
		height: 100%;
		background-color: #323337;
	}

	.swap_o {
		padding: 6px;

		.el-tabs__item.is-active {
			background-color: #7c7f80;
			color: #ffffff;
		}

		.el-tabs__content {
			position: unset;
		}

		.el-tabs__active-bar {
			width: 0 !important;
		}

		.el-tabs__header {
			margin: 0;
		}

		.el-tabs__item {
			color: #ffffff;
			height: 30px;
			line-height: 30px;
			padding: 0 20px !important;
		}

		.el-tabs__nav-scroll {
			background-color: rgba(50, 51, 55, 0.9);
		}

		.el-tabs__nav-wrap::after {
			height: 0px;
		}

		.el-col {
			border-radius: 4px;
		}

		.bg-purple-dark {
			background: #99a9bf;
		}

		.bg-purple {
			background: #d3dce6;
		}

		.bg-purple-light {
			background: #e5e9f2;
		}

		.grid-content {
			border-radius: 4px;
			min-height: 36px;
		}

		.row {
			display: flex;
			width: 100%;
			height: 20px;
			padding: 20px 0;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			background-color: #323337;
			color: #fff;
			border-top: 1px solid #797979;
			border-bottom: 1px solid #797979;

			.row-item {
				margin: 0 10px 0 10px;
				color: #ffffff;
				opacity: 75%;
			}

			.row-left {
				display: flex;
				align-items: center;
				flex-direction: row;
				justify-content: flex-start;
			}

			.row-right {
				margin-right: 10px;

				i {
					padding: 0 10px;
				}
			}

			.row-line {
				width: 2px;
				height: 10px;
				background-color: #525b68;
			}
		}


		.el-dialog {
			background-color: #2d2d31;
		}

		.el-dialog__title {
			color: #ffffff;
		}

		.el-dialog__headerbtn .el-dialog__close {
			color: #ffffff;
		}

		.el-dialog__header {
			padding: 10px 20px;
			border-bottom: 1px solid #797979;
		}

		.el-dialog__headerbtn {
			top: 15px;
		}

		.template_main {
			color: #fff;

			.setting-main {
				.setting-main-title {
					display: flex;
					align-items: center;
					margin-bottom: 10px;

					p {
						min-width: 55px;
					}

					.line {
						width: 100%;
						background-color: #fff;
						height: 1px;
					}
				}
			}

			.setting-panel {
				display: flex;
				align-items: center;
				margin: 0 10px;

				p {
					width: 100%;
				}
			}

			.el-tabs__item {
				color: #fff;
			}

			.el-tabs__item.is-active {
				color: #409eff;
			}

			.el-input__inner {
				background-color: #1c1d21 !important;
				color: #fff !important;
				height: 30px;
				border: 1px solid #797979 !important;
				line-height: 30px;
			}

			.el-input-number.is-controls-right .el-input__inner {
				background-color: #1c1d21;
				color: #fff !important;
				height: 30px;
				line-height: 30px;
				border: 1px solid #797979 !important;
			}

			.el-input-number__decrease,
			.el-input-number__increase {
				border: none;
			}

			.el-input-number.is-controls-right .el-input-number__decrease,
			.el-input-number.is-controls-right .el-input-number__increase {
				line-height: 15px;
			}

			.el-input-number {
				line-height: 30px;
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

			.el-input__icon {
				width: 25px;
				line-height: 30px;
			}

			.user_btns {
				overflow: hidden;
				white-space: nowrap;
				margin-bottom: 10px;
			}

			.el-form-item__label {
				color: #fff;
			}

			.el-button {
				padding: 6px 20px;
			}

			.el-descriptions__body {}

			.el-descriptions-item__content {
				background-color: #1C1D21;
				color: #fff;
				padding: 6px 20px;
				border: none;
				border-right: 1px solid #797979;
				border-bottom: 1px solid #797979;
			}

			.el-descriptions-item__content:nth-child(3n) {
				background-color: #1C1D21;
				color: #fff;
				padding: 6px 20px;
				border: none;
				border-bottom: 1px solid #797979;
			}

			.el-descriptions-item__label.is-bordered-label {
				background-color: #1C1D21;
				color: #fff;
				padding: 6px 20px;
				border: none;
				border-right: 1px solid #797979;
				border-bottom: 1px solid #797979;
			}
			
			.el-checkbox__label {
				color: #fff;
			}
			
			.el-row{
				display: flex;
				justify-content: space-around;
			}
			
			.sud_tip {
				margin: 20px 0;
			}
			
			.sud_btn {
				text-align: right;
			}
			
			
			.user_m_tip {
				margin-top: 25px;

				.tip {
					display: flex;
					justify-content: space-between;
					margin-bottom: 25px;
				}

				.tip_list {
					border: 1px solid #797979;
					height: 100px;
					display: flex;

					.tip_group_item {
						width: auto;
						height: 28px;
						padding: 2px 5px;
						margin: 10px 5px;
						font-size: 12px;
						border: 1px solid #797979;
					}

					.tip_group_item.active {
						color: #ffffff;
						background-color: #174b94c9;
						border: 1px solid #174b94;
					}

					.tip_group_item:hover {
						cursor: pointer;
						color: #ffffff;
						background-color: #174b94c9;
						border: 1px solid #174b94;
					}
				}
			}

		}
	}
</style>
