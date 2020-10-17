import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/Map' ;
import Details from './pages/Details/OrphanageDetails';

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'} }}>
                <Screen name="orphanage-map" component={OrphanagesMap}/>
                <Screen 
                    name="orphanage-details" 
                    component={Details}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}
                />

                <Screen 
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header  title="Selecione no mapa" />
                    }}
                />
                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                />

            </Navigator>
        </NavigationContainer>
    )
}


export default Routes;