module.exports = {
  IDMClientTokenKey: 'SUPPRESSED',
  IDMClientTokenSecret: 'SUPPRESSED',
  IDMClientOptions: {
    externalAuth: false,
    externalAuthDomain: 'auth-dev.bccsa-services.ca',
    externalAuthPath: '/login',
    externalValidatePath: '/validate',
    externalRegistrationPath: '/register',
    externalProfilePath: '/profile',
    apiEndpoint: 'https://SUPPRESSED.execute-api.ca-central-1.amazonaws.com/dev',
    roles: {
      USER: 'SUPPRESSED-c7f_CCPO',
      ADMIN: 'SUPPRESSED-99f_CCPO',
      ADVISOR: 'SUPPRESSED-09c_CCPO',
    },
    partitions: {
      PERSONAL: 'ca.bccsa.personal',
      PROFESSIONAL: 'ca.bccsa.professional',
    },
  },
  ApplicationName: 'MyApp-Dev',
  ApplicationRoutes: {
    login: '/',
    homepage: '/'
  },
};
