'use server';

import { downloadFolder } from '@/cloudflare/r2';
import { RemoteAssetEndpoint } from '@/cloudflare/utils';
import { env } from '@/env';

export const greet = async () => {
  // await uploadFolder('content/dotnet-cli', 'dotnet-cli');
  await downloadFolder('content/dotnet-cli', 'download');
  return env.CLOUDFLARE_R2_BUCKET_NAME;
};

export const getObjectUrl = async (key: string) => {
  return RemoteAssetEndpoint + '/' + key;
};
