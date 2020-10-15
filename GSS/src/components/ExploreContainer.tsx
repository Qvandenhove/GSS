import { IonList } from '@ionic/react';
import React, { Fragment } from 'react';
import './ExploreContainer.css';
import Article from './Article';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <Fragment>
      <IonList>
        <Article titre="Python 3.9" tags={["Python"]} />
        <Article titre="NodeJs meilleur que PHP?" tags={["NodeJS", "PHP"]} />
      </IonList>
    </Fragment>
  );
};

export default ExploreContainer;
