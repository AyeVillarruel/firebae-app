import React, {useEffect, useState} from 'react'
import {View, TextInput,Button, ScrollView, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {
       const initialState= {
         id:'',
        name: '',
        email: '',
        phone: ''     
    }
    const[user, setUser]=useState()
    const [loading, setLoading]= useState(true)

    const getUserById = async (id) => {
      const dbRef=  firebase.db.collection('users').doc(id)
      const doc= await dbRef.get();
      const user = doc.data()
      setUser({
          ...user,
          id: doc.id
      });
      setLoading(false)

    }
    
    useEffect(() => {
        getUserById(props.route.params.userId)
        
    },[])
    console.log(props.route.params.userId)

    const handlerChangeText = (name, value) => {
      setUser({...user, [name]: value})
       }

       const deleteUser = async () =>{
           const dbRef= firebase.db.collection('users').doc(props.route.params.userId);
           await dbRef.delete();
           props.navigation.navigate('UsersList')

       }

       const openConfirmationAlert = () => {
           Alert.alert('Eliminar usuario', 'Estas seuro?', [
               {text: 'si', onPress: () => deleteUser()},
               {text: 'no', onPress: () => console.log('no eliminado')}
           ])
       }

       const updateUser = async () => {
           const dbRef = firebase.db.collection('users').doc(user.id)
           await dbRef.set({
               name: user.name,
               email: user.email,
               phone: user.phone
           })
           setUser(initialState)
           props.navigation.navigate('UsersList')
       }
       

       if(loading){
           return(
               <View>
                   <ActivityIndicator  size="large" color="#9e9e9e" />
               </View>
           )
       }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput 
            value={user.name}
            placeholder="Name User"
            onChangeText={(value) => handlerChangeText('name', value) }/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput
            value={user.email}
             placeholder="Email User"
             onChangeText={(value) => handlerChangeText('email', value) } />
        </View>
        <View style={styles.inputGroup}>
            <TextInput
            value={user.phone}
             placeholder="Phone User"
             onChangeText={(value) => handlerChangeText('phone', value) } />
        </View>
        <View>
          <Button 
          color= '#19AC52'
          title="update User"
        onPress={() => updateUser()} />  
        </View>
        <View>
        <Button 
         color= '#E37399'
        title="delete User"
        onPress={() => openConfirmationAlert()} />
        </View>
        
    </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
    })
export default UserDetailScreen