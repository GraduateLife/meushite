type UrlType<T, K> = {
  params: Promise<T>;
  searchParams: Promise<K>;
};
