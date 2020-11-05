import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonItem, IonModal } from '@ionic/react'
import React, { Fragment, useState } from 'react'
import "./Article.css"

import { star, starOutline } from 'ionicons/icons'

interface ArticleProps {
    titre: string
    description: string
    // tags: any
    // favoris: boolean
}

const Article:React.FC<ArticleProps> = ({titre, description}) => {
    

    return <Fragment>
        <IonCard>
            <IonCardHeader class ="ion-justify-content-center">
                <IonCardTitle class="ion-text-center">{titre}</IonCardTitle>
                {/* <div><IonIcon icon={favoris ? starOutline : star}/></div> */}
            </IonCardHeader>
            <IonCardContent class="article">
                <IonItem>{description}</IonItem>
                
            </IonCardContent>
        </IonCard>
    </Fragment>
}

export default Article