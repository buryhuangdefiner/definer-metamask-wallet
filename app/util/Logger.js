'use strict';
import { Crashlytics } from 'react-native-fabric';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Wrapper class that allows us to override
 * console.log and console.error and in the future
 * we will have flags to do different actions based on
 * the environment, for ex. log to a remote server if prod
 */
export default class Logger {
	/**
	 * console.log wrapper
	 *
	 * @param {object} args - data to be logged
	 * @returns - void
	 */
	static async log(...args) {
		// TODO use crashlytics opt-in
		// Check if user passed accepted opt-in to metrics
		const metricsOptIn = await AsyncStorage.getItem('@MetaMask:metricsOptIn');
		if (__DEV__) {
			args.unshift('[MetaMask DEBUG]:');
			console.log.apply(null, args); // eslint-disable-line no-console
		} else if (metricsOptIn === 'agreed') {
			Crashlytics.log(JSON.stringify(args));
		}
	}

	/**
	 * console.error wrapper
	 *
	 * @param {object} args - data to be logged
	 * @returns - void
	 */
	static async error(...args) {
		// TODO use crashlytics opt-in
		// Check if user passed accepted opt-in to metrics
		const metricsOptIn = await AsyncStorage.getItem('@MetaMask:metricsOptIn');
		if (__DEV__) {
			args.unshift('[MetaMask DEBUG]:');
			console.warn(args); // eslint-disable-line no-console
		} else if (metricsOptIn === 'agreed') {
			if (Platform.OS === 'android') {
				Crashlytics.logException(JSON.stringify(args));
			} else {
				Crashlytics.recordError(JSON.stringify(args));
			}
		}
	}
}
