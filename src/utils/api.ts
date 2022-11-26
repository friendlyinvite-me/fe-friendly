type FirestoreFunctionNames = |
  'getuserevents' |
  'geteventinfo' |
  'getuser' |
  'createevent' |
  'newslettersignup' |
  'createuser' |
  'deleteevent';

export const formatApiUrl = (functionName: FirestoreFunctionNames) => {
  switch (process.env.NODE_ENV) {
    case 'development':
    default:
      return `http://127.0.0.1:5005/friendly-356420/us-central1/${functionName}`;
    case 'production':
      return `https://${functionName}-kftq5bxsta-uc.a.run.app`;
  }
};