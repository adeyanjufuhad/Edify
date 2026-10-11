// The switches that keep the classmate features off until the owner has reviewed them (docs/challenges.md).
// All default to off. Read at request time, on the server only.

export const challengesEnabled = () => process.env.CHALLENGES_ENABLED === "true";
// Each later phase also needs its SQL file applied (011, 012, 013) before its switch is turned on.
export const presenceEnabled = () => challengesEnabled() && process.env.CHALLENGES_PRESENCE === "true";
export const chatEnabled = () => challengesEnabled() && process.env.CHALLENGES_CHAT === "true";
export const voiceEnabled = () => chatEnabled() && process.env.CHALLENGES_VOICE === "true";
