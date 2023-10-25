const log = (level = 'log', message) => {
    const logLevels = ['debug', 'log', 'warn', 'error'];
    const currentLogLevel = process.env.LOG_LEVEL || 'log';
  
    if (logLevels.indexOf(level) >= logLevels.indexOf(currentLogLevel)) {
      console[level](message);
    }
  };
  
  export default log;
  