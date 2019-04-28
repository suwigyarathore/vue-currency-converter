new Vue({
  el: "#app",
  data: {
    currencies: {},
    amount: 0,
    from: "EUR",
    to: "USD",
    result: null,
    loading: false
  },
  mounted() {
    this.getCurrencies();
  },
  computed: {
    formattedCurrencies() {
      return Object.values(this.currencies);
    },

    calculateResult() {
      return (Number(this.amount) * this.result).toFixed(3);
    },

    disabled() {
      return this.amount === 0 || !this.amount || this.loading;
    }
  },
  methods: {
    getCurrencies() {
      const currencies = JSON.parse(localStorage.getItem("currencies"));
      if (currencies) {
        this.currencies = currencies;
        return;
      } else {
        axios
          .get(
            "https://free.currconv.com/api/v7/currencies?apiKey=sample-api-key"
          )
          .then(res => {
            this.currencies = res.data.results;
            localStorage.setItem(
              "currencies",
              JSON.stringify(res.data.results)
            );
          });
      }
    },

    convertCurrency() {
      this.loading = true;
      axios
        .get(
          `https://free.currconv.com/api/v7/convert?q=${this.from}_${
            this.to
          }&compact=ultra&apiKey=sample-api-key`
        )
        .then(response => {
          this.loading = false;
          this.result = response.data[`${this.from}_${this.to}`];
        });
    }
  },
  watch: {
    from() {
      this.result = 0;
    },
    to() {
      this.result = 0;
    }
  }
});
