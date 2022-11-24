type FirestoreFunctionNames = 'getuserevents' | 'geteventinfo' | 'getuser' | 'createevent'

export const formatApiUrl = (functionName: FirestoreFunctionNames) => {
  let env: 'dev' | 'prod' = 'prod';
  if (window.location.href.includes('localhost')) {
    env = 'dev';
  }
  switch (env) {
    case 'dev':
    default:
      return `http://127.0.0.1:5005/friendly-356420/us-central1/${functionName}`;
    case 'prod':
      return `https://${functionName}-kftq5bxsta-uc.a.run.app`;
  }
};