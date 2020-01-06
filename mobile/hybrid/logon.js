sap.hybrid.kapsel = {
	appContext: null,

	/********************************************************************
	 * Initialize the application
	 * In this case, it will check first of the application has already
	 * registered with the SCPms. If not, it will register the app
	 * then proceed to manage the logon process.
	 * @param{Object} context SCPms logon input context
	 * @param{String} appId SCPms application ID
	 ********************************************************************/
	doLogonInit: function (context, appId, successCallback) {
		//Init needs to happen before anything else.
		console.log("Entering doLogonInit");
		//Is there a host address populated?
		if (context.serverHost.length < 1) {
			//If not, nothing we can do now
			console.error("Invalid SCPms host");
			return;
		}

		//Make call to Logon's init method to get things registered and all setup
		sap.Logon.init(
			function (context) {
				console.log("doLogonInit() Success");
				//Make sure Logon returned a context for us to work with
				if (context) {
					sap.hybrid.kapsel.appContext = context;
					successCallback();

					//Build the results message which will be written to the log and
					//displayed to the user
					//var msg = "Server Returned: " + JSON.stringify(context);
					//console.log(msg);
				} else {
					//Something went seriously wrong here, context is not populated
					console.error("doLogonInit() returns null");
				}
			},
			function (errObj) {
				console.error("doLogonInit() Error");
				console.error(JSON.stringify(errObj));
			}, appId, context);
		console.log("Leaving doLogonInit");
	},

	/********************************************************************
	 * Delete the application's registration information
	 * Disconnects the app from the SCPms
	 ********************************************************************/
	doDeleteRegistration: function () {
		console.log("Entering doDeleteRegistration");
		if (sap.hybrid.kapsel.appContext) {
			//Call logon's deleteRegistration method
			sap.Logon.core.deleteRegistration(
				function (res) {
					console.log("doDeleteRegistration() Success");
					console.log("Unregister result: " + JSON.stringify(res));
					//Set appContext to null so the app will know it's not registered
					sap.hybrid.kapsel.appContext = null;
					//reset the app to its original packaged version
					//(remove all updates retrieved by the AppUpdate plugin)
					sap.AppUpdate.reset();
				},
				function (errObj) {
					console.error("doDeleteRegistration() Error");
					console.error(JSON.stringify(errObj));
				});
		} else {
			//nothing to do here, move along...
			console.log("The application is not initialized, cannot delete context");
		}
	},

	/********************************************************************
	 * Lock the DataVault
	 ********************************************************************/
	doLogonLock: function () {
		console.log("Entering doLogonLock");
		//Everything here is managed by the Logon plugin, there's nothing for
		//the developer to do except to make the call to lock to
		//Lock the DataVault
		sap.Logon.lock(
			function () {
				console.log("doLogonLock() Success");
			},
			function (errObj) {
				console.error("doLogonLock() Error");
				console.error(JSON.stringify(errObj));
			});
	},

	/********************************************************************
	 * Unlock the DataVault
	 ********************************************************************/
	doLogonUnlock: function () {
		console.log("Entering doLogonUnlock");
		//Everything here is managed by the Logon plugin, there's nothing for
		//the developer to do except to make the call to unlock.
		//we'll be using the same success callback as
		//with init as the signatures are the same and have the same functionality
		sap.Logon.unlock(
			function () {
				console.log("doLogonUnlock() Success");
			},
			function (errObj) {
				console.error("doLogonUnlock() Error");
				console.error(JSON.stringify(errObj));
			});
	},

	/********************************************************************
	 * Show the application's registration information
	 ********************************************************************/
	doLogonShowRegistrationData: function () {
		console.log("Entering doLogonShowRegistrationData");
		//Everything here is managed by the Logon plugin, there's nothing for
		//the developer to do except to make a call to showRegistratioData
		sap.Logon.showRegistrationData(
			function () {
				console.log("doLogonShowRegistrationData() Success");
			},
			function (errObj) {
				console.error("doLogonShowRegistrationData() Error");
				console.error(JSON.stringify(errObj));
			});
	},

	/********************************************************************
	 * Update the DataVault password for the user
	 ********************************************************************/
	doLogonChangePassword: function () {
		console.log("Entering doLogonChangePassword");
		//Everything here is managed by the Logon plugin, there's nothing for
		//the developer to do except to make the call to changePassword
		sap.Logon.changePassword(
			function () {
				console.log("doLogonChangePassword() Success");
			},
			function (errObj) {
				console.error("doLogonChangePassword() Error");
				console.error(JSON.stringify(errObj));
			});
	},

	/********************************************************************
	 * Change the DataVaule passcode
	 ********************************************************************/
	doLogonManagePasscode: function () {
		console.log("Entering doLogonManagePassword");
		//Everything here is managed by the Logon plugin, there's nothing for
		//the developer to do except to make the call to managePasscode
		sap.Logon.managePasscode(
			function () {
				console.log("doLogonManagePasscode() Success");
			},
			function (errObj) {
				console.error("doLogonManagePasscode() Error");
				console.error(JSON.stringify(errObj));
			});
	},

	/********************************************************************
	 * Write values from the DataVault
	 * @param{String} theKey the key to store the provided object on
	 * @param{Object} theValue the object to be set on the given key. 
	 * Must be JSON serializable (cannot contain circular references).
	 * ********************************************************************/
	doLogonSetDataVaultValue: function (theKey, theValue) {
		console.log("Entering doLogonSetDataVaultValue");

		//Make sure we have both a key and a value before continuing
		//No sense writing a blank value to the DataVault
		if (theKey !== "" && theValue !== "") {
			//Write the values to the DataVault
			sap.Logon.set(
				function () {
					console.log("doLogonSetDataVaultValue() Success");
				},
				function (errObj) {
					console.error("doLogonSetDataVaultValue() Error");
					console.error(JSON.stringify(errObj));
				}, theKey, theValue);
		} else {
			//One of the input values is blank, so we can't continue
			console.log("Key and/or value missing.");
		}
	},

	/********************************************************************
	 * Read values from the DataVault
	 * @param{String}} theKey the key with which to query the DataVault.
	 ********************************************************************/
	doLogonGetDataVaultValue: function (theKey) {
		console.log("Entering doLogonGetDataVaultValue");
		//Make sure we have a key before continuing
		if (theKey !== "") {
			//Read the value from the DataVault
			sap.Logon.get(
				function (value) {
					console.log("doLogonGetDataVaultValue() Success");
				},
				function (errObj) {
					console.error("doLogonGetDataVaultValue() Error");
					console.error(JSON.stringify(errObj));
				}, theKey);
		} else {
			//One of the input values is blank, so we can't continue
			console.error("Value for key missing.");
		}
	}
};