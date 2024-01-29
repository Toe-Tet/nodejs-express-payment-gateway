const database = require("../../database.json");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	app: {
		env: process.env.APP_ENV || "development",
		port: process.env.APP_PORT || 3000,
	},
	database,
	braintree: {
		merchantId: process.env.BRAINTREE_MERCHANT_ID,
		publicKey: process.env.BRAINTREE_PUBLIC_KEY,
		privateKey: process.env.BRAINTREE_PRIVATE_KEY,
		usdMerchantAccountId: process.env.BRAINTREE_USD_MERCHANT_ACCOUNT_ID,
		eurMerchantAccountId: process.env.BRAINTREE_EUR_MERCHANT_ACCOUNT_ID,
		thbMerchantAccountId: process.env.BRAINTREE_THB_MERCHANT_ACCOUNT_ID,
		hkdMerchantAccountId: process.env.BRAINTREE_HKD_MERCHANT_ACCOUNT_ID,
		sgdMerchantAccountId: process.env.BRAINTREE_SGD_MERCHANT_ACCOUNT_ID,
		audMerchantAccountId: process.env.BRAINTREE_AUD_MERCHANT_ACCOUNT_ID,
	},
};
