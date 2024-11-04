import { EC2 } from 'aws-sdk';

interface EC2InstanceResponse {
    name: string,
    id: string,
    type: string,
    state: string,
    az: string,
    publicIP: string,
    privateIP: string
}

interface Pagination {
    page: number;
    limit: number;
}

export class Ec2Service {
    private readonly ec2: EC2;

    constructor() {
        this.ec2 = new EC2({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }

    async getInstances(pagination: Pagination, sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc'): Promise<EC2InstanceResponse[]> {
        const instances = this.mapToInstances(await this.fetchEc2Data());
        const sortedInstances = this.sort(instances, sortBy || 'name', sortOrder);
        const startIndex = (pagination.page - 1) * pagination.limit;
        return sortedInstances.slice(startIndex, startIndex + pagination.limit);
    }

    private async fetchEc2Data(): Promise<EC2.Instance[]> {
        const data = await this.ec2.describeInstances().promise();
        const instances: EC2.Instance[] = [];
        data.Reservations?.forEach(reservation => {
            reservation.Instances?.forEach(instance => {
                instances.push(instance);
            });
        });
        return instances;
    }

    private sort = (instances: EC2InstanceResponse[], sortBy: string, sortOrder: 'asc' | 'desc') => {
        return instances.sort((a, b) => {
            const aValue = (a as any)[sortBy] || '';
            const bValue = (b as any)[sortBy] || '';
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    private mapToInstances(instances: EC2.Instance[]): EC2InstanceResponse[] {
        return instances.map(instance => {
            return {
                name: instance.Tags?.find(tag => tag.Key === 'Name')?.Value || '',
                id: instance.InstanceId || '',
                type: instance.InstanceType || '',
                state: instance.State?.Name || '',
                az: instance.Placement?.AvailabilityZone || '',
                publicIP: instance.PublicIpAddress || '',
                privateIP: instance.PrivateIpAddress || ''
            };
        });
    }
}