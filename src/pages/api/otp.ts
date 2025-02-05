import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { otp } = req.body;

        if (otp) {
            setTimeout(() => {
                res.status(200).json({ auth: true });
            }, 3000);
        } else {
            res.status(400).json({ error: 'OTP is required' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}