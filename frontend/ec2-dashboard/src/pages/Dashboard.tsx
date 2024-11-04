import * as React from 'react';
import { useEffect, useState } from 'react';

interface EC2Instance {
    name: string;
    id: string;
    type: string;
    state: string;
    az: string;
    publicIP: string;
    privateIPs: string[];
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<EC2Instance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/ec2');
                console.log(JSON.stringify(response));
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>EC2 Instances Dashboard</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>State</th>
                    <th>AZ</th>
                    <th>Public IP</th>
                    <th>Private IPs</th>
                </tr>
                </thead>
                <tbody>
                {data.map((instance) => (
                    <tr key={instance.id}>
                        <td>{instance.name}</td>
                        <td>{instance.id}</td>
                        <td>{instance.type}</td>
                        <td>{instance.state}</td>
                        <td>{instance.az}</td>
                        <td>{instance.publicIP}</td>
                        <td>{instance.privateIPs.join(', ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;