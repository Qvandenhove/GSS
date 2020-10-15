import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem } from '@ionic/react'
import React, { Fragment } from 'react'
import "./Article.css"

import { star, starOutline } from 'ionicons/icons'

interface ArticleProps {
    titre: string
    tags: any
    favoris: boolean
}

const Article:React.FC<ArticleProps> = ({titre, tags, favoris}) => {
    return <Fragment>
        <IonCard>
            <IonCardHeader>
                <div></div>
                <div>{titre}</div>
                <div><IonIcon icon={favoris ? starOutline : star}/></div>
            </IonCardHeader>
            <IonCardContent>{tags.map((tag:any) => {return <IonItem lines="none" color="secondary">{tag + " "}</IonItem>})}</IonCardContent>
        </IonCard>
    </Fragment>
}

export default Article