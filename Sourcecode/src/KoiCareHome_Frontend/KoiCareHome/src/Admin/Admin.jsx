// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default function Admin() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`/api/admin/members`);
                console.log("Dữ liệu nhận được:", response.data);

                const formattedMembers = response.data.map(item => ({
                    MemberID: item[0],
                    Password: item[1],
                    Role: item[2],
                    FirstName: item[3],
                    LastName: item[4],
                    Email: item[5],
                    Phone: item[6],
                    Status: item[7],
                    CreatedAt: item[8],
                    DeletedAt: item[9],
                    UpdatedAt: item[10],
                }));

                setMembers(formattedMembers);
            } catch (error) {
                console.error('Error fetching Members:', error);
            }
        };

        fetchMembers();
    }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
            <tr key={member.MemberID}>
                <td>{member.MemberID}</td>
                <td>{member.FirstName}</td>
                <td>{member.LastName}</td>
            </tr>
        ))}
      </tbody>
    </Table>
  );
}
