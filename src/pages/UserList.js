import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import userService from '../service/UserService';
import '../UserList.css';  // Import the CSS file

export default function UserList() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const addInList = async () => {
    const user = { name };
    if(name.length === 0 || name === null || name === undefined){
        alert('Informe o nome que deseja inserir')
    }else{
      const response = await userService.addUser(user); // Adiciona o usuário usando o serviço
    setUsers(response.data);//Preenche a table com os novos registros
    setName(''); // Limpa o campo de nome após adicionar
    }
    
  };

  const searchInList = async () => {

    if(name.length === 0 || name === null || name === undefined){
        const response = await userService.findAll();// caso o campo de busca esteja nulo realiza um busca geral por todos os registros.
        setUsers(response.data)
        
    }else{
        try{
            const response = await userService.searchInList(name);//busca atraves do nome ou parte do nome.
            if(response !== undefined && response.status === 200){
                setUsers(response.data);
            }
            
        }catch (error) {
            console.error('Error fetching users:', error);
        }    
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\u00C0-\u017F\s]*$/.test(value)) {//validação para verificar se apenas letra estão sendo inseridas
      setName(value);
    } else {
      alert('Favor informar apenas letras');
    }
  };

  const deleteInList = async (user) => {
    try {
      await userService.deleteInList(user);
      setUsers(users.filter(u => u.id !== user.id));
    } catch (error) {
      console.error('Erro ao deletar usuario:', error);
    }  
  };

  return (

    <div className="container">
      <div className="bord">
        <h1>Cadastro de nomes</h1>
        <form>
          <input
            type='text'
            value={name}
            onChange={(e) => handleNameChange(e)}
            placeholder="Digite o nome"
          />
          <IconButton aria-label="send" onClick={addInList}>
            <SendIcon />
          </IconButton>
          <IconButton aria-label="search" onClick={searchInList}>
            <SearchIcon />
          </IconButton>
        </form>
        <List className="user-list">
          {users.slice(0, 5).map((value, index) => (
            <ListItem key={index} className="list-item" disableGutters>
              <ListItemText primary={value.name} />
              <IconButton aria-label="comment" onClick={() => deleteInList(value)}>
                <DeleteIcon  />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
