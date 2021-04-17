import { COUNTER_UP, DECREASE } from './types';

export const countUp = counter => ({
    type: COUNTER_UP,
    counter,
});

export const countDown = counter => ({
    type: DECREASE,
    counter,
});

export default {
    countUp, countDown,
};
