import React from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import Icon from '../icon';
import { Colors } from '../../../themes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen';

const SearchBox = props => {
  const { onPress, onChangeText, placeholder, disabled } = props;
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput style={styles.textInput} onChangeText={onChangeText} placeholder={placeholder} />
          <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
            <Icon name="ios-search" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchBox;

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('2%'),


  },

  content: {
    flexDirection: 'row',
    height: hp('9%'),
    width: wp('90%'),
    borderColor: Colors.white,
  },
  textInput: {
    fontSize: 18,
    backgroundColor: Colors.white,
    width: wp('70%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: '#cecece',
    margin: 5
  },
  button: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    height: hp('8%'),
    width: wp('18%'),
    borderRadius: 3

  }

})
