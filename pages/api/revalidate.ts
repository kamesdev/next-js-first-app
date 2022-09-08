import type { NextApiRequest, NextApiResponse  } from "next";

// type Response = {
//     revalidated?: boolean,
//     message?: string,
// }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const { query } = req
    const { secret, route } = query

    if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    if (!route) {
        return res.status(401).json({ message: 'Route not defined' })
    }

    console.log(secret, route, process.env.REVALIDATE_SECRET_TOKEN);

    try {
        await res.revalidate(route.toString())
        return res.json({ revalidated: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error revalidating', error})
    }
}