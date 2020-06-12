import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, Linking } from 'react-native';
import Constants from 'expo-constants'
import { Feather as Icon, FontAwesome, Entypo, FontAwesome5, Foundation} from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string
  },
  items: {
    title: string;
  }[]
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState<Data>({} as Data);

  const routeParams = route.params as Params;

  function handleNavigationBack() {
    navigation.goBack();
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }

  function handleSendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse na coleta de resíduos`);
  }

  // useEffect(() => {
  //   api.get(`points/${routeParams.point_id}`).then(response => {
  //     setData(response.data);
  //   })
  // }, []);

  // if (!data.point) {
  //   return null;
  // }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack}>
          <Icon name="arrow-left" size={20} color="#34cb79"/>
        </TouchableOpacity>

        <Text style={styles.pointName}>Posto Campineiro</Text>
        <Image style={styles.pointImage} source={ { uri: "https://images.unsplash.com/photo-1567777176186-dfa735f1fe20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80./assets/exam.jpg" } } />

        
        {/* <Text style={styles.pointItems}>{data.items.map(item => item.title).join(',')}</Text> */}
        <View style={ styles.servicesList }>
          <View style={ styles.servicesListItem }>
              <Entypo name="lab-flask" size={24} color="green"/>
          </View>
          <View style={ styles.servicesListItem }>
              <FontAwesome5 name="bed" size={24} color="green"/>
          </View>
          <View style={ styles.servicesListItem }>
              <FontAwesome5 name="tooth" size={24} color="green"/>
          </View>
        </View>
        {/* <Text style={styles.pointName}>Posto São Vicente</Text>
        <Text style={styles.pointItems}>Exames, Odontologia</Text> */}

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Campinas - São Paulo</Text>
        </View>
      </View>

      <View>
        <Text style={ styles.footerTitle }>Entre em contato:</Text>
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleSendWhatsapp}>
            <FontAwesome name="whatsapp" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>Whatsapp</Text>
          </RectButton>
          <RectButton style={styles.button} onPress={handleComposeMail}>
            <Icon name="mail" size={20} color="#FFF"/>
            <Text style={styles.buttonText}>E-mail</Text>
          </RectButton>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  servicesList: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
  },

  servicesListItem: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#eee',
    // height: 60,
    width: 60,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  listItemText: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 12,
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  footerTitle: {
    paddingHorizontal: 32,
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;