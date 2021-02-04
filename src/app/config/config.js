module.exports = {
  IDMClientTokenKey: 'SUPPRESSED',
  IDMClientTokenSecret: 'SUPPRESSED',
  IDMClientOptions: {
    //when this is enabled module will redirect to externalAuthDomain for authentication
    //and registration. The module will accept a callback URL for registration and login
    //call, if specified, IDM UI will redirect back to the specified URL when the operation
    //is completed.
    //If not enabled, redirect API calls will be done instead.
    externalAuth: true,
    //Used when externalAuth is enabled,
    externalAuthDomain: 'auth-dev.XXXX-services.ca',
    //Fixed pages path on IDM UI, probably this should remain the same if you
    //don't know what they are for.
    externalAuthPath: '/login',
    externalValidatePath: '/validate',
    externalRegistrationPath: '/register',
    externalProfilePath: '/profile',
    //IDM API endpoint, this changes from env to env
    apiEndpoint: 'https://SUPPRESSED.execute-api.ca-central-1.amazonaws.com/dev',
    //What roles I'm using on this app?
    roles: {
      USER: 'SUPPRESSED-c7f_CCPO',
      ADMIN: 'SUPPRESSED-99f_CCPO',
      ADVISOR: 'SUPPRESSED-09c_CCPO',
    },
    //What partitions I'm using on this app?
    partitions: {
      PERSONAL: 'ca.SUPPRESSED.personal',
      PROFESSIONAL: 'ca.SUPPRESSED.professional',
    },
    autoEnrollRole: ['SUPPRESSED-c7f_CCPO', 'SUPPRESSED-1ef_Shared_Modules'],
  },
  ApplicationName: 'MyApp-Dev',
  ApplicationRoutes: {
    login: '/',
    homepage: '/'
  },
};
