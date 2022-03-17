// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const model = {
    id: 1,
    name: 'John Doe'
  }
  res.status(200).json([model])
}