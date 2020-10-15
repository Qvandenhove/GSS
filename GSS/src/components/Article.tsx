import { IonCard, IonCardContent, IonCardHeader } from '@ionic/react'
import React, { Fragment } from 'react'

interface ArticleProps {
    titre: string
    tags: any
}

const Article:React.FC<ArticleProps> = ({titre, tags}) => {
    return <Fragment>
        <IonCard>
            <IonCardHeader>{titre}</IonCardHeader>
            <IonCardContent>{tags.map((tag:any) => {return tag})}</IonCardContent>
        </IonCard>
    </Fragment>
}

export default Article