import React from 'react';
import { IonContent, IonHeader, IonItem, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Articles disponibles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonTitle className="centered">
          Bienvenue sur MarkNote
        </IonTitle>
        <IonItem lines="none">Voici la liste des articles disponibles sur le site.</IonItem>
        <ExploreContainer name="Tab 1 page" />
        <IonSearchbar />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
