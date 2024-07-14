// AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { initializeApp } from '@firebase/app';
import { initializeAuth, signInWithEmailAndPassword, getReactNativePersistence } from '@firebase/auth'; // Import signInWithEmailAndPassword correctly
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, setDoc, doc } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBmFJkScngUz-cDsQg5J9cnr_S_x1EhFBA",
    authDomain: "ihsupdatesapp-7be44.firebaseapp.com",
    projectId: "ihsupdatesapp-7be44",
    storageBucket: "ihsupdatesapp-7be44.appspot.com",
    messagingSenderId: "221203737978",
    appId: "1:221203737978:web:d5336d5e1f23c20171bac3"
  };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

const AuthScreen = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grNo, setGrNo] = useState('');
  const [grade, setGrade] = useState('');
  const [division, setDivision] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password); // Use signInWithEmailAndPassword correctly
        setUser(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;
        await setDoc(doc(db, 'users', grNo), {
          email: newUser.email,
          studentName,
          grNo,
          grade,
          division
        });
        setUser(newUser);
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            value={studentName}
            onChangeText={setStudentName}
            placeholder="Student's Name"
          />
          <TextInput
            style={styles.input}
            value={grNo}
            onChangeText={setGrNo}
            placeholder="GR Number"
          />
          <TextInput
            style={styles.input}
            value={grade}
            onChangeText={setGrade}
            placeholder="Grade"
          />
          <TextInput
            style={styles.input}
            value={division}
            onChangeText={setDivision}
            placeholder="Division"
          />
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
});

export default AuthScreen;
