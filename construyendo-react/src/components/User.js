//Trabajando con componentes de estado - Clases
//Apis  - Eventos
import React from 'react';
import {useState, useEffect} from 'react';

//Importar nuestro componente
import UserList from './UserList';

function User(){
    const [users, setUsers] = useState([])
    const getUsers = async () => {
      await fetch('http://localhost:3030/api/users')
        .then((response) => response.json())
        .then((data) => setUsers(data.data))
    }
    useEffect(() => {
      getUsers()
    }, [])

      return (
          <React.Fragment>
          {/*<!-- User LIST -->*/}
          <h1 className="h3 mb-2 text-gray-800 ">Todos los usuarios en la Base de Datos</h1>
          
          {/*<!-- DataTales Example -->*/}
          <div className="card shadow mb-4">
              <div className="card-body">
                  <div className="table-responsive">
                      <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                          <thead>
                              <tr>
                                  <th>Id</th>
                                  <th>Nombre</th>
                                  <th>Nick</th>
                                  <th>Email</th>
                                  <th>Country</th>
                              </tr>
                          </thead>
                          <tfoot>
                              <tr>
                                  <th>Id</th>
                                  <th>Nombre</th>
                                  <th>Nick</th>
                                  <th>Email</th>
                                  <th>Country</th>
                              </tr>
                          </tfoot>
                          <tbody>
                              {
                                  //console.log(this.state.users)
                                  users.map((user, index) => {
                                      return <UserList {...user} key={index}  />
                                  })
                              }
                          </tbody>
                      </table>
                  </div>
              </div>
      </div>

  </React.Fragment>
  )
  }

export default User;
