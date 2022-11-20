let env: 'dev' | 'prod';
// eslint-disable-next-line prefer-const
env = 'dev';

type FirestoreFunctionNames = 'getuserevents' | 'geteventinfo' | 'getuser' | 'createevent'

export const formatApiUrl = (functionName: FirestoreFunctionNames) => {
  switch (env) {
    case 'dev':
      return `http://127.0.0.1:5005/friendly-356420/us-central1/${functionName}`;
    case 'prod':
      return `https://${functionName}-kftq5bxsta-uc.a.run.app`;
    default:
      return '';
  }
};