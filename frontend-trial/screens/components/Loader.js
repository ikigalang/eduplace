/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React from 'react';

//Import all required component
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const Loader = props => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} />
          <Icons name={'account-edit'} color={'#fff'} size={14}/>
<Icons name={'book-plus-multiple'} color={'#fff'} size={14}/>
<Icons name={'plus-box'} color={'#fff'} size={14}/>
<Icons name={'lock-reset'} color={'#fff'} size={14}/>
<Icons name={'bookmark-multiple'} color={'#fff'} size={14}/>
<Icons name={'clipboard-list'} color={'#fff'} size={14}/>
<Icons name={'cog'} color={'#fff'} size={14}/>
<Icons name={'login'} color={'#fff'} size={14}/>
<Icons name={'logout'} color={'#fff'} size={14}/>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});