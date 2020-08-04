import React from "react";
import {Card} from "antd";
import {ExperimentTwoTone} from "@ant-design/icons";

interface FeautresProps {

}

const Feautres: React.FunctionComponent<FeautresProps> = () => {
  const renderCardCover = (
    <div className={"feature-card-wrap"}>
      <div className={"feature-card-icon-wrap"}>
        <ExperimentTwoTone/>
      </div>
      <div className={"feature-card-title"}>
        Feature
      </div>
      <div className={"feature-card-content"}>
        FeatureFeatureFeatureF
        eature FeatureFeature
        FeatureFeature Featur
        eFeatureFeaturefhfhtf
      </div>
    </div>

  )
  return (
    <div className={"landing-features"}>
      <div className={"landing-features-card-wrap"}>
        <Card
          hoverable
          style={{width: 280}}>
          {renderCardCover}
        </Card>
        <Card
          hoverable
          style={{width: 280}}>
          {renderCardCover}
        </Card>
        <Card
          hoverable
          style={{width: 280}}>
          {renderCardCover}
        </Card>
        <Card
          hoverable
          style={{width: 280}}>
          {renderCardCover}
        </Card>
      </div>


    </div>
  )
}

export default Feautres;