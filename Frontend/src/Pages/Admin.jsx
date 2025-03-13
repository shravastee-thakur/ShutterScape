import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getUser",
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="admin-container">
        <h2>Mange Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.map((elem, id) => {
                return (
                  <tr key={id}>
                    <td>{elem.name}</td>
                    <td>{elem.email}</td>
                    <td>
                      <button onClick={() => handleDelet(elem._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
