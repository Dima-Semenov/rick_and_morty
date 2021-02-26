import React, { useEffect, useState } from "react";
import { request } from "../../api";
import { CurrentLocation } from "./CurrentLocation/CurrentLocation";

export const Locations = () => {
  const [locationsData, setLocationsData] = useState([]);

  useEffect(() => {
    request('/location')
      .then(result => {
        setLocationsData(result.results)
        console.log(result.results)
        console.log(result)
      })
  }, [])

  console.log(locationsData)
  return (
    <div>
      <h1>location</h1>

        <div>
          <table>
            <thead>
              <tr>
                <td>Location name</td>
                <td>Dimension</td>
                <td>Type</td>
              </tr>
            </thead>
            <tbody>
              {
                locationsData.map(item => (
                    <CurrentLocation key={item.id} {...item} />
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  );
};
