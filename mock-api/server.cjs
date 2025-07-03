const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const SECRET_KEY = 'your-secret-key';
const EXPIRES_IN = '1h';

server.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    const user = router.db.get('users').find({ email, password }).value();

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: EXPIRES_IN
    });

    const response = {
      success: true,
      access_token: token,
      token_type: 'bearer',
      expires_in: 3600,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

server.use((req, res, next) => {
  if (req.path === '/login') return next();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
});

server.use(router);
server.listen(3000, () => console.log('Running on port 3000'));
