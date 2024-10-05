// global.d.ts
/// <reference types="jest" />
/// <reference types="jest-environment-puppeteer" />

// Declaring Puppeteer globals provided by jest-puppeteer
declare const page: import("puppeteer").Page;
declare const browser: import("puppeteer").Browser;
