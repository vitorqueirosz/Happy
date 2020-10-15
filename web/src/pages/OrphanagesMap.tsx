import React, { useEffect, useState } from 'react';

import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';

import mapMarkerImg from '../assets/map-marker.svg';

import '../styles/pages/orphanages-map.css'
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('/orphanages').then(response => {
            const orphanages = response.data;

            setOrphanages(orphanages);
        })
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Salvador</strong>
                    <span>Bahia</span>
                </footer>
            </aside>

            <Map 
                center={[-12.8754964,-38.3060312]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => (
                    <Marker 
                    key={orphanage.id}
                    position={[orphanage.latitude, orphanage.longitude]}
                    icon={mapIcon}
                >
                    <Popup
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                        className="map-popup"
                    >
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                            <FiArrowRight color="#fff" size={20} />
                        </Link>
                    </Popup>
                </Marker>
                ))}
                
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;