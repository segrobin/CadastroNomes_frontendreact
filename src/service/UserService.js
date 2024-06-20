import React, { useState } from 'react';
import axios from 'axios';


    const findAllUsers = async () => {

          return await axios.get('http://localhost:8097/users/findAll');

      };

      const addUser = async (newUser) => {
        try {
        
          const response = await axios.post('http://localhost:8097/users/addUser',newUser);
          console.log('All Users:', response.data);
          return response;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      const findAll = async () =>{
        try {
            return await axios.get('http://localhost:8097/users/findAll');
          } catch (error) {
            console.error('Error fetching users:', error);
          }
      }

      const searchInList = async (user) =>{
        const params = { name: user };
        try {
            return await axios.get('http://localhost:8097/users/findByName', { params });
          } catch (error) {
            console.error('Error fetching users:', error);
          }
      }
      const deleteInList= async (user) =>{
        try {
          const response= await axios.delete('http://localhost:8097/users/deleteByName',{data:user} )
          return response.data;
        } catch (error) {
          console.error('Error deleting user:', error);
          throw error; // Propagate the error to the caller
        }
          
      }
    
    
      const UserService = {
        findAllUsers,
        addUser,
        searchInList,
        deleteInList,
        findAll
      }

      export default UserService;