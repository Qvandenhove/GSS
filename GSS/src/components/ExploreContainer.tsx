import { IonList } from '@ionic/react';
import React, { Fragment, useEffect, useState } from 'react';
import './ExploreContainer.css';
import helpers from '../helpers/helpers'
import Article from './Article';

interface ContainerProps {
  name: string;
}

let update = 0

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [sites, setSites] = useState([])
  useEffect(() => {
    helpers.getSites().then((value: any) => {
      setSites(value)
    })
  }, [update])

  return (
    <Fragment>
      <IonList>
        {sites.map((site) => {return <Article key={site.id} titre={site.title} description={site.description}/>})}
      </IonList>
    </Fragment>
  );
};

export default ExploreContainer;
