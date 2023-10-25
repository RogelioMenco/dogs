import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./SearchBar.module.css";
import sortimg from "./img/download.png";
import filterimg from "./img/filter.png";

function SearchBar({ weightAlpha, search, filterTemp, filterOrigin }) {
  const temperaments = useSelector((state) => state.temperaments);

  function handleChangeSearch(e) {
    search(e.target.value);
  }
  function handleChangeFilterTemp(e) {
    filterTemp(e.target.value);
  }
  function handleChangeOrigin(e) {
    filterOrigin(e.target.value);
  }

  const [defaultValue, setDefaultValue] = useState("ORDER_ZA");

  function handleSwitch(e) {
    if (e.target.value === "ORDER_AZ") {
      weightAlpha("ORDER_AZ");
      setDefaultValue("ORDER_ZA");
    } else if (e.target.value === "ORDER_ZA") {
      weightAlpha("ORDER_ZA");
      setDefaultValue("ORDER_AZ");
    }
  }

  const [defaultValue2, setDefaultValue2] = useState("WEIGHT_DESC");

  function handleSwitch2(e) {
    if (e.target.value === "WEIGHT_ASC") {
      weightAlpha("WEIGHT_ASC");
      setDefaultValue2("WEIGHT_DESC");
    } else if (e.target.value === "WEIGHT_DESC") {
      weightAlpha("WEIGHT_DESC");
      setDefaultValue2("WEIGHT_ASC");
    }
  }

  return (
    <>
      {/* Sorts */}
      <div className={styles.leftdiv}>
        <div className={styles.sortsfilterdiv}>
          <img className={styles.img} src={sortimg} alt="sort icon" />
          <div>
            &nbsp;
            <span> A - Z </span>
            <label className={styles.switch} htmlFor="switchalpha">
              <input
                type="checkbox"
                name="switchalpha"
                id="switchalpha"
                value={defaultValue}
                onChange={handleSwitch}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          &nbsp;
          <div>
            &nbsp;
            <span> Weight </span>
            <label className={styles.switch} htmlFor="switchweight">
              <input
                type="checkbox"
                name="switchweight"
                id="switchweight"
                value={defaultValue2}
                onChange={handleSwitch2}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        &nbsp;
        {/* Filters */}
        <div className={styles.sortsfilterdiv}>
          <img className={styles.img} src={filterimg} alt="filter icon" />
          &nbsp;
          <select
            className={styles.select}
            name="temperaments"
            id="temps"
            onChange={handleChangeFilterTemp}
          >
            <option value="ALL">All Temperaments</option>
            {temperaments.map((e) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          &nbsp;
          <label htmlFor="origin">
            <span className={styles.origin}>Origin: </span>
            <select
              className={styles.select}
              name="origin"
              id="origin"
              onChange={handleChangeOrigin}
            >
              <option value="ALL">DB & API</option>
              <option value="db">Only DB</option>
              <option value="api">Only API</option>
            </select>
          </label>
        </div>
        &nbsp;
      </div>
      {/* Search and Creation */}
      <div className={styles.divsearch}>
        <input
          className={styles.search}
          onChange={handleChangeSearch}
          type="text"
          placeholder="Search a breed!"
        />
        &nbsp;
      </div>

      <Link to="/form">
        <div className={styles.circle}>
          <div className={styles.hori}></div>
          <div className={styles.vert}></div>
        </div>
      </Link>
    </>
  );
}

export default SearchBar;
