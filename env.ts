/* eslint-disable no-process-env */

const CLOUDFLARE_R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID as string;
const CLOUDFLARE_R2_ACCESS_KEY_ID = process.env
  .CLOUDFLARE_R2_ACCESS_KEY_ID as string;
const CLOUDFLARE_R2_SECRET_ACCESS_KEY = process.env
  .CLOUDFLARE_R2_SECRET_ACCESS_KEY as string;
const CLOUDFLARE_R2_BUCKET_NAME = process.env
  .CLOUDFLARE_R2_BUCKET_NAME as string;

export const env = {
  CLOUDFLARE_R2_ACCOUNT_ID,
  CLOUDFLARE_R2_ACCESS_KEY_ID,
  CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  CLOUDFLARE_R2_BUCKET_NAME,
} as const;
/* eslint-enable no-process-env */
