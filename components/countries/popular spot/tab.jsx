import React, { useState } from 'react';
import './tab.css'

// Define a component for each tab content
const TabContent = ({ id, title, content, imageUrl }) => (
  <div role="tabpanel" className="tab-pane" id={id}>
    <div className="col-sm-4">
      <img src={imageUrl} alt={title} className="img-responsive tab-image-ex-gap" />
    </div>
    <div className="col-sm-8">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  </div>
);

// Define the main Tabs component
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab index

  const handleNext = () => setActiveTab(prevTab => prevTab + 1); // Function to handle next tab
  const handlePrev = () => setActiveTab(prevTab => prevTab - 1); // Function to handle previous tab

  return (
    <div className="service-section">
      <div className="container" style={{ marginTop: '10px' }}>
        <div className="row">
          <ul className="nav nav-tabs service-tab" role="tablist">
            {tabs.map((tab, index) => (
              <li key={index} role="presentation" className={index === activeTab ? 'active' : ''}>
                <a href={`#${tab.id}`} aria-controls={tab.id} role="tab" data-toggle="tab">
                  <i className="fa fa-trello"></i>
                  <h5>{tab.title}</h5>
                  <p>{tab.description}</p>
                </a>
              </li>
            ))}
          </ul>

          {/* Tab panes */}
          <div className="tab-content service-tab-content">
            {tabs.map((tab, index) => (
              <TabContent key={index} {...tab} />
            ))}
          </div>
        </div>
        <div className="row">
          <ul className="list-inline pull-right">
            <li><button type="button" className="btn btn-default prev-step" onClick={handlePrev} disabled={activeTab === 0}>Previous</button></li>
            <li><button type="button" className="btn btn-default next-step" onClick={handleNext} disabled={activeTab === tabs.length - 1}>Next</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Define tab data
const tabs = [
  {
    id: 'uxdesign',
    title: 'UX Design',
    description: 'Class aptent taciti sociosqu itora torquent conubia nosper inceptos him enaeos.',
    content: 'Contrary to popular belief...',
    imageUrl: 'http://img.freepik.com/free-photo/marketing-online-strategy-with-drawings_1134-76.jpg?size=338c&ext=jpg'
  },
  // Add more tab data here
];

export default Tabs;