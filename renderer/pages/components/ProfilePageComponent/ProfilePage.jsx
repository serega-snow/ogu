import React from 'react';

const ProfilePage = () => {
  return (
    <div className='ProfilePage'>
      <h2>Пользователи системы</h2>

      <table>
        <tr>
          <th>Employee</th>
          <th>Salary</th>
          <th>Bonus</th>
          <th>Supervisor</th>
        </tr>

        <tr>
          <td>Stephen C. Cox</td>
          <td>$300</td>
          <td>$50</td>
          <td>Bob</td>
        </tr>
        <tr>
          <td>Josephin Tan</td>
          <td>$150</td>
          <td>-</td>
          <td>Annie</td>
        </tr>
        <tr>
          <td>Joyce Ming</td>
          <td>$200</td>
          <td>$35</td>
          <td>Andy</td>
        </tr>
        <tr>
          <td>James A. Pentel</td>
          <td>$175</td>
          <td>$25</td>
          <td>Annie</td>
        </tr>
      </table>
    </div>
  );
};

export default ProfilePage;
