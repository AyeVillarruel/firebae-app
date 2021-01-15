
import React, {useEffect, useState} from 'react'
import {View, Text, Button} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from '../database/firebase'
import {ListItem, Avatar} from 'react-native-elements'

const UsersList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((querySnapshot) => { //manda todo lo que tiene la base de datos
          const users = []
          
            querySnapshot.docs.forEach((doc) => { // querySnapshopst es la respuesta, docs contiene todos los documenttos o los datos
                 const {name, email, phone} = doc.data()
                
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            })
            console.log(users)
            setUsers(users)
        })
    }, [])
    return (
        <ScrollView>
            <Button
             title="create user"
             onPress={() => props.navigation.navigate('CreateUserScreen') } />

               {
        users.map( user => {
            return(
                <ListItem
                key={user.id} bottomDivider onPress={() => {
                    props.navigation.navigate('UserDetailScreen', {
                        userId: user.id
                    })
                }}
                >
                    <ListItem.Chevron />
                    <Avatar source={{
                        uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}} 
                        rounded //redondea la imagen
                        />
                    <ListItem.Content>
            <ListItem.Title>{user.name}</ListItem.Title>
            <ListItem.Subtitle>{user.email} </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            )
        })
    }
        </ScrollView>
    )
  
}
export default UsersList