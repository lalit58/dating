import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PADDING, itemSpace10} from '../../../utils/constants';
import {Colors} from '../../../theme/colors';
import {WP} from '../../../utils/regex';
import {
  OpenSansMedium,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsSemiBold,
  RobotoMedium,
} from '../../../theme/fontFamily';
import {OS} from '../../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import PhoneOTPLogin from './phoneOtpLogin';
import PhoneOTPVerification from './phoneOtpLogin';
import PhoneOtpLogin from './phoneOtpLogin';

const SignUp = props => {
  console.log(props.route.name);

  const navigation = useNavigation();
  const HandleSignUp = () => {
    if (props.route.name === 'signin') props.navigation.push('register');
    else {
      props.navigation.push('signin');
    }
  };

  const NavigateToNewPage = () => {
    if (props.route.name === 'signin') {
      navigation.navigate('tabNavigator');
    }
  };

  return (
    <View style={{flex: 1, padding: PADDING, justifyContent: 'space-around'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.signInText}>
          {' '}
          {props.route.name === 'signin' ? 'SIGN IN' : 'SIGN UP'}
        </Text>
      </View>
      <View style={{gap: PADDING}}>
        <View>
          <Text style={styles.usernameText}>USERNAME</Text>
          <TextInput style={styles.inputView} />
        </View>
        <View>
          <Text style={styles.usernameText}>PASSWORD</Text>
          <TextInput style={styles.inputView} />
        </View>
      </View>
      {/* <View>{user ? <Text>Logooninn</Text> : <PhoneOtpLogin />}</View> */}
      <View style={{gap: PADDING}}>
        <View>
          <TouchableOpacity
            style={styles.signinBtn}
            onPress={() => NavigateToNewPage()}>
            <Text style={styles.btnColor}>
              {props.route.name === 'signin' ? 'SIGN IN' : 'SIGN UP'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newuser}>
          <Text style={styles.newuserText}>
            {props.route.name === 'signin'
              ? 'New user?'
              : 'Already have an account'}
          </Text>
          <Text style={styles.signUpText} onPress={() => HandleSignUp()}>
            {props.route.name === 'signin' ? 'Sign Up' : 'Sign In'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signinBtn: {
    backgroundColor: Colors.BROWN,
    alignItems: 'center',
    height: WP(50),
    justifyContent: 'center',
    borderRadius: 55,
  },
  btnColor: {
    fontSize: WP(18),
    color: Colors.WHITE,
    fontFamily: PoppinsSemiBold,
  },
  newuser: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  newuserText: {
    fontFamily: PoppinsRegular,
    fontSize: WP(18),
    color: Colors.GREY,
  },
  signUpText: {
    fontFamily: PoppinsSemiBold,
    fontSize: WP(20),
    color: Colors.GREEN,
  },
  signInText: {
    fontFamily: PoppinsMedium,
    fontSize: WP(25),
    color: Colors.GREEN,
  },
  usernameText: {
    fontFamily: PoppinsRegular,
    fontSize: WP(16),
    color: Colors.GREY,
  },
  inputView: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY,
    height: WP(40),
  },
});
