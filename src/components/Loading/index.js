import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = ({ loading }) => (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#821E1B" />
        </View>
      ) : null}
    </>
  );

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        zIndex: 99,
        position: 'absolute'
    },
});

export default Loading;