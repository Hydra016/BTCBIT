import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    setTimeout(() => {
        res.status(404).json({
            msg: "Not Found"    
        });
    }, 3000);
}