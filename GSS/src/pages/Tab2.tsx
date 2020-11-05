import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonText, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { FileChooser, FileChooserOptions } from '@ionic-native/file-chooser'
import { FileTransfer } from '@ionic-native/file-transfer'
import { FilePath } from '@ionic-native/file-path'
import { AndroidPermissions } from '@ionic-native/android-permissions'
import './Tab2.css';
import helpers from '../helpers/helpers';

const Tab2: React.FC = () => {
  const [filePath, setFilePath] = useState("")
  const [articleTitle, setAticleTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fileName, setFileName] = useState("")
  const [successToast, setSuccessToast] = useState(false)
  const [failToast, setFailtToast] = useState(false)
  const [warnToast, setWarnToast] = useState(false)
  
  const chooseFile = () => {
    // On demande le fichier à l'utilisateur
    let filter:FileChooserOptions = {"mime": "application/zip"}
    FileChooser.open(filter).then((path) => {
      setFilePath(path)
      FilePath.resolveNativePath(path).then((nativePath) => {
        let folders = nativePath.split('/')
        setFileName(folders[folders.length - 1])
      })
      
    })
  }

  const uploadFile = (path) => {
    // On ouvre un canal de transmission
    let tranfer = FileTransfer.create()
    // Conversion du chemin du fichier en chemin natif compréhensible par android
    AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((permission) => {
      if(permission.hasPermission){
        tranfer.upload(path, `http://192.168.1.60?name=${articleTitle.split(" ").join("_")}`, {fileKey: "file", fileName: path.substr(path.indexOf("/") + 1)}).then((value) => {
          setSuccessToast(true)
        }).catch((error) => {
          setFailtToast(true)
        })
      }else{
        AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then((value) => {
          tranfer.upload(path, `http://192.168.1.60?name=${articleTitle.split(" ").join("_")}`, {fileKey: "file", fileName: path.substr(path.indexOf("/") + 1)}).then((value) => {
          setSuccessToast(true)
        }).catch((error) => {
          setFailtToast(true)
        })
        })
      }
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
          <IonInput required={true} onIonChange={(e) => {setAticleTitle(e.detail.value)}} placeholder="Titre de l'article" type="text" name="title" />
        </IonItem>
        <IonItem>
          <IonTextarea required={true} onIonChange={(e) => {setDescription(e.detail.value)}} placeholder="Description courte de l'article" name="tag"/>
        </IonItem>
        <IonItem>
          <IonItem>
            <IonButton onClick={() => {chooseFile()}} >Choisir un fichier</IonButton>
            <IonText>{fileName}</IonText>
          </IonItem>
        </IonItem>
        <IonItem lines="none">
          <IonButton onClick={() => {
            if(filePath !== ""){
              uploadFile(filePath)
              helpers.addSite(articleTitle, description)
            }else{
              setWarnToast(true)
            }
            }} class="submitButton">Envoyer</IonButton>
        </IonItem>
        <IonToast color="success" onDidDismiss={() => {setSuccessToast(false)}} message="Votre article à été envoyé" isOpen={successToast} duration={2000}/>
        <IonToast color="danger" onDidDismiss={() => {setFailtToast(false)}} message="Une erreur s'est produite pendant l'envoi des données veuillez réessayer plus tard" isOpen={failToast} duration={2000}/>
        <IonToast color="primary" onDidDismiss={() => {setWarnToast(false)}} message="Merci de remplir tout les champs" isOpen={warnToast} duration={2000}/>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
