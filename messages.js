// Copyright 2016 Google Inc. All Rights Reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE
'use strict';

const GREEN = '\x1B[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1B[31m';
const RESET = '\x1B[0m';
const BOLD = '\x1b[1m';

const greenify = str => `${GREEN}${str}${RESET}`;
const redify = str => `${RED}${str}${RESET}`;
const yellowify = str => `${YELLOW}${str}${RESET}`;
const boldify = str => `${BOLD}${str}${RESET}`;

const getMessage = function(messageType, ...args) {

  switch (messageType) {
  case 'NO_URL':
    return 'No url entered.';
  case 'LAUNCHING_CHROME':
    return 'Launching Chrome';
  case 'MEDIAN_RUN':
    return '                ☆  Median run  ☆';
  case 'NO_METRICS':
    return 'No expectation metrics were found';
  case 'NO_EXPECTATION_ERROR':
    return `Metric ${args[0]} has to have warn and error values`;
  case 'METRIC_IS_UNAVAILABLE':
    return `Sorry, ${args[0]} metric is unavailable`;
  case 'ttfcp':
    return 'First Contentful Paint';
  case 'ttfmp':
    return 'First Meaningful Paint';
  case 'psi':
    return 'Perceptual Speed Index';
  case 'fv':
    return 'First Visual Change';
  case 'vc':
    return 'Visually Complete 100%';
  case 'tti':
    return 'Time to Interactive';
  case 'vc85':
    return 'Visually Complete 85%';
  default:
    throw new Error('No matching message ID: ' + messageType);
  }
};

const getAssertionMessage = function(assertionLevel, messageType, expectedValue, actualValue) {
  const message = getMessage(messageType);
  const prefix = assertionLevel === 'ERROR' ? getErrorPrefix() : getWarningPrefix();
  const colorizer = assertionLevel === 'ERROR' ? redify : yellowify;

  const expectedStr = boldify(expectedValue + 'ms');
  const actualStr = boldify(colorizer(actualValue + 'ms'));
  return `${prefix}${message}.${RESET} Expected ${expectedStr}, but found ${actualStr}.`;
};


const GREEN_CHECK = greenify('✓');
const YELLOW_FLAG = yellowify('⚑');
const RED_X = redify('✘');
const getErrorPrefix = _ => `  ${RED_X} Error: ${RED}`;
const getWarningPrefix = _ => `  ${YELLOW_FLAG} Warning: ${YELLOW}`;


module.exports = {
  getMessage,
  getAssertionMessage,
  getErrorPrefix,
  getWarningPrefix
};