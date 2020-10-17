import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from  '@expo/vector-icons';
import mapMarker from '../../assets/map-marker.png';

import { ActivityIndicator, Dimensions } from 'react-native';

import {
  Container, 
  Map, 
  CalloutContainer, 
  CalloutText,
  Footer,
  FooterText,
  CreateOrphanageButton } from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { or } from 'react-native-reanimated';

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {

  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('orphanage-details', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  

  return (
    <Container>
    <Map
    provider={PROVIDER_GOOGLE} 
      style={{ width: Dimensions.get('window').width, height: Dimensions.get("window").height}}
      initialRegion={{ 
        latitude: -12.8754964, 
        longitude: -38.3060312,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}
    >
      {orphanages.map((orphanage: OrphanageProps) => (
        <Marker
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
          icon={mapMarker}
          coordinate={{
            latitude: orphanage.latitude, 
          longitude: orphanage.longitude,
          }}
          key={orphanage.id}
        >
          <Callout 
          tooltip 
          onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
            <CalloutContainer>
              <CalloutText>{orphanage.name}</CalloutText>
            </CalloutContainer>
          </Callout>
        </Marker>
      ))}
    </Map>
    
    <Footer style={{ elevation: 1 }}>
      <FooterText>{orphanages.length} Orfanatos encontrados</FooterText>

      <CreateOrphanageButton onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff"/>
      </CreateOrphanageButton>
    </Footer>


  </Container>
  )
}

export default OrphanagesMap;