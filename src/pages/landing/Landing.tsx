import React from "react";
import {RouteComponentProps} from "react-router-dom";
import LandingHeader from "./childCmp/LandingHeader";
import MainPart from "./childCmp/MainPart";
import Feautres from "./childCmp/Feautres";
import LandingFooter from "./childCmp/LandingFooter";

interface LandingProps {

}

const Landing: React.FunctionComponent<LandingProps & RouteComponentProps> = () => {
  return (
    <div className={"landing-page"}>
      <div className={"landing"}>
        <div className={"landing-item"}>
          <LandingHeader></LandingHeader>
        </div>
        <div className={"landing-item"}>
          <MainPart></MainPart>
        </div>
        <div className={"landing-item"}>
          <Feautres></Feautres>
        </div>
        <div className={"landing-item landing-item-footer"}>
          <LandingFooter></LandingFooter>
        </div>
      </div>
    </div>

  )
}

export default Landing;