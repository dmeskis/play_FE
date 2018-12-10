// This file is in the entry point in your webpack config.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}  //Loads the env file in the root unless in production
