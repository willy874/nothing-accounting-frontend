// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log('res: ', res);
  const model = {
    'test@qq.com':{
      id: 1,
      email: 'test@qq.com',
      password: '777tat',
      username: 'John Test'
    },
    'examp;@qq.com': {
      id: 2,
      email: 'example@qq.com',
      password: 'tew',
      username: 'Rita Test'
    }
  };
  res.status(200).json([model])
}