import { server } from './app';
import { nextRegisterer } from './next';
import { PORT } from './constants';

server.register(nextRegisterer);

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});
