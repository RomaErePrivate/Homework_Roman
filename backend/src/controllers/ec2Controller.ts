import { Ec2Service } from '../service/ec2Service';
import { Request, Response } from 'express';

export const listInstances = async (req: Request, res: Response) => {
    try {
        const ec2Service = new Ec2Service();
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const sortBy = req.query.sortBy as string || 'name';
        const sortOrder = (req.query.sortOrder as string === 'desc') ? 'desc' : 'asc';
        const instanceData = await ec2Service.getInstances({ page, limit }, sortBy, sortOrder);
        res.json(instanceData);
    } catch (err) {
        res.status(500).send('Error fetching EC2 instances');
    }
}