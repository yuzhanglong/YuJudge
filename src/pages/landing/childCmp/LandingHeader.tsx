/*
 * File: LandingHeader.tsx
 * Description: 着陆页头部
 * Created: 2020-08-04 11:20:01
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

import React from "react";

interface LandingHeaderProps {

}

const LandingHeader: React.FunctionComponent<LandingHeaderProps> = () => {
  return (
    <div className={"landing-header"}>
      <div className={"landing-header-content"}>
        <svg width="48" height="32" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">

        </svg>
      </div>
    </div>
  )
}

export default LandingHeader;

