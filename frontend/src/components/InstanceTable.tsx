import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

interface Instance {
    id: string;
    name: string;
    type: string;
    state: string;
    az: string;
    publicIP: string;
    privateIP: string;
}

const InstanceTable = () => {
    const [instances, setInstances] = useState<Instance[]>([]);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const instancesPerPage = 6;

    const fetchData = async (page: number, sortField: string, sortOrder: string) => {
        try {
            const response = await axios.get('/api/ec2/instances', {
                params: {
                    page: page,
                    limit: instancesPerPage,
                    sortBy: sortField,
                    sortOrder: sortOrder
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setInstances(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData(currentPage, sortField, sortOrder);
    }, [currentPage, sortField, sortOrder]);

    const handleSort = (field: string) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchData(nextPage, sortField, sortOrder);
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th onClick={() => handleSort('id')}>ID</th>
                    <th onClick={() => handleSort('type')}>Type</th>
                    <th onClick={() => handleSort('state')}>State</th>
                    <th onClick={() => handleSort('az')}>AZ</th>
                    <th onClick={() => handleSort('publicIP')}>Public IP</th>
                    <th onClick={() => handleSort('privateIP')}>Private IP</th>
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
                        <td>{instance.privateIP}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <button onClick={handleNextPage}>Next Page</button>
            </div>
        </div>
    );
};

export default InstanceTable;