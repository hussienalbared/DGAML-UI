// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ipAddress: 'http://192.168.1.95:8081',
  ipAddressWithoutHttp: '192.168.1.90:8081',
  dashBoardUrl: 'http://192.168.1.40/Reports/Pages/Report.aspx?ItemPath=%2fAML+Project%2fDASHBOARD%2fAML+Main+Dashboard'

};
