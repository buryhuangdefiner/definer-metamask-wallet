import { REHYDRATE } from 'redux-persist';

const initialState = {
	event: undefined
};

/**
 * Reducer to keep track of user oboarding actions to send it to analytics if thw user
 * decides to optin after finishing onboarding flow
 */
const onboardingReducer = (state = initialState, action) => {
	switch (action.type) {
		case REHYDRATE:
			if (action.payload && action.payload.onboarding) {
				return { ...state, ...action.payload.onboarding };
			}
			return state;
		case 'SAVE_EVENT':
			return {
				...state,
				event: action.event
			};
		default:
			return state;
	}
};

export default onboardingReducer;
