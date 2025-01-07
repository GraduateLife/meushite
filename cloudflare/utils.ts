import { env } from '@/env';

export const BucketEndpoint = `https://${env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

export const RemoteAssetEndpoint = 'https://asset.iameddie.work';
