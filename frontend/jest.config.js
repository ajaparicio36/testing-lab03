module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	// roots: ['<rootDir>/src'],
	testRegex: "/__tests__/.*\\.test\\.tsx$",
	verbose: true,
	forceExit: true,
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
