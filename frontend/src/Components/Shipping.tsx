import "../Styles/shipping.scss";
import { LuArrowLeft } from "react-icons/lu";
import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface StateType {
  name: string;
  isoCode?: string;
}
const Shipping = () => {
  const countryData = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState<string>("");
  const [stateCode, setStateCode] = useState<string>("");
  const [stateData, setStateData] = useState<StateType[]>([]);
  const [cityData, setCityData] = useState<StateType[]>([]);

  const fetchStates = async () => {
    const states = await State.getStatesOfCountry(countryCode);
    setStateData(states);
  };

  useEffect(() => {
    fetchStates();
  }, [countryCode]);


  const fetchCity = async () => {
    if(stateCode){
        const cities = await City.getCitiesOfState(countryCode,stateCode);
        setCityData(cities);
        console.log(cities)
    }

};
  useEffect(() => {
    fetchCity();
  }, [stateData, stateCode]);

  return (
    <div className="shipping">
      <div className="shipping_head">
        <button>
       <Link to={'/cart'}>
       <LuArrowLeft />
       </Link>
      
        </button>
      </div>

      <div className="shipping_main">
        <h1>SHIPPING ADDRESS</h1>
        <form>
          <label>
            <p>Phone number</p>
            <input type="tel" name="" placeholder="eg. 9667760692" />
          </label>

          <label>
            <p>Country</p>
            <select
              name="country"
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryData &&
                countryData.map((c, i) => (
                  <option value={c.isoCode} key={i}>
                    {c.name}
                  </option>
                ))}
            </select>
          </label>

          <div className="half">
          <label>
              <p>State</p>
              <select
                name="state"
                onChange={(e) => setStateCode(e.target.value)}
              >
                {stateData &&
                  stateData.map((c, i) => (
                    <option value={c.isoCode} key={i}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              <p>City</p>
              <select
                name="city"
                onChange={(e) => setStateCode(e.target.value)}
              >
                {cityData &&
                  cityData  .map((c, i) => (
                    <option value={c.isoCode} key={i}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <label>
            <p>House No</p>
            <input type="text" name="" placeholder=" eg  New Delhi 100`" />
          </label>


          <button type="submit">Pay now</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
