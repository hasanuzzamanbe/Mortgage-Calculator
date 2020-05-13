var vm = new Vue({
    el: '#app',
    data: {
        propertyCostVal: '',
        depositBalanceVal: '',
        repayYearsVal: '',
        interestRateVal: '',
        loanAmountVal: '',
        nhtLoanVal: 0,
        nhtLoanIrVal: '',
        closing_cost: '',
        showSummary: false,
        is_nht_applicable: false
    },
    methods: {
        calculateMonthlyPayments: function (e, t, n) {
            var r = e / 12
                , i = t * 12
                , s = 1 / (1 + r)
                , o = (1 - s) * n / (s * (1 - Math.pow(s, i)));
            return Number(o.toFixed(2))
        },
        formatNumber: function (val) {
            return parseFloat(Math.round((val) * 100) / 100).toFixed(2);
        }
    },
    computed: {
        calculate_mortgage: function () {
            var prop_cost = this.propertyCostVal,
                req_depo = 0,
                add_depo = this.depositBalanceVal,
                loan_term = this.repayYearsVal,
                interest = this.interestRateVal,
                nht_loan = this.nhtLoanVal,
                nht_interest = this.nhtLoanIrVal

            if (!this.is_nht_applicable) {
                nht_loan = 0;
                nht_interest = 0;
            }
            var closing_rate = 0.09;
            interest = interest / 100;
            nht_interest = nht_interest / 100;
            this.closing_cost = prop_cost * closing_rate;
            var loan_amount = prop_cost - (req_depo + add_depo) - nht_loan;
            this.loanAmountVal = loan_amount;
            var monthly_payment = this.calculateMonthlyPayments(interest, loan_term, loan_amount);
            if (this.is_nht_applicable) {
                return monthly_payment += this.calculateMonthlyPayments(nht_interest, loan_term, nht_loan);
            }
            return monthly_payment = Math.round(monthly_payment / 10) * 10;

        }
    }
})
