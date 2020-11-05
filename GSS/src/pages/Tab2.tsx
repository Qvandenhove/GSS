import React from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
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
          if(permission.hasPermission){
            tranfer.upload(path, "http://192.168.1.60", {fileKey: "file", fileName: path.substr(path.indexOf("/") + 1)}).then((value) => {
              console.log(value.response)
            }).catch((error) => {
              console.log('error')
            })
          }else{
            AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((value) => {
              // tranfer.upload(File.dataDirectory + "test.rar", "http://192.168.1.19/Projets/GSS/").then((value) => {console.log(value.response)})
            })
          }
        })
        
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
          <IonTextarea placeholder="Description courte de l'article" name="tag"/>
        </IonItem>
        <IonItem>
          <IonButton onClick={chooseFile} >Choisir un fichier</IonButton>
        </IonItem>
        <IonItem lines="none">
          <IonButton class="submitButton">Envoyer</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
