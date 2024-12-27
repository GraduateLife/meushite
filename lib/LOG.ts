export const LOG = () => {
  if (typeof window !== undefined) {
    console.log('I am on client side');
  }
  if (process.env.NODE_ENV) {
    console.log('I am on server side');
  }
};
