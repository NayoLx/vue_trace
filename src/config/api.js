export default {
    common: {
        login: '/fospot/counter/api/login',
        tradeAccount: '/fospot/counter/api/index/trade_account', //用户的所有交易帐户查询
        accountDailyFund: '/fospot/counter/api/index/account_daily_fund', //所有交易账户日资金状况
        accountLimit: '/fospot/counter/api/index/account_limit', //所有交易帐户额度
        tradeCalendar: '/fospot/counter/api/index/trade_calendar', //所有交易日历
        tradeTimeInfo: '/fospot/counter/api/index/trade_time_info', //所有交易时间
        exchangeSettleParam: '/fospot/counter/api/index/exchange_settle_param', //所有交易所结算参数
        exchangeTradeParam: '/fospot/counter/api/index/exchange_trade_param', //所有交易所交易参数
    },
    swap: {
        contract: '/fospot/counter/api/index/contract', //所有合约查询
        product: '/fospot/counter/api/index/product', //所有品种查询
        exchange: '/fospot/counter/api/index/exchange', //所有交易所查询
        initView: '/fospot/counter/api/quotation/init/view', //点击合约类型进行列表查询
        viewGroup: '/fospot/counter/api/quotation/view_group', //点击合约组进行列表查询
        addSwap: '/fospot/counter/api/quotation/subscribe', //点击添加按钮进行合约订阅
        deleteSwap: '/fospot/counter/api/quotation/unsubscribe', //点击取消按钮进行合约取消订阅
        contractInitView: '/fospot/counter/api/contract_group/init/view/', //报价合约组管理列表初始化查询
        contractViewGroup: '/fospot/counter/api/contract_group/view_group',  //点击合约组进行合约列表查询
        addGroup: '/fospot/counter/api/contract_group/add', //点击新建进行合约组新增
        updateGroup: '/fospot/counter/api/contract_group/update_name', // 点击编辑进行合约组名修改
        removeGroup: '/fospot/counter/api/contract_group/remove', //点击删除进行合约组删除
        sortGroup: '/fospot/counter/api/contract_group/change_order', //拖动合约进行排序
    }
}
