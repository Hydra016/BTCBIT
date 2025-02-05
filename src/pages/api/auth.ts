import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name?: string;
  auth?: boolean;
  error?: string;
};

const incorrectCredentials = {
  email: 'incorrect@email.com',
  password: 'incorrect-password'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    setTimeout(() => {

      if (email === incorrectCredentials.email && password === incorrectCredentials.password) {
        res.status(401).json({ auth: false, error: 'Invalid email or password' });
      } else {
        res.status(200).json({ auth: true });
      }
    }, 3000);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
