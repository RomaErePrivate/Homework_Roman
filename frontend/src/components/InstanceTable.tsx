import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

interface Instance {
    id: string;
    name: string;
    type: string;
    state: string;
    az: string;
    publicIP: string;
    privateIPs: string[];
}

const InstanceTable = () => {
    const [instances, setInstances] = useState<Instance[]>([]);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/ec2/instances', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setInstances(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleSort = (field: string) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
        const sorted = [...instances].sort((a, b) => {
            // @ts-ignore
            if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
            // @ts-ignore
            if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setInstances(sorted);
    };

    return (
        <table>
            <thead>
            <tr>
                <th onClick={() => handleSort('name')}>Name</th>
                <th onClick={() => handleSort('id')}>ID</th>
                <th onClick={() => handleSort('type')}>Type</th>
                <th onClick={() => handleSort('state')}>State</th>
                <th onClick={() => handleSort('az')}>AZ</th>
                <th onClick={() => handleSort('publicIP')}>Public IP</th>
                <th onClick={() => handleSort('privateIPs')}>Private IPs</th>
            </tr>
            </thead>
            <tbody>
            {instances.map(instance => (
                <tr key={instance.id}>
                    <td>{instance.name}</td>
                    <td>{instance.id}</td>
                    <td>{instance.type}</td>
                    <td>{instance.state}</td>
                    <td>{instance.az}</td>
                    <td>{instance.publicIP}</td>
                    <td>{instance.privateIPs}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default InstanceTable;