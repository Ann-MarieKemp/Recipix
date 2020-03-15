import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import auth from '@react-native-firebase/auth';

const Login = props => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(User) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, {});

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
};
