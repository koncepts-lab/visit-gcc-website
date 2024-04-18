import React from 'react';
import './contacts.css';

const Contacts = () => {
  return (
    <div className='container'>
        <div className='table'>
      <div className="table-title"><h3>Useful Contacts</h3></div>
      <table className="table-fill">
        <thead></thead>
        <tbody className="table-hover">
          <tr>
            <td className="text-left">January</td>
            <td className="text-left">344 762 6853</td>
          </tr>
          <tr>
            <td className="text-left">February</td>
            <td className="text-left">344 762 6853</td>
          </tr>
          <tr>
            <td className="text-left">March</td>
            <td className="text-left">344 762 6853</td>
          </tr>
          <tr>
            <td className="text-left">April</td>
            <td className="text-left">344 762 6853</td>
          </tr>
          <tr>
            <td className="text-left">May</td>
            <td className="text-left">344 762 6853</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Contacts;
