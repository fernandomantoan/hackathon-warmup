import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Alert } from 'react-native';
import Constants from "expo-constants";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather as Icon, Entypo, FontAwesome, FontAwesome5, Foundation } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';

// import examLogo from '../../assets/exam.jpg';

interface Item {
  id: number,
  title: string,
  image_url: string
}

interface Point {
  id: number,
  name: string,
  image: string,
  image_url: string,
  latitude: number,
  longitude: number
}

interface Params {
  uf: string,
  city: string
}

const Points = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [points, setPoints] = useState<Point[]>([]);

  const route = useRoute();
  const routeParams = route.params as Params;

  function handleNavigationBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail() {
    navigation.navigate('Detail');
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item !== id);
        setSelectedItems(filteredItems);
    } else {
        setSelectedItems([ ...selectedItems, id ]);
    }
  }

  // useEffect(() => {
  //   api.get('items').then(response => {
  //     setItems(response.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   async function loadPosition() {
  //     const { status } = await Location.requestPermissionsAsync();

  //     if (status !== 'granted') {
  //       Alert.alert('Necessária Localização para exibir os pontos');
  //       return;
  //     }

  //     const location = await Location.getCurrentPositionAsync();

  //     const { latitude, longitude } = location.coords;

  //     setInitialPosition([
  //       latitude,
  //       longitude
  //     ]);
  //   }

  //   loadPosition();
  // },[]);

  // useEffect(() => {
  //   api.get('points', {
  //     params: {
  //       city: routeParams.city,
  //       uf: routeParams.uf,
  //       items: selectedItems
  //     }
  //   }).then(response => {
  //     setPoints(response.data);
  //   });
  // }, [selectedItems]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack}>
          <Icon name="arrow-left" size={20} color="#34cb79"/>
        </TouchableOpacity>

        <Text style={styles.title}>Pontos de Interesse</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de auxílio médico, mecânico e pessoal.</Text>

        {/* <View style={styles.mapContainer}>
          { initialPosition[0] !== 0 && (
            <MapView style={styles.map} 
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
            }}>
              {points.map(point => (
                <Marker key={String(point.id)} style={styles.mapMarker} coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude
                }}
                  onPress={() => handleNavigateToDetail(point.id)}>
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }}>
                    </Image>
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          ) }
        </View> */}
        <View style={styles.mapContainer}>
            <MapView style={styles.map} 
              initialRegion={{
                latitude: -23.0000745,
                longitude: -47.0333882,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
            }}>
                <Marker style={styles.mapMarker} coordinate={{
                  latitude: -23.0000745,
                  longitude: -47.0333882
                }}
                  onPress={() => handleNavigateToDetail()}>
                  {/* <View style={styles.mapMarkerContainer}>
                    <Text style={styles.mapMarkerTitle}>Posto São Vicente</Text>
                  </View> */}
                </Marker>
            </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20}}>
            <TouchableOpacity style={ styles.item }
              onPress={() => {}} 
              // style={[
              //       styles.item, 
              //       selectedItems.includes(item.id) ? styles.selectedItem : {} 
              //     ]}
              activeOpacity={0.6}>
            {/* <Image source={require('../../assets/exam.jpg')}/> */}
            <Entypo name="lab-flask" size={48} color="green"/>
            <Text style={styles.itemTitle}>Exames</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.item }
              onPress={() => {}} 
              // style={[
              //       styles.item, 
              //       selectedItems.includes(item.id) ? styles.selectedItem : {} 
              //     ]}
              activeOpacity={0.6}>
            <FontAwesome5 name="glasses" size={48} color="green" />
            <Text style={styles.itemTitle}>Acuidade Visual</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.item }
              onPress={() => {}} 
              // style={[
              //       styles.item, 
              //       selectedItems.includes(item.id) ? styles.selectedItem : {} 
              //     ]}
              activeOpacity={0.6}>
            <FontAwesome name="heartbeat" size={48} color="green" />
            <Text style={styles.itemTitle}>Aferição de Pressão</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.item }
              onPress={() => {}} 
              // style={[
              //       styles.item, 
              //       selectedItems.includes(item.id) ? styles.selectedItem : {} 
              //     ]}
              activeOpacity={0.6}>
            <FontAwesome5 name="tooth" size={48} color="green" />
            <Text style={styles.itemTitle}>Atendimento Odontológico</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.item }
              onPress={() => {}} 
              // style={[
              //       styles.item, 
              //       selectedItems.includes(item.id) ? styles.selectedItem : {} 
              //     ]}
              activeOpacity={0.6}>
            <Entypo name="scissors" size={48} color="green" />
            <Text style={styles.itemTitle}>Corte de Cabelo</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.item }
              onPress={() => {}} 
              // style={[
              //       styles.item, 
              //       selectedItems.includes(item.id) ? styles.selectedItem : {} 
              //     ]}
              activeOpacity={0.6}>
            <FontAwesome5 name="truck" size={48} color="grey" />
            <Text style={styles.itemTitle}>Oficina Mecânica</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.item }
              onPress={() => {}} 
              // style={[
              //       styles.item, 
              //       selectedItems.includes(item.id) ? styles.selectedItem : {} 
              //     ]}
              activeOpacity={0.6}>
            <Foundation name="foot" size={48} color="green" />
            <Text style={styles.itemTitle}>Cuidado com os pés</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={ styles.item }
              onPress={() => {}} 
              // style={[
              //       styles.item, 
              //       selectedItems.includes(item.id) ? styles.selectedItem : {} 
              //     ]}
              activeOpacity={0.6}>
            <FontAwesome5 name="bed" size={48} color="blue" />
            <Text style={styles.itemTitle}>Dormitório</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Points;