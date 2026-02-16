import path from 'path';
import { config } from 'process';

let configFileName: string;

// If there is more appsettings set condition to choose a proper one read variable from environment variable
if (process.env.NODE_ENV === 'local') {
  configFileName = 'appsettings.local.json';
} else {
  configFileName = 'appsettings.json';
}
const appSettingsPathResolved = path.resolve(__dirname, '..', configFileName);

// Separate string, number, and boolean values into different objects
//// In case when only strings are expected, you can directly use the configString object
//// const appSettings: Record<string, string> = require(appSettingsPathResolved);
const appSettings = require(appSettingsPathResolved) as Record<string, unknown> & {
  numberValues?: Record<string, number>;
  booleanValues?: Record<string, boolean>;
};
const { numberValues, booleanValues, ...rest } = appSettings;
const configString = Object.fromEntries(
  Object.entries(rest).filter(([, value]) => typeof value === 'string'),
) as Record<string, string>;
const configNumber: Record<string, number> = numberValues ?? {};
const configBoolean: Record<string, boolean> = booleanValues ?? {};

// Set secrets from environment variables if they are not defined in the config file
if (!configString.Username) {
  configString.Username = process.env.TEST_USERNAME || '';
}
if (!configString.Password) {
  configString.Password = process.env.TEST_PASSWORD || '';
}

// Export the configuration for use in tests
export const testParams = configString;
export const testParamsNumber = configNumber;
export const testParamsBoolean = configBoolean;
