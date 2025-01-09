import { copyPostImagesToPublic } from '@/lib/post_utils/local-copy';

if (require.main === module) {
  copyPostImagesToPublic();
}
