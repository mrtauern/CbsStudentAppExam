import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Input from './../components/common/Input'

const LoginScreen = props => {
   const dispatch = useDispatch();
   const [email, setEmail] = useState('');
   const [emailValid, setEmailValid] = useState(false);
   const [password, setPassword] = useState('');
   const [passwordValid, setPasswordValid] = useState(false);

   const handleSignin = () => {
      dispatch(signin(email, password));
   };

   return (
      <View style={styles.container}>
      <Input label="Email"
         error="Please fill out your email"
         text={email} nameValid={emailValid}
         onValid={valid => setEmailValid(valid)}
         setContent={content => setEmail(content)}/>

      <Input label="Password"
         error="Please fill out your password"
         text={password} nameValid={passwordValid}
         onValid={valid => setPasswordValid(valid)}
         setContent={content => setPassword(content)}/>

      <Button title="Signup" onPress={handleSignup}/>
      <Button title="Signin" onPress={handleSignin}/>
   </View>
   );
}

const styles = StyleSheet.create({
   
});

export default LoginScreen;