import { env } from '@/env';
import { echo } from '@/lib/echo';
import { copyPostImagesToPublic } from '@/lib/post_utils/local-copy';

if (require.main === module) {
  if (env.SITE_BLOG_IMAGE_READ_MODE === 'local') {
    copyPostImagesToPublic();
  } else {
    echo.info(
      `SITE_BLOG_IMAGE_READ_MODE was set to ${env.SITE_BLOG_IMAGE_READ_MODE}, skipping local copy`
    );
  }
}
