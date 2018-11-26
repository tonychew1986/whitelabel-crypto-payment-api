# aditus-private-api v0.3.0

apidoc example project.

- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Financial](#financial)
	- [Create financial](#create-financial)
	- [Delete financial](#delete-financial)
	- [Retrieve financial](#retrieve-financial)
	- [Retrieve financials](#retrieve-financials)
	- [Update financial](#update-financial)
	
- [Merchant](#merchant)
	- [Create merchant](#create-merchant)
	- [Delete merchant](#delete-merchant)
	- [Retrieve merchant](#retrieve-merchant)
	- [Retrieve merchants](#retrieve-merchants)
	- [Update merchant status](#update-merchant-status)
	- [Update merchant ADI address](#update-merchant-adi-address)
	- [Update merchant BTC address](#update-merchant-btc-address)
	- [Update merchant crypto address](#update-merchant-crypto-address)
	- [Update merchant ETH address](#update-merchant-eth-address)
	- [Update merchant LTC address](#update-merchant-ltc-address)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Statistic](#statistic)
	- [Create statistic](#create-statistic)
	- [Delete statistic](#delete-statistic)
	- [Retrieve statistic](#retrieve-statistic)
	- [Retrieve statistics](#retrieve-statistics)
	- [Update statistic](#update-statistic)
	
- [Transaction](#transaction)
	- [Create transaction](#create-transaction)
	- [Delete transaction](#delete-transaction)
	- [Retrieve transaction](#retrieve-transaction)
	- [Retrieve transactions](#retrieve-transactions)
	- [Send email when purchase confirms](#send-email-when-purchase-confirms)
	- [Update transaction](#update-transaction)
	- [Update transaction details](#update-transaction-details)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Retrieve users by role](#retrieve-users-by-role)
	- [Update OTP](#update-otp)
	- [Update password](#update-password)
	- [Update user](#update-user)
	
- [Wallet](#wallet)
	- [Create wallet](#create-wallet)
	- [Delete wallet](#delete-wallet)
	- [Retrieve wallet](#retrieve-wallet)
	- [Retrieve wallets](#retrieve-wallets)
	- [Update wallet](#update-wallet)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Financial

## Create financial



	POST /financials


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| accountType			| 			|  <p>Financial's accountType.</p>							|
| accountOwner			| 			|  <p>Financial's accountOwner.</p>							|
| balance			| 			|  <p>Financial's balance.</p>							|
| transactionHistory			| 			|  <p>Financial's transactionHistory.</p>							|

## Delete financial



	DELETE /financials/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve financial



	GET /financials/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve financials



	GET /financials


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update financial



	PUT /financials/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| accountType			| 			|  <p>Financial's accountType.</p>							|
| accountOwner			| 			|  <p>Financial's accountOwner.</p>							|
| balance			| 			|  <p>Financial's balance.</p>							|
| transactionHistory			| 			|  <p>Financial's transactionHistory.</p>							|

# Merchant

## Create merchant



	POST /merchants


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Merchant's name.</p>							|
| addressBTC			| 			|  <p>Merchant's BTC address.</p>							|
| addressETH			| 			|  <p>Merchant's ETH address.</p>							|
| addressLTC			| 			|  <p>Merchant's LTC address.</p>							|
| addressADI			| 			|  <p>Merchant's ADI address.</p>							|
| ownerId			| 			|  <p>Merchant's owner Id.</p>							|
| ownerName			| 			|  <p>Merchant's owner Name.</p>							|
| address			| 			|  <p>Merchant's address.</p>							|
| mobile			| 			|  <p>Merchant's mobile.</p>							|
| country			| 			|  <p>Merchant's country.</p>							|
| accountTier			| 			|  <p>Merchant's accountTier.</p>							|
| accountStatus			| 			|  <p>Merchant's accountStatus.</p>							|

## Delete merchant



	DELETE /merchants/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve merchant



	GET /merchants/:id


## Retrieve merchants



	GET /merchants


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update merchant status



	PUT /merchants/:id/status


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| accountTier			| 			|  <p>Merchant's accountTier.</p>							|
| accountStatus			| 			|  <p>Merchant's accountStatus.</p>							|

## Update merchant ADI address



	PUT /merchants/:id/adi


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| addressADI			| 			|  <p>Merchant's ADI address.</p>							|

## Update merchant BTC address



	PUT /merchants/:id/btc


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| addressBTC			| 			|  <p>Merchant's BTC address.</p>							|

## Update merchant crypto address



	PUT /merchants/:id/address


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| addressBTC			| 			|  <p>Merchant's BTC address.</p>							|
| addressLTC			| 			|  <p>Merchant's LTC address.</p>							|
| addressETH			| 			|  <p>Merchant's ETH address.</p>							|

## Update merchant ETH address



	PUT /merchants/:id/eth


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| addressETH			| 			|  <p>Merchant's ETH address.</p>							|

## Update merchant LTC address



	PUT /merchants/:id/ltc


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| addressLTC			| 			|  <p>Merchant's LTC address.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Statistic

## Create statistic



	POST /statistics


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| walletGenerationNumber			| 			|  <p>Statistic's walletGenerationNumber.</p>							|

## Delete statistic



	DELETE /statistics/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve statistic



	GET /statistics/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve statistics



	GET /statistics


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update statistic



	PUT /statistics/:id/masterpublickey/btc


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| masterPublicKeyBTC			| 			|  <p>Statistic's masterPublicKeyBTC.</p>							|

# Transaction

## Create transaction



	POST /transactions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| transactionStatus			| String			|  <p>Transaction's transactionStatus.</p>							|
| paymentDollarValue			| String			|  <p>Transaction's paymentDollarValue.</p>							|
| merchantId			| String			|  <p>Transaction's merchantId.</p>							|
| merchantName			| String			|  <p>Transaction's merchantName.</p>							|
| cryptocurrencyType			| String			|  <p>Transaction's cryptocurrencyType.</p>							|
| cryptocurrencyPaid			| String			|  <p>Transaction's cryptocurrencyPaid.</p>							|
| paymentCurrency			| String			|  <p>Transaction's paymentCurrency.</p>							|
| network			| String			|  <p>Transaction's network.</p>							|
| addressReceiver			| String			|  <p>Transaction's addressReceiver.</p>							|
| addressSender			| String			|  <p>Transaction's addressSender.</p>							|
| paymentType			| String			|  <p>Transaction's paymentType.</p>							|
| cryptocurrencyPrice			| String			|  <p>Transaction's cryptocurrencyPrice.</p>							|
| transactionId			| String			|  <p>Transaction's transactionId.</p>							|
| shippingName			| String			|  <p>Transaction's shippingName.</p>							|
| shippingEmail			| String			|  <p>Transaction's shippingEmail.</p>							|
| shippingMobile			| String			|  <p>Transaction's shippingMobile.</p>							|
| shippingCountry			| String			|  <p>Transaction's shippingCountry.</p>							|
| shippingAddress			| String			|  <p>Transaction's shippingAddress.</p>							|
| shippingPostal			| String			|  <p>Transaction's shippingPostal.</p>							|
| transactionHash			| String			|  <p>Transaction's transactionHash.</p>							|
| rewardAwarded			| String			|  <p>Transaction's rewardAwarded.</p>							|
| userId			| String			|  <p>Transaction's userId.</p>							|
| merchantType			| String			|  <p>Transaction's merchantType.</p>							|
| transactionMeta			| String			| **optional** <p>transactionMeta Transaction's meta data.</p>							|
| productReference			| String			|  <p>Transaction's product reference code.</p>							|

## Delete transaction



	DELETE /transactions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve transaction



	GET /transactions/:id


## Retrieve transactions



	GET /transactions


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Send email when purchase confirms



	POST /purchase-confirmation


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| transactionId			| String			|  <p>Transaction's transactionId.</p>							|

## Update transaction



	PUT /transactions/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| transactionStatus			| String			| **optional** <p>transactionStatus Transaction's transactionStatus.</p>							|
| paymentDollarValue			| String			| **optional** <p>paymentDollarValue Transaction's paymentDollarValue.</p>							|
| merchantId			| String			| **optional** <p>merchantId Transaction's merchantId.</p>							|
| cryptocurrencyType			| String			| **optional** <p>cryptocurrencyType Transaction's cryptocurrencyType.</p>							|
| cryptocurrencyPaid			| String			| **optional** <p>cryptocurrencyPaid Transaction's cryptocurrencyPaid.</p>							|
| paymentCurrency			| String			| **optional** <p>paymentCurrency Transaction's paymentCurrency.</p>							|
| network			| String			| **optional** <p>network Transaction's network.</p>							|
| addressReceiver			| String			| **optional** <p>addressReceiver Transaction's addressReceiver.</p>							|
| addressSender			| String			| **optional** <p>addressSender Transaction's addressSender.</p>							|
| paymentType			| String			| **optional** <p>paymentType Transaction's paymentType.</p>							|
| cryptocurrencyPrice			| String			| **optional** <p>cryptocurrencyPrice Transaction's cryptocurrencyPrice.</p>							|
| transactionId			| String			| **optional** <p>transactionId Transaction's transactionId.</p>							|
| shippingName			| String			| **optional** <p>shippingName Transaction's shippingName.</p>							|
| shippingEmail			| String			| **optional** <p>shippingEmail Transaction's shippingEmail.</p>							|
| shippingMobile			| String			| **optional** <p>shippingMobile Transaction's shippingMobile.</p>							|
| shippingCountry			| String			| **optional** <p>shippingCountry Transaction's shippingCountry.</p>							|
| shippingAddress			| String			| **optional** <p>shippingAddress Transaction's shippingAddress.</p>							|
| shippingPostal			| String			| **optional** <p>shippingPostal Transaction's shippingPostal.</p>							|
| transactionHash			| String			| **optional** <p>transactionHash Transaction's transactionHash.</p>							|
| rewardAwarded			| String			| **optional** <p>rewardAwarded Transaction's rewardAwarded.</p>							|
| userId			| String			| **optional** <p>userId Transaction's userId.</p>							|
| merchantType			| String			| **optional** <p>merchantType Transaction's merchantType.</p>							|
| transactionMeta			| String			| **optional** <p>transactionMeta Transaction's meta data.</p>							|
| productReference			| String			| **optional** <p>productReference Transaction's product reference code.</p>							|

## Update transaction details



	PUT /transactions/:id/details


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| transactionStatus			| String			| **optional** <p>transactionStatus Transaction's transactionStatus.</p>							|
| addressSender			| String			| **optional** <p>addressSender Transaction's addressSender.</p>							|
| transactionHash			| String			| **optional** <p>transactionHash Transaction's transactionHash.</p>							|
| rewardAwarded			| String			| **optional** <p>rewardAwarded Transaction's rewardAwarded.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve users by role



	GET /users/role


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update OTP



	PUT /users/:id/otp

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new otp.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

# Wallet

## Create wallet



	POST /wallets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| keySet			| 			|  <p>Wallet's keySet.</p>							|
| keyNumber			| 			|  <p>Wallet's keyNumber.</p>							|
| addressBTC			| 			|  <p>Wallet's addressBTC.</p>							|
| addressLTC			| 			|  <p>Wallet's addressLTC.</p>							|
| addressETH			| 			|  <p>Wallet's addressETH.</p>							|
| addressADI			| 			|  <p>Wallet's addressADI.</p>							|

## Delete wallet



	DELETE /wallets/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve wallet



	GET /wallets/:id


## Retrieve wallets



	GET /wallets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update wallet



	PUT /wallets/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| keySet			| 			|  <p>Wallet's keySet.</p>							|
| keyNumber			| 			|  <p>Wallet's keyNumber.</p>							|
| addressBTC			| 			|  <p>Wallet's addressBTC.</p>							|
| addressLTC			| 			|  <p>Wallet's addressLTC.</p>							|
| addressETH			| 			|  <p>Wallet's addressETH.</p>							|
| addressADI			| 			|  <p>Wallet's addressADI.</p>							|


