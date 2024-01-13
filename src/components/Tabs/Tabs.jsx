import React, { useState } from "react";

const TabButtons = ({buttons, changeTab, activeTab}) =>{
   
  return(
    <div className="tab-buttons">
    {buttons.map((button, index) =>{
       return <button key={index} className={button === activeTab? 'active': ''} onClick={()=>changeTab(button)}>{button}</button>
    })}
    </div>
  )
}

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  let content;
  let buttons = [];

  React.Children.forEach(children, (child) => {
    buttons.push(child.props.label);
    if (child.props.label === activeTab) content = child.props.children;
  });

  return (
    <div>
      <TabButtons activeTab={activeTab} buttons={buttons} changeTab={changeTab} />
      <div className="tab-content">{content}</div>
    </div>
  );
};

const Tab = props =>{
  return(
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}

export {Tabs, Tab};

