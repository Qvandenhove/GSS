import React from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajouter article</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonInput placeholder="Titre de l'article" type="text" name="title" />
        </IonItem>
        <IonItem>
          <IonInput placeholder="Tag de l'article" name="tag" type="text"/>
        </IonItem>
        <IonItem>
          {/* Input du fichier markdown */}
        </IonItem>
        <IonItem lines="none">
          <IonButton class="submitButton">Envoyer</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
