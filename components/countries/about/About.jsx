'use client'

import React, { useState } from 'react';
import './about.css'

function Tabs({ selected = 0, children }) {
  const [currentTab, setCurrentTab] = useState(selected);

  const handleChange = (index) => {
    setCurrentTab(index);
  };

  return (
    <div>
      <div className='tab-head'>

        <div className='container'>

          <div>
              <h3>About Country</h3>
          </div>

        </div>

      </div>
      
      <div className='container'>
      <div className='tab-sec'>
      <ul className="inline">
        {React.Children.map(children, (elem, index) => {
          let style = index === currentTab ? 'selected' : '';
          return (
            <li className={style} key={index} onClick={() => handleChange(index)}>
              {elem.props.title}
            </li>
          );
        })}
      </ul>
      <div className="tab">{children[currentTab]}</div>
    </div>
    </div>
    </div>
  );
}

function Panel({ children }) {
  return <div>{children}</div>;
}

function About() {
  return (
    <Tabs selected={1}>
      <Panel title="Spring">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nobis neque, tempora repudiandae in distinctio. Asperiores dolores inventore mollitia cum, at nesciunt repellendus dolor illo perferendis tempore enim, dolore natus!</Panel>
      <Panel title="Summer">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam illo temporibus consequuntur libero quia consectetur, in aliquam tenetur alias possimus aliquid asperiores totam explicabo, corporis hic doloremque eos. Nostrum, accusantium.</Panel>
      <Panel title="Autumn">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, asperiores iusto! Maxime perferendis animi iure earum. Quasi, error culpa voluptatem officia totam impedit sit natus, aspernatur quas enim commodi facere!</Panel>
      <Panel title="Winter">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, at nam eligendi ab eum similique amet beatae accusamus pariatur nemo maxime dolorem cumque? Officia, aperiam a. Quam officiis excepturi iste.</Panel>
    </Tabs>
  );
}

export default About;