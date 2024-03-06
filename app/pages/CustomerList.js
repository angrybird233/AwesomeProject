/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
  Image,
  FlatList,
  Pressable,
  // ActivityIndicator,
  Alert,
} from 'react-native';
const emptyImage = {
  uri: 'https://mp-resource.shouyinongye.com/resource/shouyi/h5/cart-empty.png',
};
import {getLandCustomersApi} from '../api/index';

const origin_list = [
  {
    land_id: 152,
    land_count: 72,
    land_area_total: '2577.76',
    customer_id: 260,
    customer_name: '河南先天下种业有限公司',
    customer_sn: '000260',
    customer_type_data: [
      {
        customer_id: 260,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
    ],
  },
  {
    land_id: 53,
    land_count: 26,
    land_area_total: '1836.05',
    customer_id: 165,
    customer_name: '邓州市益收农作物种植专业合作社',
    customer_sn: '000165',
    customer_type_data: [
      {
        customer_id: 165,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
      {
        customer_id: 165,
        customer_type_id: 3,
        customer_type_name: '牧草业务',
      },
      {
        customer_id: 165,
        customer_type_id: 7,
        customer_type_name: '农资贸易',
      },
    ],
  },
  {
    land_id: 81,
    land_count: 22,
    land_area_total: '3555.62',
    customer_id: 63,
    customer_name: '驻马店优然牧业有限责任公司',
    customer_sn: '000063',
    customer_type_data: [
      {
        customer_id: 63,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
      {
        customer_id: 63,
        customer_type_id: 3,
        customer_type_name: '牧草业务',
      },
      {
        customer_id: 63,
        customer_type_id: 7,
        customer_type_name: '农资贸易',
      },
    ],
  },
  {
    land_id: 124,
    land_count: 18,
    land_area_total: '1740.48',
    customer_id: 237,
    customer_name: '桃江县翱翔玉米种植专业合作社',
    customer_sn: '000237',
    customer_type_data: [
      {
        customer_id: 237,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
      {
        customer_id: 237,
        customer_type_id: 7,
        customer_type_name: '农资贸易',
      },
    ],
  },
  {
    land_id: 100,
    land_count: 15,
    land_area_total: '492.72',
    customer_id: 259,
    customer_name: '邓州市穰诚农牧有限公司',
    customer_sn: '000259',
    customer_type_data: [
      {
        customer_id: 259,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
    ],
  },
  {
    land_id: 162,
    land_count: 9,
    land_area_total: '498.06',
    customer_id: 126,
    customer_name: '邓州市诚粮农作物种植专业合作社',
    customer_sn: '000126',
    customer_type_data: [
      {
        customer_id: 126,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
    ],
  },
  {
    land_id: 143,
    land_count: 6,
    land_area_total: '596.20',
    customer_id: 251,
    customer_name: '邓州市国阁农产品有限责任公司',
    customer_sn: '000251',
    customer_type_data: [
      {
        customer_id: 251,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
    ],
  },
  {
    land_id: 227,
    land_count: 5,
    land_area_total: '39.28',
    customer_id: 221,
    customer_name: '南阳市金裕农业有限公司',
    customer_sn: '000221',
    customer_type_data: [
      {
        customer_id: 221,
        customer_type_id: 3,
        customer_type_name: '牧草业务',
      },
      {
        customer_id: 221,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
      {
        customer_id: 221,
        customer_type_id: 4,
        customer_type_name: '粮食贸易',
      },
    ],
  },
  {
    land_id: 256,
    land_count: 4,
    land_area_total: '11.07',
    customer_id: 102,
    customer_name: '周诚祥',
    customer_sn: '000102',
    customer_type_data: [
      {
        customer_id: 102,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
      {
        customer_id: 102,
        customer_type_id: 7,
        customer_type_name: '农资贸易',
      },
    ],
  },
  {
    land_id: 244,
    land_count: 3,
    land_area_total: '15.78',
    customer_id: 262,
    customer_name: '湖北裕金农农业专业合作社',
    customer_sn: '000262',
    customer_type_data: [
      {
        customer_id: 262,
        customer_type_id: 1,
        customer_type_name: '代耕业务',
      },
    ],
  },
];

const onEndReached = () => {
  console.log('onEndReached');
  // Alert.alert('到底了');
};

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyBox}>
      <Image style={styles.emptyImage} source={emptyImage} />
      <Text style={styles.emptyText}>暂无数据</Text>
    </View>
  );
};

export default function CustomerList({navigation}) {
  const [customerName, setCustomerName] = React.useState('');
  const [list, setList] = React.useState('');

  const goLandDetail = () => {
    navigation.navigate('LandDetail');
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const params = {page: 1, size: 20};
        const res = await getLandCustomersApi(params);
        if (res && res.list) {
          console.log('list', list);
          setList(res.list);
        }
      } catch (error) {
        console.log(error);
        setList(origin_list);
      }
    };

    fetchCustomers();
  });

  const renderItem = ({item}) => {
    return (
      <Pressable style={styles.customerItem} onPress={goLandDetail}>
        <Text style={styles.customerName}>{item.customer_name}</Text>
        <View style={styles.itemInfo}>
          <Text style={styles.colorGray}>地块数量：</Text>
          <Text style={styles.colorBlack}>{item.land_count}</Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.colorGray}>总 面 积 ：</Text>
          <Text style={styles.colorBlack}>{item.land_area_total}亩</Text>
        </View>
        <Text style={styles.addButton}>新增地块</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.customerList}>
        <View style={styles.dataBoard}>
          <View style={styles.innerBox}>
            <View style={styles.item}>
              <Text style={styles.number}>193</Text>
              <Text style={styles.numberText}>地块总数</Text>
            </View>
            <View style={styles.item}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text style={styles.number}>13902.2</Text>
                <Text>亩</Text>
              </View>
              <Text style={styles.numberText}>地块总面积</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputItem}>
          <TextInput
            editable
            placeholder="搜索客户名称"
            placeholderTextColor="#c8c8c8"
            style={styles.inputStyle}
            onChangeText={setCustomerName}
            defaultValue={customerName}
          />
        </View>
        <FlatList
          style={styles.list}
          data={list}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          keyExtractor={item => item.customer_id}
          onEndReachedThreshold={0.2}
          onEndReached={onEndReached}
        />
        {/* <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customerList: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f2f2f2',
  },
  dataBoard: {
    width: '92%',
    height: 110,
    backgroundColor: '#609E39',
    boxSizing: 'border-box',
    padding: 15,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
  },
  innerBox: {
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  item: {
    display: 'flex',
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  number: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },
  numberText: {
    marginTop: 5,
  },
  inputItem: {
    width: '92%',
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  inputStyle: {
    color: '#000',
    fontSize: 14,
  },
  list: {
    width: '92%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
  customerItem: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    position: 'relative',
  },
  customerName: {
    height: 34,
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  itemInfo: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  colorGray: {
    color: '#7f7f7f',
    width: 70,
  },
  colorBlack: {
    color: '#000',
  },
  emptyBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  emptyText: {
    color: '#7f7f7f',
    fontSize: 16,
  },
  emptyImage: {
    width: 190,
    height: 190,
  },
  loading: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 80,
    height: 29,
    textAlign: 'center',
    lineHeight: 29,
    color: '#609e39',
    borderWidth: 1,
    borderColor: '#609e39',
    borderStyle: 'solid',
    fontSize: 14,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
