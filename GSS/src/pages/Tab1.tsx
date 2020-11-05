import React, { Fragment, useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonItem, IonList, IonModal, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { HTTP } from '@ionic-native/http'
import './Tab1.css';
import helpers from '../helpers/helpers';
import Article from '../components/Article';

let update = 0

const Tab1: React.FC = () => {
  const [articleModal, setArticleModal] = useState(false)
  const [articleHTML, setArticleHTML] = useState("")
  const [sites, setSites] = useState([])
  
  useEffect(() => {
    helpers.getSites().then((value: any) => {
      setSites(value)
    })
  }, [update])

  const getArticle = (articleId:string) => {
    HTTP.sendRequest(`http://192.168.1.60/outputs/${articleId}`, {method: "get"}).then((value) => {
      setArticleHTML(value.data)
      setArticleModal(true)
      document.querySelector("div.articleFromgss").innerHTML = articleHTML
    }
      ).catch((error) => {console.log(error); console.log("erreur")})
  }
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
        <IonList>
          {sites.map((site) => {return <Fragment>
            <Article key={site.id} titre={site.title} description={site.description}/>
              <a href={`http://192.168.1.60/outputs/${site.id}/`} target="_blank"><IonButton onClick={() => {getArticle(site.id)}}>Consulter</IonButton></a>
            </Fragment>})}
        </IonList>
        <IonSearchbar />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
