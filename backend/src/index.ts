import getEnvVar, { parseEnv } from 'env/index';
parseEnv();
import expressApp from 'apps/server';

expressApp.listen(parseInt(getEnvVar('PORT')), () => {
  console.log(`Server listening at ${getEnvVar('PORT')}`);
});
