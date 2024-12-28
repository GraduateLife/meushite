export const LOG = () => {
  // eslint-disable-next-line valid-typeof,no-constant-binary-expression
  if (typeof window !== undefined) {
    console.log('I am on client side');
  }
  if (process.env.NODE_ENV) {
    console.log('I am on server side');
  }
};
