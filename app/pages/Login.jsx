import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  Image,
  ImageBackground,
} from 'react-native';
const resource_url = 'https://mp-resource.shouyinongye.com/resource/shouyi/';
const curve = {uri: resource_url + 'login_bg_curve.png'};
const leaf = {uri: resource_url + 'login_icon_leaf.png'};
const logo = {uri: resource_url + 'login_logo.png'};
const formBg = {uri: resource_url + 'login_bg_blur.png'};
const phoneIcon = {uri: resource_url + 'login_icon_mobile.png'};
const pwdIcon = {uri: resource_url + 'login_icon_pwd.png'};

export default function Login({navigation}) {
  const [mobile, setMobile] = React.useState('');
  const [password, setPassword] = React.useState('');
  const submitForm = () => {
    console.log('submit');
    navigation.navigate('CustomerList');
  };

  return (
    <View style={styles.loginPage}>
      <ImageBackground
        source={curve}
        resizeMode="cover"
        style={styles.curveImage}
      />
      <Image style={styles.logoStyle} source={logo} />
      <ImageBackground
        source={formBg}
        resizeMode="cover"
        style={styles.formBgImage}
      />
      <View style={styles.loginForm}>
        <View style={styles.inputItem}>
          <Image style={styles.inputIocn} source={phoneIcon} />
          <TextInput
            multiline
            maxLength={11}
            editable
            placeholder="手机号"
            placeholderTextColor="#c8c8c8"
            keyboardType="numeric"
            style={styles.inputStyle}
            onChangeText={setMobile}
            defaultValue={mobile}
          />
        </View>
        <View style={styles.inputItem}>
          <Image style={styles.inputIocn} source={pwdIcon} />
          <TextInput
            editable
            placeholder="密码"
            placeholderTextColor="#c8c8c8"
            onChangeText={setPassword}
            defaultValue={password}
            keyboardType="numeric"
            textContentType="password"
            style={styles.inputStyle}
            secureTextEntry={true}
          />
        </View>
        <Pressable style={styles.buttonStyle} onPress={submitForm}>
          <Text style={styles.buttonText}>登录</Text>
        </Pressable>
        <Text style={styles.tip}>账号密码请提前向公司申请</Text>
        <Pressable onPress={submitForm}>
          <Text style={styles.forgetPwd}>忘记密码</Text>
        </Pressable>
      </View>
      <ImageBackground
        source={leaf}
        resizeMode="cover"
        style={styles.leafImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6DAB3F',
    position: 'relative',
    paddingTop: 30,
  },
  curveImage: {
    width: '100%',
    height: 422,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  logoStyle: {
    width: 97,
    height: 132,
  },
  leafImage: {
    width: 240,
    height: 186,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
  formBgImage: {
    width: 373,
    height: 393,
    position: 'absolute',
    top: 200,
    left: 10,
  },
  loginForm: {
    width: 335,
    height: 354,
    padding: 20,
    borderRadius: 16,
    position: 'absolute',
    top: 218,
    left: 30,
    zIndex: 1,
  },

  inputItem: {
    height: 50,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    marginBottom: 20,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  inputIocn: {
    width: 24,
    height: 24,
    marginRight: 20,
    flex: 0.1,
  },
  inputStyle: {
    flex: 0.9,
    height: 50,
    color: '#fff',
    fontSize: 18,
  },
  buttonStyle: {
    width: 260,
    height: 42,
    borderRadius: 12,
    marginTop: 20,
    marginLeft: 18,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#6DAB3F',
  },
  tip: {
    marginTop: 30,
    color: '#eee',
    textAlign: 'center',
  },
  forgetPwd: {
    marginTop: 30,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    textDecorationColor: '#fff',
    textDecorationLine: 'underline',
  },
});
