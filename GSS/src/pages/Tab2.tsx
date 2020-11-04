import React from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FileChooser } from '@ionic-native/file-chooser'
import { FileTransfer } from '@ionic-native/file-transfer'
import { FilePath } from '@ionic-native/file-path'
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { File } from '@ionic-native/file'
import './Tab2.css';
import { options } from 'ionicons/icons';

const Tab2: React.FC = () => {
  File.createFile(File.externalApplicationStorageDirectory, "test.txt", true).then(() => {
    console.log("created")
    File.writeFile(File.externalApplicationStorageDirectory, "test.txt", "testing").then(() => {console.log("written")}).catch((err) => {console.log(err)})
  }).catch(() => {console.log("error creating file")})
  
  const chooseFile = () => {
    // On demande le fichier à l'utilisateur
    FileChooser.open().then((path) => {
      // On ouvre un canal de transmission
      let tranfer = FileTransfer.create()
      // Conversion du chemin du fichier en chemin natif compréhensible par android
      FilePath.resolveNativePath(path).then((nativePath) => {
        // Dossier du fichier
        nativePath = nativePath.substring(0, nativePath.lastIndexOf("/") + 1)
        // console.log(nativePath)
        // On vérifie si l'application à la permission de récupérer les données
        AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((permission) => {
          console.log(permission.hasPermission)
          if(permission.hasPermission){
            console.log(path)
            tranfer.upload(path, "http://192.168.1.129/Projets/GSS/", {fileKey: "file", fileName: path.substr(path.indexOf("/") + 1)}).then((value) => {
              console.log("transmitted")
            }).catch((error) => {
              console.log('error')
            }).finally(() => {console.log("finished")})
          }else{
            AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((value) => {
              // tranfer.upload(File.dataDirectory + "test.rar", "http://192.168.1.19/Projets/GSS/").then((value) => {console.log(value.response)})
            })
          }
        }).catch(() => {console.log("erreur en demandant la permission")}).finally(() => {console.log("permission terminé")})
        
      })
    })
  }

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
          <IonButton onClick={chooseFile} >Choose File</IonButton>
        </IonItem>
        <IonItem lines="none">
          <IonButton class="submitButton">Envoyer</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
