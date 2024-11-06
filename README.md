# Infinity

Family is everything! So why don't we have a platform to share our vacations, life and more within the family?

This is what I want to start creating and I believe it'll transform the stigma behind social media.

## Tech Stack

React Native| Expo | Supabase

## Debugging Topics

### Native Wind Error

- global.css outside of app directory
- init metro.config.js
- babel.config.js : Lots of online info:
  use below in babel.config.js
  ````presets: [
    ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    "nativewind/babel",
  ],```
  ````
