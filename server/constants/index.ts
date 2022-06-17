export const PORT = parseInt(process.env.PORT ?? '0', 10) || 3000;
export const IS_DEV = process.env.NODE_ENV !== 'production';
